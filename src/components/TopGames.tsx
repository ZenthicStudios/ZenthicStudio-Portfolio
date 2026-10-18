import { games } from "../data/games";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { statsConfig } from "../data/config";
import { useRobloxStats } from "../hooks/useRobloxStats";
import { SectionHeading } from "./Primitives";
import GameCard from "./GameCard";
export default function TopGames() {
  const { data, loading } = useRobloxStats();
  const leaders = data?.topGames.length
    ? data.topGames.map((game) => ({ slug: game.slug, game }))
    : games
        .slice(0, statsConfig.topGamesCount)
        .map((game) => ({ slug: game.slug, game: undefined }));
  return (
    <section id="top-games" className="section">
      <SectionHeading section={site.sections.top} />
      <div className={`top-grid ${loading ? "is-loading" : ""}`}>
        {leaders.map(({ slug, game }, index) => {
          const configured = games.find((item) => item.slug === slug)!;
          const project = projects.find((item) => item.slug === slug) ?? {
            ...configured,
            tags: [],
            role: "",
            description: "",
            status: "",
            links: { play: configured.playUrl },
          };
          return (
            <GameCard
              key={slug}
              project={project}
              game={game}
              featured
              position={index + 1}
              stale={data?.stale}
            />
          );
        })}
      </div>
      {!data?.topGames.length && !loading && (
        <p className="stats-note">{site.projects.fallback}</p>
      )}
    </section>
  );
}
