# Verification — 18 October 2026

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
