# Project map

## Runtime and ownership

React 18 + strict TypeScript + Vite. Static frontend with one Node/Vercel function. `src/main.tsx` loads local subset fonts and global CSS, then `src/App.tsx` composes an error boundary, reduced-motion configuration, lazy Motion features, navigation and sections.

Section order: `#home` → `#stats` → `#top-games` → `#projects` → `#services` → `#process` → `#pricing` → optional `#testimonials` → `#contact` → footer.

There is no Roblox game framework, player data store, persistent user data, currency mutation, remote event or checkout in this website. The unused Supabase/browser-password administration files were removed; no database was accessed or changed.

## Data ownership and dependents

| File | Owns | Consumers checked |
| --- | --- | --- |
| `src/data/projects.ts` | All 13 existing projects, stable slugs, tags, roles, links, images, place/universe IDs | Hero, Stats, Projects, TopGames, games.ts |
| `src/data/games.ts` | Derived game list + optional additional games | server/roblox.ts, TopGames |
| `src/data/site.ts` | Copy, navigation, SEO, services, developer biography, process, empty testimonials | All section components, Chrome, Primitives, ErrorBoundary, Vite metadata plugin |
| `src/data/pricing.ts` | Two configurable plans and explicit missing payment details | Payment |
| `src/data/socials.ts` | Existing Discord/email destinations | Contact, ErrorBoundary |
| `src/data/config.ts` | API URLs, timing, cache, ranking, formatting, motion settings | Server, hook, Chrome, Hero, GameCard, Primitives, Process, Payment, Stats, TopGames, API tests |
| `src/data/types.ts` | Project, game identity, game config, stats response, payment and testimonial shapes | Data files, server, shared hook, GameCard, tests |
| `src/styles/tokens.css` | Global design tokens | index.css |
| `src/styles/fonts.css` | Self-hosted Latin variable fonts | main.tsx, preloaded by index.html |
| `src/hooks/useRobloxStats.ts` | Single shared client snapshot, in-flight dedupe, visible-tab polling, backoff, abort cleanup | Stats, TopGames, Projects |
| `src/components/Primitives.tsx` | Reveal, magnetic action, counter, status and section heading | All relevant section components |
| `src/components/GameCard.tsx` | Reusable tilt/glow game presentation; stable DOM identity | Projects, TopGames |
| `server/roblox.ts` | Server-only fetches, validation, aggregate, deterministic ranks, warm caches | api/roblox-stats.ts, tests/roblox.test.ts |
| `api/roblox-stats.ts` | HTTP method handling and cache header | Vercel, Vite dev/preview middleware |
| `vite.config.ts` | Dev/preview API adapter, metadata injection, static build | Vite commands |
| `vercel.json` | Function duration, static caching and security headers | Vercel |

## New HTTP contract

`GET /api/roblox-stats` returns `{ totalVisits: number | null, totalPlaying: number | null, games: GameStats[], topGames: GameStats[], updatedAt: ISO-string | null, stale: boolean }`.

`GameStats = { slug, universeId, name, visits, playing, rank, thumbnail }`. Ranks sort descending by visits, descending by playing, ascending by name, then universe ID for fully equal values. `topGames` is the server-ranked prefix. Duplicate universes are counted once. Invalid/partial upstream data never replaces the last accepted totals. Unsupported methods return 405; Roblox failures return 200 with stale data or honest nulls.

Cache header: `public, s-maxage=60, stale-while-revalidate=300`. Upstream deadline: 5 seconds across resolution/stats/icons. Browser deadline: 8 seconds. Client refresh: 60 seconds, visible tabs only; exponential failure backoff to 8 minutes. In-flight requests are shared; last unsubscribe aborts outstanding work. Detailed warm-cache limitations are documented in CONTENT.md.

## UI lifecycle and performance

Project filter changes hide/reuse existing keyed articles; sorting reorders stable nodes and Motion animates transforms. Cards measure bounds once per pointer entry. Motion's heavy DOM features are split into a separate chunk. All images have explicit dimensions, local compressed fallbacks and lazy loading below the hero. No continuous canvas rendering or per-card polling exists. Observers and listeners disconnect on cleanup; CSS animation pauses offscreen on the hero, marquee and card badges. Reduced motion disables decorative movement and the intro.

## Verification

`npm run build`, `npm test`, `npm run lint`. `tests/roblox.test.ts` covers ranking, aggregate correctness, 20-way deduplication, cached repeats, stale fallback/recovery, partial/malformed data, resolution/icon cache reuse and duplicate identities. Browser QA and Lighthouse results are recorded in TESTING.md.
