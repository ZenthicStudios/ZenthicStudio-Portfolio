# Zenthic Studios

## Add a game

1. Open [games.txt](https://github.com/ZenthicStudios/ZenthicStudio-Portfolio/edit/main/games.txt).
2. Paste the full Roblox game page link on a new line.
3. Click **Commit changes** and save to **main**.

That's all. Vercel builds and updates the existing website automatically. No manual deployment or production promotion is needed.

The code resolves the game ID, fetches its Roblox name, icon and cover image, creates its portfolio card, updates the game count and totals, and ranks the top three by visits. Live visits, active players, rankings and images keep refreshing after publication. New game names also follow Roblox's live name. You do not need to enter IDs, upload artwork or sort anything.

The **Refresh stats** button requests a fresh update, shows progress and temporarily disables itself. It bypasses the normal minute-long cache, with a five-second shared cooldown to prevent repeated clicks from flooding Roblox. Roblox may return the same numbers if player activity has not changed.

Use a full place link, like `https://www.roblox.com/games/123456/Game-Name`, rather than a Roblox share/invite link. One link per line; blank lines and lines starting with `#` are ignored. Repeated links or different places in the same experience are counted once. Delete a line to remove that game from the portfolio and rankings.

Existing custom titles and contribution labels are preserved. New games do not claim a scripting percentage: Roblox cannot verify your contribution. No extra fields are required.

If a link is invalid, the game has no public details, or Roblox's details service is unavailable after retries, the build explains the problem and the existing production site stays live. Missing artwork uses a safe fallback until Roblox supplies it. The saved build snapshot keeps genuine rankings available while live stats load or are unavailable; it is labeled as cached data.

## Development

`npm install`, then `npm run dev`. Both `npm run dev` and `npm run build` import `games.txt` automatically and require access to Roblox's public APIs. `npm test` checks importing, ranking, error handling and the compiled Vercel API. `npm run lint` checks source quality.

`src/data/generated-projects.ts` is generated automatically; do not edit it. A checked-in baseline allows offline type checks and tests, and each build replaces it from the current list. `src/data/curated-projects.json` preserves existing editorial details and is not needed when adding a game. See [CONTENT.md](CONTENT.md) for other website edits.
