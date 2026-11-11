import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { useRobloxStats } from "../hooks/useRobloxStats";
import { SectionHeading } from "./Primitives";
import GameCard from "./GameCard";
export default function Projects() {
  const [sort, setSort] = useState(site.projects.sorts[0].value);
  const { data } = useRobloxStats();
  const stats = useMemo(
    () => new Map(data?.games.map((game) => [game.slug, game])),
    [data],
  );
  const visible = useMemo(() => {
    const list = [...projects];
    if (sort === "name") list.sort((a, b) =>
      (a.automaticName ? (stats.get(a.slug)?.name ?? a.name) : a.name).localeCompare(
        b.automaticName ? (stats.get(b.slug)?.name ?? b.name) : b.name));
    if (sort === "rank" && data?.games.length)
      list.sort(
        (a, b) =>
          (stats.get(a.slug)?.rank ?? Infinity) -
          (stats.get(b.slug)?.rank ?? Infinity),
      );
    return list;
  }, [sort, stats, data]);
  return (
    <section id="projects" className="section">
      <SectionHeading section={site.sections.projects} />
      <div className="project-toolbar">
        <label className="sort-label">
          <span className="sr-only">{site.projects.sortLabel}</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            {site.projects.sorts.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <span className="sr-only" aria-live="polite">
        {visible.length}{" "}
        {site.projects.countLabel}
      </span>
      <div className="project-grid">
        {visible.map((project) => (
          <GameCard
            key={project.slug}
            project={project}
            game={stats.get(project.slug)}
            stale={data?.stale}
          />
        ))}
      </div>
      {!visible.length && <p>{site.projects.empty}</p>}
      <div className="other-projects">
        <span>{site.projects.other}</span>
        <p>{site.projects.otherEmpty}</p>
      </div>
    </section>
  );
}
