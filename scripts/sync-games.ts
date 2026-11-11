import { readFile, writeFile, rename } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { statsConfig } from "../src/data/config.js";
import type { Project, GameStats, StatsResponse } from "../src/data/types.js";

const positiveId = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value > 0;
const count = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

export function parseLinks(source: string): number[] {
  const ids = new Set<number>();
  source.split(/\r?\n/).forEach((raw, index) => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    try {
      const url = new URL(line);
      const match = url.pathname.match(/^\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?games\/(\d+)(?:\/[^/]*)?\/?$/i);
      const id = Number(match?.[1]);
      if (url.protocol !== "https:" || !["www.roblox.com", "roblox.com", "m.roblox.com"].includes(url.hostname)
        || url.port || url.username || url.password || !positiveId(id)) throw new Error();
      ids.add(id);
    } catch {
      throw new Error(`games.txt line ${index + 1}: paste a full Roblox place link, such as https://www.roblox.com/games/123456/Game-Name`);
    }
  });
  if (!ids.size) throw new Error("games.txt must contain at least one Roblox game link.");
  return [...ids];
}

export async function fetchJson(url: string, fetcher: typeof fetch = fetch, pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))): Promise<unknown> {
  let last: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetcher(url, { signal: AbortSignal.timeout(12_000), headers: { Accept: "application/json" } });
      if (response.ok) return await response.json();
      const error = new Error(`Roblox returned ${response.status} for ${new URL(url).pathname}`);
      if (response.status !== 429 && response.status < 500) throw Object.assign(error, { permanent: true });
      throw error;
    } catch (error) {
      if ((error as { permanent?: boolean }).permanent) throw error;
      last = error;
      if (attempt < 2) await pause(500 * 2 ** attempt);
    }
  }
  throw last;
}

type RawGame = { id: number; name: string; visits: number; playing: number };
type Image = { state?: string; imageUrl?: string };
function imageUrl(image?: Image): string | undefined {
  try {
    const url = new URL(image?.imageUrl ?? "");
    if (image?.state === "Completed" && url.protocol === "https:" && !url.username && !url.password
      && (url.hostname === "rbxcdn.com" || url.hostname.endsWith(".rbxcdn.com"))) return url.href;
  } catch { /* Pending or missing artwork uses the portfolio fallback. */ }
}

export async function importGames(source: string, curated: Project[], fetcher: typeof fetch = fetch) {
  const ids = parseLinks(source);
  const byPlace = new Map(curated.map(project => [project.game?.placeId, project]));
  const byUniverse = new Map(curated.map(project => [project.game?.universeId, project]));
  const selected = new Map<number, { placeId: number; previous?: Project }>();
  // Resolve sequentially to avoid rate-limit bursts when several links are pasted.
  for (const placeId of ids) {
    const known = byPlace.get(placeId);
    let universeId = known?.game?.universeId;
    if (!positiveId(universeId)) {
      const payload = await fetchJson(`${statsConfig.universeUrl}/${placeId}/universe`, fetcher) as { universeId?: unknown };
      if (!positiveId(payload.universeId)) throw new Error(`Roblox cannot resolve place ${placeId}. Check its link and visibility.`);
      universeId = payload.universeId;
    }
    if (!selected.has(universeId)) selected.set(universeId, { placeId, previous: known ?? byUniverse.get(universeId) });
  }
  const metadata = new Map<number, RawGame>();
  const icons = new Map<number, string>();
  const covers = new Map<number, string>();
  const universeIds = [...selected.keys()];
  for (let offset = 0; offset < universeIds.length; offset += 50) {
    const batch = universeIds.slice(offset, offset + 50).join(",");
    const payload = await fetchJson(`${statsConfig.gamesUrl}?universeIds=${batch}`, fetcher) as { data?: RawGame[] };
    if (!Array.isArray(payload.data)) throw new Error("Roblox returned invalid game details. Try the build again.");
    for (const game of payload.data) metadata.set(game.id, game);
    const artwork = await Promise.allSettled([
      fetchJson(`${statsConfig.iconsUrl}?universeIds=${batch}&size=${statsConfig.iconSize}&format=Png&isCircular=false`, fetcher),
      fetchJson(`${statsConfig.thumbnailsUrl}?universeIds=${batch}&countPerUniverse=1&defaults=true&size=${statsConfig.thumbnailSize}&format=Png&isCircular=false`, fetcher),
    ]);
    if (artwork[0].status === "fulfilled") {
      const data = (artwork[0].value as { data?: (Image & { targetId: number })[] }).data;
      if (Array.isArray(data)) for (const item of data) { const url = imageUrl(item); if (url) icons.set(item.targetId, url); }
    }
    if (artwork[1].status === "fulfilled") {
      const data = (artwork[1].value as { data?: { universeId: number; thumbnails?: Image[] }[] }).data;
      if (Array.isArray(data)) for (const item of data) {
        const url = Array.isArray(item.thumbnails) ? item.thumbnails.map(imageUrl).find(Boolean) : undefined;
        if (url) covers.set(item.universeId, url);
      }
    }
  }
  const projects: Project[] = [];
  const ranked: GameStats[] = [];
  for (const [universeId, { placeId, previous }] of selected) {
    const raw = metadata.get(universeId);
    if (!raw || typeof raw.name !== "string" || !raw.name.trim() || !count(raw.visits) || !count(raw.playing))
      throw new Error(`Roblox did not return public details for place ${placeId}. Check the link or try again later; the current live site remains unchanged.`);
    const project: Project = {
      name: previous?.name ?? raw.name.trim(),
      slug: previous?.slug ?? `roblox-${universeId}`,
      thumbnail: covers.get(universeId) ?? previous?.thumbnail ?? icons.get(universeId) ?? "/favicon.svg",
      icon: icons.get(universeId) ?? previous?.icon ?? "/favicon.svg",
      tags: previous?.tags ?? [],
      role: previous?.role ?? "",
      description: previous?.description ?? "",
      status: previous?.status ?? "",
      automaticName: !previous,
      links: { ...previous?.links, play: `https://www.roblox.com/games/${placeId}` },
      game: { placeId, universeId },
    };
    projects.push(project);
    ranked.push({ slug: project.slug, universeId, name: raw.name, visits: raw.visits, playing: raw.playing,
      rank: 0, thumbnail: project.icon ?? project.thumbnail, cover: project.thumbnail });
  }
  ranked.sort((a, b) => b.visits - a.visits || b.playing - a.playing || a.name.localeCompare(b.name, "en") || a.universeId - b.universeId);
  ranked.forEach((game, index) => { game.rank = index + 1; });
  const initialStats: StatsResponse = {
    games: ranked, topGames: ranked.slice(0, statsConfig.topGamesCount),
    totalVisits: ranked.reduce((total, game) => total + game.visits, 0),
    totalPlaying: ranked.reduce((total, game) => total + game.playing, 0),
    updatedAt: new Date().toISOString(), stale: true,
  };
  return { projects, initialStats };
}

async function main() {
  const root = new URL("../", import.meta.url);
  const [source, curated] = await Promise.all([
    readFile(new URL("games.txt", root), "utf8"),
    readFile(new URL("src/data/curated-projects.json", root), "utf8"),
  ]);
  const result = await importGames(source, JSON.parse(curated) as Project[]);
  const output = new URL("src/data/generated-projects.ts", root);
  const temporary = `${fileURLToPath(output)}.tmp`;
  await writeFile(temporary, `// Generated from games.txt. Do not edit by hand.\nimport type { Project, StatsResponse } from "./types.js";\n\nexport const projects: Project[] = ${JSON.stringify(result.projects, null, 2)};\n\nexport const initialStats: StatsResponse = ${JSON.stringify(result.initialStats, null, 2)};\n`);
  await rename(temporary, output);
  console.log(`Imported ${result.projects.length} games from games.txt. Cards, totals and top ${statsConfig.topGamesCount} are automatic.`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch(error => { console.error(`[games.txt] ${error instanceof Error ? error.message : error}`); process.exitCode = 1; });
}
