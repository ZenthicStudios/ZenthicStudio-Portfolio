import test from "node:test";
import assert from "node:assert/strict";
import { fetchJson, importGames, parseLinks } from "../scripts/sync-games.js";
import { createStatsService } from "../server/roblox.js";
import type { Project } from "../src/data/types.js";

const link = (id: number) => `https://www.roblox.com/games/${id}/Name`;
const records = [1, 2, 3, 4].map(id => ({ id, name: `Game ${id}`, visits: id * 100, playing: id }));
const fetcher: typeof fetch = async input => {
  const url = new URL(String(input));
  if (url.hostname === "apis.roblox.com") {
    const place = Number(url.pathname.split("/").at(-2));
    return Response.json({ universeId: place === 40 ? 4 : place });
  }
  if (url.hostname === "games.roblox.com") {
    const ids = url.searchParams.get("universeIds")!.split(",").map(Number);
    return Response.json({ data: records.filter(record => ids.includes(record.id)) });
  }
  if (url.pathname.endsWith("/icons")) return Response.json({ data: records.map(record => ({ targetId: record.id, state: "Completed", imageUrl: `https://tr.rbxcdn.com/icon-${record.id}.png` })) });
  return Response.json({ data: records.map(record => ({ universeId: record.id, thumbnails: [{ state: "Completed", imageUrl: `https://tr.rbxcdn.com/cover-${record.id}.png` }] })) });
};

test("plain link list accepts blank lines, comments, locale/query links and duplicates", () => {
  assert.deepEqual(parseLinks(`# Games\r\n${link(1)}\r\n\n${link(1)}?a=b\nhttps://roblox.com/en-us/games/2/Other\n`), [1, 2]);
});

test("bad links fail with a line number before any external request", async () => {
  for (const value of ["123", "https://evil.com/games/1", "https://roblox.com.evil.com/games/1", "https://user@roblox.com/games/1", "http://roblox.com/games/1", "https://roblox.com/games/0", "https://roblox.com/games/9007199254740993", "https://www.roblox.com/share?code=123", "https://roblox.com:456/games/1"]) {
    await assert.rejects(importGames(`# Header\n${value}`, [], async () => { throw Error("Should not fetch"); }), /games.txt line 2/);
  }
  assert.throws(() => parseLinks("# Only a comment\n"), /at least one/);
});

test("adding only a link automatically imports art, names, counts and top three; removal and universe dedupe follow the list", async () => {
  const before = await importGames([1, 2, 3].map(link).join("\n"), [], fetcher);
  const after = await importGames([1, 2, 3, 4, 40, 4].map(link).join("\n"), [], fetcher);
  assert.equal(before.projects.length, 3);
  assert.equal(after.projects.length, 4);
  const added = after.projects.find(project => project.game?.universeId === 4)!;
  assert.equal(added.name, "Game 4");
  assert.equal(added.thumbnail, "https://tr.rbxcdn.com/cover-4.png");
  assert.equal(added.icon, "https://tr.rbxcdn.com/icon-4.png");
  assert.equal(added.links.play, "https://www.roblox.com/games/4");
  assert.equal(added.automaticName, true);
  assert.deepEqual([added.tags, added.role, added.description], [[], "", ""]);
  assert.deepEqual(after.initialStats.topGames.map(game => game.universeId), [4, 3, 2]);
  assert.equal(after.initialStats.totalVisits, 1000);
  assert.equal(after.initialStats.totalPlaying, 10);
  assert.equal(after.initialStats.stale, true);
  const live = await createStatsService(after.projects.map(project => ({ ...project.game, slug: project.slug, name: project.name, thumbnail: project.icon! })), fetcher).get();
  assert.deepEqual(live.topGames.map(game => game.universeId), [4, 3, 2]);
  assert.equal(live.totalVisits, 1000);
  assert.equal(live.stale, false);
  const removed = await importGames(link(4), after.projects, fetcher);
  assert.equal(removed.projects.length, 1);
});

test("existing titles, stable slugs and video links are preserved without carrying over contribution labels", async () => {
  const old: Project = { name: "Custom title", slug: "stable-slug", thumbnail: "/old.webp", tags: ["Collaboration"], role: "80% Scripting", description: "80% Scripting", status: "Published", links: { play: link(1), video: "https://example.com/video" }, game: { placeId: 1, universeId: 1 } };
  const result = await importGames(link(1), [old], fetcher);
  const project = result.projects[0];
  assert.equal(project.name, old.name);
  assert.equal(project.slug, old.slug);
  assert.equal(project.role, "");
  assert.equal(project.description, "");
  assert.deepEqual(project.tags, []);
  assert.equal(project.links.video, old.links.video);
});

test("missing public metadata stops the import; unavailable or untrusted artwork uses safe fallback", async () => {
  await assert.rejects(importGames(link(99), [], fetcher), /public details for place 99/);
  const noArt: typeof fetch = async (input, init) => String(input).includes("thumbnails.roblox.com")
    ? Response.json({ data: [{ targetId: 1, state: "Completed", imageUrl: "https://evil.com/image.png" }] }) : fetcher(input, init);
  const result = await importGames(link(1), [], noArt);
  assert.equal(result.projects[0].thumbnail, "/favicon.svg");
  assert.equal(result.projects[0].icon, "/favicon.svg");
});

test("transient errors retry, permanent errors stop and every request has a deadline", async () => {
  let calls = 0;
  const result = await fetchJson("https://games.roblox.com/v1/games", async (_input, init) => {
    assert.ok(init?.signal);
    calls++;
    return calls < 3 ? new Response(null, { status: 429 }) : Response.json({ ok: true });
  }, async () => {});
  assert.deepEqual(result, { ok: true });
  assert.equal(calls, 3);
  calls = 0;
  await assert.rejects(fetchJson("https://games.roblox.com/v1/games", async () => { calls++; return new Response(null, { status: 404 }); }, async () => {}), /404/);
  assert.equal(calls, 1);
});

test("larger portfolios batch upstream requests and still rank and total all games", async () => {
  const many = Array.from({ length: 105 }, (_, index) => ({ slug: `game-${index + 1}`, name: `Game ${index + 1}`, thumbnail: "/favicon.svg", universeId: index + 1 }));
  const result = await createStatsService(many, async input => {
    const url = new URL(String(input));
    const ids = url.searchParams.get("universeIds")!.split(",").map(Number);
    assert.ok(ids.length <= 50);
    return Response.json({ data: url.hostname === "games.roblox.com" ? ids.map(id => ({ id, name: `Game ${id}`, visits: id, playing: 1 })) : [] });
  }).get();
  assert.equal(result.games.length, 105);
  assert.equal(result.totalPlaying, 105);
  assert.deepEqual(result.topGames.map(game => game.universeId), [105, 104, 103]);
});
