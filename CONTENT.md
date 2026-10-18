# Editing the Zenthic Studios portfolio

You can simply ask for changes in chat. These files keep future edits small and predictable.

## Add a project: one object

Add one object to `src/data/projects.ts`, with `name`, a unique permanent `slug`, `thumbnail`, `tags`, `role`, `description`, `links`, and `status`. Copy the shape of an existing entry. Add `game: { placeId: ... }` or `game: { universeId: ... }` to connect Roblox statistics. Both are accepted; when both exist, the universe ID is preferred.

- Save a compressed WebP/AVIF thumbnail in `public/images/` and use `/images/filename.webp`.
- Keep the slug unchanged when a name, status or description changes. It preserves the card identity and animations.
- `links.play` and `links.video` are optional. Do not add empty or invented URLs.
- Tags automatically create the project filters. The full role and description are displayed without duplication.
- `src/data/games.ts` automatically includes projects with a game ID. Its `additionalGames` array can also add live games without a portfolio card.
- Rankings, top games, the portfolio count and filters update automatically. No manual rank field is needed.

All 13 game IDs and stable slugs are preserved, and all artwork has a local WebP copy. Contribution labels describe scripting rather than every discipline involved in making a game. Tsunami Runners uses the owner's supplied current title and link while retaining its original internal slug and artwork fallbacks.

## Pricing and payment

Edit `src/data/pricing.ts`. It owns amounts, symbols, labels, notes, optional payment links/emails, and the payment-detail placeholders. USD starts at $349; Robux starts at **99,999 R$**, formatted directly from its numeric amount. Neither has a ceiling.

Still to provide:

- PayPal payment link or email. The existing contact email is **not** assumed to be a PayPal account.
- Robux transfer instructions and who covers any platform fees.

Credit/Debit Card, Bank Transfer and Crypto are also listed, each with a $349 USD minimum and no maximum. Card provider/link, bank instructions, and accepted crypto coins/networks are confirmed directly; no financial destinations are invented. Until payment details are supplied, all five buttons lead to the working Contact section. There is no payment processor or checkout, and no charge is made by this site.

## Copy, social links and testimonials

`src/data/site.ts` owns section text, navigation, service descriptions, process steps, SEO metadata and testimonials. Testimonials remain hidden while the array is empty. Add real quotes only.

The biography uses the owner's updated wording: **4 years of experience**, with complete games built solo from scratch. Scripting is the specialty; UI, building, rigging, animation and basic modeling are additional scoped services. Be explicit that these add cost beyond scripting with supplied assets, and that a starting budget is not a fixed price for an entire game. Most portfolio work remains described as 80–100% scripted by Zenthic; do not reinterpret that as ownership of every asset. The commission process covers Roblox identity, studio/team, prior games, scope, asset responsibilities, timing and agreed payment structure. The Discord is for hiring Zenthic, with casual general chat; it is not a developer hiring marketplace or a free support service.

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
