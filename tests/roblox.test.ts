import test from "node:test";
import assert from "node:assert/strict";
import { createStatsService, cacheControl } from "../server/roblox";
import { statsConfig } from "../src/data/config";
import type { GameConfig } from "../src/data/types";

const games: GameConfig[] = [
  { slug: "a", name: "Alpha", universeId: 1, thumbnail: "/a.webp" },
  { slug: "b", name: "Beta", universeId: 2, thumbnail: "/b.webp" },
  { slug: "c", name: "Charlie", universeId: 3, thumbnail: "/c.webp" },
  { slug: "d", name: "Delta", universeId: 4, thumbnail: "/d.webp" },
];
const records = [
  { id: 1, name: "Alpha", visits: 100, playing: 2 },
  { id: 2, name: "Beta", visits: 200, playing: 1 },
  { id: 3, name: "Charlie", visits: 100, playing: 3 },
  { id: 4, name: "Delta", visits: 100, playing: 3 },
];
const response = (data: unknown) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });

test("one batch, exact totals, visit/CCU/name tie breaks, shared ranks and top N", async () => {
  const calls: string[] = [];
  const fetcher: typeof fetch = async (input) => {
    calls.push(String(input));
    return response({
      data: String(input).includes("games.roblox.com") ? records : [],
    });
  };
  const service = createStatsService(games, fetcher);
  const result = await service.get();
  assert.equal(result.totalVisits, 500);
  assert.equal(result.totalPlaying, 9);
  assert.deepEqual(
    result.games.map((game) => game.slug),
    ["b", "c", "d", "a"],
  );
  assert.deepEqual(
    result.games.map((game) => game.rank),
    [1, 2, 3, 4],
  );
  assert.deepEqual(
    result.topGames,
    result.games.slice(0, statsConfig.topGamesCount),
  );
  assert.equal(
    calls.filter((url) => url.includes("games.roblox.com")).length,
    1,
  );
  assert.equal(new URL(calls[0]).searchParams.get("universeIds"), "1,2,3,4");
  assert.equal(cacheControl, "public, s-maxage=60, stale-while-revalidate=300");
});
test("20 concurrent readers and 20 cached repeats do not multiply upstream calls", async () => {
  let calls = 0;
  const fetcher: typeof fetch = async (input) => {
    calls++;
    return response({
      data: String(input).includes("games.roblox.com") ? records : [],
    });
  };
  const service = createStatsService(games, fetcher);
  const results = await Promise.all(
    Array.from({ length: 20 }, () => service.get()),
  );
  for (let index = 0; index < 20; index++) await service.get();
  assert.equal(calls, 3);
  assert.ok(results.every((result) => result === results[0]));
});
test("failure preserves last accepted timestamp and totals, then recovers", async () => {
  let time = 1_000_000;
  let fail = false;
  const fetcher: typeof fetch = async (input) => {
    if (fail) throw new Error("Network down");
    return response({
      data: String(input).includes("games.roblox.com") ? records : [],
    });
  };
  const service = createStatsService(games, fetcher, () => time);
  const initial = await service.get();
  time += 61_000;
  fail = true;
  const stale = await service.get();
  assert.equal(stale.stale, true);
  assert.equal(stale.updatedAt, initial.updatedAt);
  assert.equal(stale.totalVisits, initial.totalVisits);
  fail = false;
  time += 61_000;
  const recovered = await service.get();
  assert.equal(recovered.stale, false);
  assert.notEqual(recovered.updatedAt, initial.updatedAt);
});
test("cold failures, partial data and invalid numeric values return unavailable, never fake zero", async () => {
  for (const data of [
    [],
    records.slice(1),
    records.map((record) => ({ ...record, visits: -1 })),
    records.map((record) => ({ ...record, playing: "1" })),
  ]) {
    const service = createStatsService(games, async () => response({ data }));
    const result = await service.get();
    assert.equal(result.totalVisits, null);
    assert.equal(result.updatedAt, null);
    assert.equal(result.stale, true);
    assert.deepEqual(result.topGames, []);
  }
});
test("place resolution and successful icons are cached independently across stats refreshes", async () => {
  let time = 1_000_000;
  const calls: string[] = [];
  const fetcher: typeof fetch = async (input) => {
    const url = String(input);
    calls.push(url);
    if (url.includes("/universe")) return response({ universeId: 1 });
    if (url.includes("multiget/thumbnails"))
      return response({
        data: [
          {
            universeId: 1,
            thumbnails: [
              {
                state: "Completed",
                imageUrl: "https://tr.rbxcdn.com/cover.png",
              },
            ],
          },
        ],
      });
    if (url.includes("thumbnails.roblox.com"))
      return response({
        data: [
          {
            targetId: 1,
            state: "Completed",
            imageUrl: "https://tr.rbxcdn.com/icon.png",
          },
        ],
      });
    return response({ data: [records[0]] });
  };
  const service = createStatsService(
    [{ ...games[0], universeId: undefined, placeId: 123 }],
    fetcher,
    () => time,
  );
  const initial = await service.get();
  time += 61_000;
  await service.get();
  assert.equal(initial.games[0].thumbnail, "https://tr.rbxcdn.com/icon.png");
  assert.equal(initial.games[0].cover, "https://tr.rbxcdn.com/cover.png");
  assert.equal(calls.filter((url) => url.includes("/universe")).length, 1);
  assert.equal(
    calls.filter((url) => url.includes("thumbnails.roblox.com")).length,
    2,
  );
  assert.equal(
    calls.filter((url) => url.includes("games.roblox.com")).length,
    2,
  );
});
test("duplicate universe IDs are counted once and icon failures keep local fallback", async () => {
  const service = createStatsService(
    [games[0], { ...games[0], slug: "duplicate" }],
    async (input) => {
      if (String(input).includes("thumbnails")) throw new Error("Unavailable");
      return response({ data: [records[0]] });
    },
  );
  const result = await service.get();
  assert.equal(result.totalVisits, 100);
  assert.equal(result.games.length, 1);
  assert.equal(result.games[0].thumbnail, "/a.webp");
});
