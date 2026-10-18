import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { interaction } from "../data/config";
import { useRobloxStats } from "../hooks/useRobloxStats";
import { Counter, LiveBadge, Reveal, SectionHeading } from "./Primitives";
export default function Stats() {
  const { data, loading, failed, refresh } = useRobloxStats();
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    const tick = () => {
      if (!document.hidden) setNow(Date.now());
    };
    const timer = setInterval(tick, interaction.ageTickMs);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const age = data?.updatedAt
    ? Math.max(
        0,
        Math.floor(
          (now - Date.parse(data.updatedAt)) /
            interaction.millisecondsPerSecond,
        ),
      )
    : null;
  const metrics = [
    { label: site.stats.visits, value: data?.totalVisits },
    { label: site.stats.playing, value: data?.totalPlaying },
    { label: site.stats.projects, value: projects.length },
    { label: site.stats.experience, value: site.stats.years },
  ];
  return (
    <section id="stats" className="section stats-section">
      <div className="stats-heading">
        <SectionHeading section={site.sections.stats} />
        <div className="stats-status">
          <LiveBadge
            loading={loading}
            offline={!data?.updatedAt && !loading}
            stale={data?.stale}
          />
          <span aria-live="polite">
            {age != null
              ? `${site.stats.updated} ${age}${site.stats.ago}`
              : loading
                ? site.stats.pending
                : site.stats.unavailable}
          </span>
          <button
            className="icon-button"
            aria-label={site.stats.refresh}
            onClick={() => void refresh()}
            disabled={loading}
          >
            <RefreshCw aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="stats-grid">
        {metrics.map((metric, index) => (
          <Reveal index={index} key={metric.label} className="metric">
            <div
              className={
                loading && index < 2
                  ? "skeleton metric-number"
                  : "metric-number"
              }
            >
              <Counter value={metric.value} />
            </div>
            <span>{metric.label}</span>
          </Reveal>
        ))}
      </div>
      {failed && data?.updatedAt && (
        <p className="stats-note">{site.stats.cached}</p>
      )}
      <details className="historical-note">
        <summary>{site.stats.historical.split(".")[0]}.</summary>
        <p>{site.stats.historical}</p>
      </details>
    </section>
  );
}
