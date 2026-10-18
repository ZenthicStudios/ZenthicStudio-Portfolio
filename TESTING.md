# Verification — 18 October 2026

## Follow-up: Vercel startup fix and minor updates

- Public production `/api/roblox-stats` reproduced HTTP 500 `FUNCTION_INVOCATION_FAILED` before changes.
- An isolated build with `@vercel/node` 24.0.3 reproduced `ERR_MODULE_NOT_FOUND`: emitted JavaScript imported a missing `server/roblox.ts`. After `.js` imports and root NodeNext compiler settings, the same builder's output invoked successfully (HTTP 200, 13 games, official icons and landscape covers).
- Build, strict TypeScript, lint and seven tests passed. New plain-Node regression covers compiled startup, 405/HEAD, non-cacheable outages and recovery to cacheable valid data.
- Browser checks: all 13 official covers used, one shared initial poll across four consumers, current email/profile links correct. All four USD methods display $349; Robux remains 99,000 R$. All five CTAs lead to Contact.
- Twenty mobile payment switches retained existing card nodes. Twenty project filter cycles retained all 13 articles, zero added/removed nodes. Hidden-tab polling remains paused. Viewports 360–3840px have no horizontal overflow; no JavaScript errors observed.
- Blocking Roblox CDN requests restored local images. Desktop pricing and mobile pricing/contact screenshots were inspected.
- Vercel plugin installed, but project/log requests returned 403 for the owning team; no teams were visible to this connection and no authenticated CLI was available. This does not invalidate the reproduced/fixed build error, but deployment verification needs the owning team's authorization.
- The Lighthouse scores below belong to the earlier redesign; they were not rerun for these minor changes.

Follow-up checklist: open the updated deployment, confirm live totals and artwork, switch all five mobile payment options, and open the email/Roblox links. No Roblox Studio test applies.

## Automated checks actually run

- Production build, strict client/server TypeScript, ESLint: passed.
- Six server tests: passed. These exercise aggregation/ranking, one batch for 20 concurrent readers plus 20 cached repeats, stale fallback and recovery, malformed/partial responses, long-lived place/icon cache reuse and duplicate-universe protection.
- Dependency audit after cleanup: zero reported vulnerabilities.
- Real Roblox endpoint: HTTP 200, expected cache header, all 13 games. The observed snapshot contained 3,416,807 visits and 6 current players; these are observations, not hardcoded UI data.
- Headless Chrome: no JavaScript errors or broken images on the tested page.
- Viewports 360, 390, 768, 1440, 2560 and 3840 pixels: no horizontal overflow.
- Twenty full filter cycles: same 13 article nodes retained; zero article additions/removals per action. Collaboration filter displayed two projects; All work displayed 13. Name sorting passed.
- Mobile menu opens, Escape closes it and restores focus. PayPal/Robux toggle displays the appropriate plan.
- Empty testimonials are hidden. Reduced-motion mode omits the intro and decorative motion.
- Cold unavailable snapshot shows “—” and config-order cards while retaining all 13 projects.
- Simulated Page Visibility changes: one initial request, one at 60 seconds, zero requests during three hidden minutes, one refresh when visible again.

## Lighthouse against the production preview

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 94 | 99 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Cumulative layout shift | 0 | 0 |

These are local Chrome lab results, not guarantees for every device/network or the eventual Vercel deployment. No physical mid-range phone FPS measurement was performed. Formatting after these measurements did not change behavior; build, typecheck, lint and server tests were rerun successfully.

Initial JS: approximately 94.1 KiB gzip. Lazy Motion features: 18.8 KiB gzip. CSS: 6.7 KiB gzip. Self-hosted Latin fonts: 47.1 KiB total. All 26 local game images together: approximately 1.29 MB, loaded lazily except the hero artwork.

## Review checklist

- Open at desktop and phone width; use keyboard navigation and the skip link.
- Try all project filters and sort options, then open an experience link.
- Confirm Top Games and project badges agree; refresh stats and watch counters.
- Check the unavailable/cached labels if Roblox is unreachable.
- Switch mobile payment plans and confirm both Start a project buttons reach Contact while payment details are absent.
- Verify the existing Discord invite and email destination.
- Reload to confirm the intro appears only once per session; try reduced motion.
- Repeat filters, menu and payment toggles quickly; cards should remain stable.
- After a Vercel deployment, check `/api/roblox-stats` and CDN cache behavior on that deployment. This local check does not claim production deployment or production cache verification.

Roblox Studio, respawns, rejoining and multiplayer tests do not apply to this standalone portfolio website. No game framework or persistent player data was changed.

Additional checks passed: intro skip and once-per-session persistence; failure polling backs off first to 120 seconds, then 240 seconds.
