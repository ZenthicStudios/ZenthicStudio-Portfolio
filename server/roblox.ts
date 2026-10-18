import { games } from "../src/data/games.ts";
import { statsConfig as config } from "../src/data/config.ts";
import type {
  GameConfig,
  GameStats,
  StatsResponse,
} from "../src/data/types.ts";

type Fetcher = typeof fetch;
type RawGame = { id: number; name: string; visits: number; playing: number };
const empty = (): StatsResponse => ({
  totalVisits: null,
  totalPlaying: null,
  games: [],
  topGames: [],
  updatedAt: null,
  stale: true,
});
const validNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

// Each warm function retains its last successful result. Edge caching handles traffic
// across instances; a cold instance without a successful result returns nulls, never invented totals.
export function createStatsService(
  gameList: GameConfig[] = games,
  fetcher: Fetcher = fetch,
  now = Date.now,
) {
  let cached: StatsResponse | undefined;
  let cachedAt = 0;
  let inFlight: Promise<StatsResponse> | undefined;
  const places = new Map<number, { id: number; expires: number }>();
  const icons = new Map<number, { url: string; expires: number }>();

  async function json(url: string, signal: AbortSignal): Promise<unknown> {
    const response = await fetcher(url, {
      signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`Roblox returned ${response.status}`);
    return response.json();
  }
  async function universe(game: GameConfig, signal: AbortSignal) {
    if (validNumber(game.universeId) && game.universeId > 0)
      return game.universeId;
    if (!validNumber(game.placeId) || game.placeId <= 0)
      throw new Error("Missing game identity");
    const previous = places.get(game.placeId);
    if (previous && previous.expires > now()) return previous.id;
    const result = (await json(
      `${config.universeUrl}/${game.placeId}/universe`,
      signal,
    )) as { universeId?: unknown };
    if (!validNumber(result.universeId) || result.universeId <= 0)
      throw new Error("Invalid universe response");
    places.set(game.placeId, {
      id: result.universeId,
      expires: now() + config.placeCacheMs,
    });
    return result.universeId;
  }
  async function refreshIcons(ids: number[], signal: AbortSignal) {
    const missing = ids.filter((id) => (icons.get(id)?.expires ?? 0) <= now());
    if (!missing.length) return;
    try {
      const payload = (await json(
        `${config.iconsUrl}?universeIds=${missing.join(",")}&size=${config.iconSize}&format=${config.iconFormat}&isCircular=false`,
        signal,
      )) as { data?: { targetId: number; state: string; imageUrl: string }[] };
      if (!Array.isArray(payload.data)) return;
      for (const icon of payload.data) {
        if (
          missing.includes(icon.targetId) &&
          icon.state === "Completed" &&
          typeof icon.imageUrl === "string"
        ) {
          const url = new URL(icon.imageUrl);
          if (
            url.protocol === "https:" &&
            (url.hostname.endsWith(".rbxcdn.com") ||
              url.hostname === "rbxcdn.com")
          ) {
            icons.set(icon.targetId, {
              url: url.href,
              expires: now() + config.iconCacheMs,
            });
          }
        }
      }
    } catch {
      /* Artwork is optional. The verified local asset remains available. */
    }
  }
  async function refresh(): Promise<StatsResponse> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    try {
      const resolved = await Promise.all(
        gameList.map(async (game) => ({
          game,
          id: await universe(game, controller.signal),
        })),
      );
      const unique = [
        ...new Map(resolved.map((item) => [item.id, item])).values(),
      ];
      if (!unique.length) return empty();
      const ids = unique.map((item) => item.id);
      const [payload] = await Promise.all([
        json(
          `${config.gamesUrl}?universeIds=${ids.join(",")}`,
          controller.signal,
        ),
        refreshIcons(ids, controller.signal),
      ]);
      const raw = (payload as { data?: RawGame[] }).data;
      if (!Array.isArray(raw)) throw new Error("Invalid games response");
      const byId = new Map(raw.map((game) => [game.id, game]));
      const ranked: GameStats[] = unique.map(({ game, id }) => {
        const value = byId.get(id);
        // Partial upstream responses must not silently reduce totals or falsify ranks.
        if (
          !value ||
          !validNumber(value.visits) ||
          !validNumber(value.playing) ||
          typeof value.name !== "string"
        )
          throw new Error("Incomplete games response");
        return {
          slug: game.slug,
          universeId: id,
          name: value.name,
          visits: value.visits,
          playing: value.playing,
          rank: 0,
          thumbnail: icons.get(id)?.url ?? game.thumbnail,
        };
      });
      ranked.sort((a, b) => {
        const primary = b[config.rankingField] - a[config.rankingField];
        if (primary) return primary;
        for (const key of config.tieBreakers) {
          const difference =
            key === "name"
              ? a.name.localeCompare(b.name, "en")
              : b[key] - a[key];
          if (difference) return difference;
        }
        return a.universeId - b.universeId;
      });
      ranked.forEach((game, index) => {
        game.rank = index + 1;
      });
      cached = {
        totalVisits: ranked.reduce((total, game) => total + game.visits, 0),
        totalPlaying: ranked.reduce((total, game) => total + game.playing, 0),
        games: ranked,
        topGames: ranked.slice(0, config.topGamesCount),
        updatedAt: new Date(now()).toISOString(),
        stale: false,
      };
      cachedAt = now();
      return cached;
    } catch {
      return cached ? { ...cached, stale: true } : empty();
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    get(): Promise<StatsResponse> {
      if (cached && now() - cachedAt < config.cacheSeconds * 1000)
        return Promise.resolve(cached);
      if (!inFlight)
        inFlight = refresh().finally(() => {
          inFlight = undefined;
        });
      return inFlight;
    },
  };
}
export const robloxStats = createStatsService();
export const cacheControl = `public, s-maxage=${config.cacheSeconds}, stale-while-revalidate=${config.staleSeconds}`;
