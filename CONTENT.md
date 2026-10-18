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

The 13 existing projects retain their names, contribution descriptions and Roblox links. All 13 game IDs have been resolved and all artwork has a local WebP copy. Some Roblox experience names have changed; the original portfolio names remain the editorial titles.

## Pricing and payment

Edit `src/data/pricing.ts`. It owns amounts, symbols, labels, notes, optional payment links/emails, and the payment-detail placeholders. USD starts at $349; Robux starts at 99,000 R$. Neither has a ceiling.

Still to provide:

- PayPal payment link or email. The existing contact email is **not** assumed to be a PayPal account.
- Robux transfer instructions and who covers any platform fees.

Until those are provided, both buttons lead to the working Contact section. There is no payment processor or checkout, and no charge is made by this site.

## Copy, social links and testimonials

`src/data/site.ts` owns section text, navigation, service descriptions, process steps, SEO metadata and testimonials. Testimonials remain hidden while the array is empty. Add real quotes only.

`src/data/socials.ts` owns the existing Discord invite, username and contact email. The previous payment options remain mentioned as options to ask about; the two new plans replace the old price ranges.

## Change the theme

`src/styles/tokens.css` is the single visual token source: colors, gradients, radii, shadows, spacing, fonts, fluid sizes and CSS durations. Motion interaction settings live in `src/data/config.ts`. Both fonts are self-hosted Latin variable fonts. Favicon and social preview artwork are static brand assets in `public/`; update those assets too for a brand change.

## Live data and caching

`src/data/config.ts` owns refresh frequency, timeouts, edge/stale durations, icon and place-ID cache durations, top-game count, ranking field and tie-breakers. Ranking happens only on the server. No browser request goes to the Roblox JSON APIs.

The endpoint returns one cached snapshot to all three consumers. It requests all universes in one games-API batch, plus a separate icon batch only when artwork cache expires. Known universe IDs are committed in project config, avoiding repeated resolution across cold starts. New place-only IDs use a 30-day warm-instance resolution cache. Icons use a one-day warm-instance cache and a local fallback.

Last-good snapshots survive upstream errors **inside a warm function instance**. Vercel's CDN also retains successful responses. This free-tier design does not claim durable cross-instance storage: a cold function with no prior success returns null totals and empty rankings, which display as “—” and portfolio order. No third-party cache or paid service is required.

## Run and deploy

Use Node 22.12+ (Node 24 is suitable for Vercel). Run `npm ci`, then `npm run dev`. The Vite development and production-preview servers both serve the real `/api/roblox-stats` handler; no extra proxy or account is needed locally.

`npm run build` checks browser and server TypeScript and creates a static `dist/`. `npm test` checks the stats service; `npm run lint` checks the source. Vercel deploys the static frontend plus the one function under `api/`. No SSR, ISR or Vercel image optimization is used. Vercel's production hostname environment variable supplies the canonical URL and absolute social-image URL at build time.
