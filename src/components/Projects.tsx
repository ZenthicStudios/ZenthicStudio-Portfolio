import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import { site } from "../data/site";
import { useRobloxStats } from "../hooks/useRobloxStats";
import { SectionHeading } from "./Primitives";
import GameCard from "./GameCard";
export default function Projects() {
  const [filter, setFilter] = useState(site.projects.all);
  const [sort, setSort] = useState(site.projects.sorts[0].value);
  const { data } = useRobloxStats();
  const stats = useMemo(
    () => new Map(data?.games.map((game) => [game.slug, game])),
    [data],
  );
  const filters = useMemo(
    () => [
      site.projects.all,
      ...new Set(projects.flatMap((project) => project.tags)),
    ],
    [],
  );
  const visible = useMemo(() => {
    const list = [...projects];
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
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
        <div
          className="filters"
          role="group"
          aria-label={site.projects.filterLabel}
        >
          {filters.map((tag) => (
            <button
              key={tag}
              aria-pressed={filter === tag}
              className={filter === tag ? "selected" : ""}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
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
        {
          visible.filter(
            (project) =>
              filter === site.projects.all || project.tags.includes(filter),
          ).length
        }{" "}
        {site.projects.countLabel}
      </span>
      <div className="project-grid">
        {visible.map((project) => (
          <GameCard
            key={project.slug}
            project={project}
            game={stats.get(project.slug)}
            stale={data?.stale}
            hidden={
              filter !== site.projects.all && !project.tags.includes(filter)
            }
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
