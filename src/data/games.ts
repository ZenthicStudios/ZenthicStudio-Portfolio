import { projects } from "./projects.ts";
import type { GameConfig } from "./types.ts";

// Projects with a game identity join the live ranking automatically.
// Additional games can be listed here without creating a portfolio project.
export const additionalGames: GameConfig[] = [];
export const games: GameConfig[] = [
  ...projects
    .filter((project) => project.game)
    .map((project) => ({
      ...project.game,
      slug: project.slug,
      name: project.name,
      thumbnail: project.icon ?? project.thumbnail,
      playUrl: project.links.play,
    })),
  ...additionalGames,
];
