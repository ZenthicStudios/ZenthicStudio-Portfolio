# Editing the Zenthic Studios portfolio

You can simply ask for changes in chat. These files keep future edits small and predictable.

## Add a game: one link

Edit the root `games.txt`, paste a full Roblox place link on a new line, and commit to `main`. Vercel automatically builds the existing project. The importer resolves IDs, fetches the name and official icon/cover, creates the card, and connects live statistics. The portfolio count, totals, sorting and top three update automatically. No other file needs editing. Remove a line to remove that game. Duplicate places/universes count once.

`scripts/sync-games.ts` runs before development and production builds. It writes `src/data/generated-projects.ts`, re-exported by `src/data/projects.ts` for both the frontend and API. A real, visit-ranked build snapshot initializes the UI until live data arrives; cached data remains clearly marked. Invalid links or missing public metadata stop the build with an actionable error and leave current production intact. Artwork is optional and safely falls back while live artwork refreshes.

`src/data/curated-projects.json` preserves the original 13 titles, stable slugs and local artwork fallbacks. New cards use Roblox names, stable universe-based slugs and automatic images; no contribution percentage or ownership claim is inferred. Existing titles such as Tsunami Runners remain as supplied by the owner. Optional editorial overrides belong in curated data, but are never required to add a game. Full instructions are in README.md.

## Pricing and payment

Edit `src/data/pricing.ts`. It owns amounts, symbols, labels, notes, optional payment links/emails, and the payment-detail placeholders. USD starts at $349; Robux starts at **99,999 R$**, formatted directly from its numeric amount. Neither has a ceiling.

Still to provide:

- PayPal payment link or email. The existing contact email is **not** assumed to be a PayPal account.
- Robux transfer instructions and who covers any platform fees.

Credit/Debit Card, Bank Transfer and Crypto are also listed, each with a $349 USD minimum and no maximum. Card provider/link, bank instructions, and accepted crypto coins/networks are confirmed directly; no financial destinations are invented. Until payment details are supplied, all five buttons lead to the working Contact section. There is no payment processor or checkout, and no charge is made by this site.

## Copy, social links and testimonials

`src/data/site.ts` owns section text, navigation, service descriptions, process steps, SEO metadata and testimonials. Testimonials remain hidden while the array is empty. Add real quotes only.

The biography uses the owner's updated wording: **4 years of experience**, with complete games built solo from scratch. Scripting is the specialty; UI, building, rigging, animation and basic modeling are additional scoped services. Be explicit that these add cost beyond scripting with supplied assets, and that a starting budget is not a fixed price for an entire game. Project cards show no contribution labels, percentages or ownership statements, as requested by the owner. The commission process covers Roblox identity, studio/team, prior games, scope, asset responsibilities, timing and agreed payment structure. The Discord is for hiring Zenthic, with casual general chat; it is not a developer hiring marketplace or a free support service.

`src/data/socials.ts` owns the Discord server invite, the owner's confirmed Discord handle @Zenthic06 and profile link (user 1373741701977342015), ZenthicStudios@gmail.com and the Zenthic06 Roblox profile (user 5005008636). The no-JavaScript contact text in `index.html` matches the email. Use the labels Discord Server and Discord User. Discord User opens the owner's profile; messaging availability follows Discord privacy settings.

## Change the theme

`src/styles/tokens.css` is the single visual token source: colors, gradients, radii, shadows, spacing, fonts, fluid sizes and CSS durations. Motion interaction settings live in `src/data/config.ts`. Both fonts are self-hosted Latin variable fonts. Favicon and social preview artwork are static brand assets in `public/`; update those assets too for a brand change.

## Live data and caching

`src/data/config.ts` owns refresh frequency, timeouts, edge/stale durations, icon and place-ID cache durations, top-game count, ranking field and tie-breakers. Ranking happens only on the server. No browser request goes to the Roblox JSON APIs.

The endpoint returns one shared snapshot to Hero, Stats, TopGames and Projects. It requests all universes in one games-API batch, plus one icon batch and one landscape-thumbnail batch when artwork caches expire. `server/artwork.ts` requests Roblox's default thumbnail with `defaults=true`, accepts completed official CDN URLs and caches successful images for one day per warm instance. Hero/gallery use the live landscape image; Top Games uses the live icon. Local images remain available if Roblox or the CDN fails. Known universe IDs avoid repeated resolution across cold starts; place-only IDs use a 30-day warm-instance resolution cache.

Last-good snapshots survive upstream errors **inside a warm function instance**. Vercel's CDN also retains successful responses. This free-tier design does not claim durable cross-instance storage: a cold function with no prior success returns null totals and empty rankings, which display as “—” and portfolio order. No third-party cache or paid service is required.

Healthy responses use the configured shared CDN cache header. Stale/empty failure responses and rejected methods use `no-store` so outages are not cached as fresh snapshots. Refresh errors produce a concise server-side warning.

## Run and deploy

Use Node 22.12+ (Node 24 is suitable for Vercel). Run `npm ci`, then `npm run dev`. The Vite development and production-preview servers both serve the real `/api/roblox-stats` handler; no extra proxy or account is needed locally.

`npm run build` checks browser and server TypeScript and creates a static `dist/`. `npm test` checks the stats service; `npm run lint` checks the source. Vercel deploys the static frontend plus the one function under `api/`. No SSR, ISR or Vercel image optimization is used. Vercel's production hostname environment variable supplies the canonical URL and absolute social-image URL at build time.

The server dependency chain uses `.js` import specifiers even in TypeScript source: Vercel emits `.js` files and Node resolves those exact names. Root `tsconfig.json` supplies NodeNext settings because Vercel does not follow TypeScript project references. The browser retains its own bundler configuration. `tests/runtime.test.ts` compiles and invokes the API in plain Node to catch startup errors hidden by Vite/tsx.

Game genres are separate from technical skills: the Game genres block lists Tycoon and Simulator. Service tags and the skills strip contain capabilities and tools only; do not label genres as frameworks.
