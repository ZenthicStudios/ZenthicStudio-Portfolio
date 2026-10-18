import { statsConfig as config } from "../src/data/config.js";

type Image = { state: string; imageUrl: string };
type CachedImage = { url: string; expires: number };

// Only official, completed CDN images may replace the local fallback.
function imageUrl(image: Image | undefined) {
  if (image?.state !== "Completed" || typeof image.imageUrl !== "string")
    return;
  try {
    const url = new URL(image.imageUrl);
    if (
      url.protocol === "https:" &&
      (url.hostname === "rbxcdn.com" || url.hostname.endsWith(".rbxcdn.com"))
    )
      return url.href;
  } catch {
    /* Invalid artwork must not interrupt statistics. */
  }
}

export function createArtworkService(fetcher: typeof fetch, now: () => number) {
  const icons = new Map<number, CachedImage>();
  const covers = new Map<number, CachedImage>();

  async function refreshKind(
    ids: number[],
    signal: AbortSignal,
    kind: "icon" | "cover",
  ) {
    const cache = kind === "icon" ? icons : covers;
    const missing = ids.filter((id) => (cache.get(id)?.expires ?? 0) <= now());
    if (!missing.length) return;
    const query = new URLSearchParams({
      universeIds: missing.join(","),
      format: config.iconFormat,
      size: kind === "icon" ? config.iconSize : config.thumbnailSize,
      ...(kind === "icon"
        ? { isCircular: "false" }
        : { countPerUniverse: "1", defaults: "true" }),
    });
    try {
      const response = await fetcher(
        `${kind === "icon" ? config.iconsUrl : config.thumbnailsUrl}?${query}`,
        {
          signal,
          headers: { Accept: "application/json" },
        },
      );
      if (!response.ok) return;
      const payload = (await response.json()) as {
        data?: (Image & {
          targetId: number;
          universeId: number;
          thumbnails?: Image[];
        })[];
      };
      if (!Array.isArray(payload.data)) return;
      for (const item of payload.data) {
        const id = kind === "icon" ? item.targetId : item.universeId;
        if (!missing.includes(id)) continue;
        const url = imageUrl(kind === "icon" ? item : item.thumbnails?.[0]);
        if (url) cache.set(id, { url, expires: now() + config.iconCacheMs });
      }
    } catch {
      /* Artwork is optional; keep the last image or local fallback. */
    }
  }
  return {
    refresh: (ids: number[], signal: AbortSignal) =>
      Promise.all([
        refreshKind(ids, signal, "icon"),
        refreshKind(ids, signal, "cover"),
      ]),
    icon: (id: number) => icons.get(id)?.url,
    cover: (id: number) => covers.get(id)?.url,
  };
}
