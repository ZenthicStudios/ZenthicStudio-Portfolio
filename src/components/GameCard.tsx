import { useRef, type MouseEvent } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useInView,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { GameStats, Project } from "../data/types";
import { formats, interaction } from "../data/config";
import { site } from "../data/site";
import { Counter, LiveBadge } from "./Primitives";
export default function GameCard({
  project,
  game,
  featured = false,
  position,
  stale,
  hidden = false,
}: {
  project: Project;
  game?: GameStats;
  featured?: boolean;
  position?: number;
  stale?: boolean;
  hidden?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const rotateX = useSpring(rx, interaction.spring);
  const rotateY = useSpring(ry, interaction.spring);
  const rank = game?.rank ?? position;
  const rectRef = useRef<DOMRect | null>(null);
  function move(event: MouseEvent<HTMLElement>) {
    if (reduced || !matchMedia(interaction.finePointer).matches) return;
    const rect = rectRef.current;
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    rx.set(-(y / rect.height - 0.5) * interaction.tiltDegrees);
    ry.set((x / rect.width - 0.5) * interaction.tiltDegrees);
    glowX.set(x);
    glowY.set(y);
  }
  return (
    <m.article
      ref={ref}
      hidden={hidden}
      layout={!reduced}
      transition={interaction.spring}
      className={`game-card ${featured ? "featured-card" : ""} rank-${rank} ${inView ? "in-view" : ""}`}
    >
      <m.div
        className="card-surface"
        style={{ rotateX, rotateY }}
        onMouseEnter={(event) => {
          rectRef.current = event.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={move}
        onMouseLeave={() => {
          rx.set(0);
          ry.set(0);
          rectRef.current = null;
        }}
      >
        <m.div
          className="card-glow"
          aria-hidden="true"
          style={{ x: glowX, y: glowY }}
        />
        <div className="card-image">
          <img
            src={
              featured
                ? (game?.thumbnail ?? project.icon ?? project.thumbnail)
                : project.thumbnail
            }
            alt={project.name}
            width={featured ? 512 : 768}
            height={featured ? 512 : 432}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              const fallback = project.thumbnail;
              if (!event.currentTarget.src.endsWith(fallback))
                event.currentTarget.src = fallback;
            }}
          />
          {rank && (
            <span
              className={`rank-badge ${featured ? "large-rank" : ""}`}
              aria-label={`${site.projects.rank} ${rank}`}
            >
              {formats.rankPrefix}
              {String(rank).padStart(formats.indexLength, formats.indexPad)}
            </span>
          )}
          {project.status && (
            <span className="card-status">{project.status}</span>
          )}
        </div>
        <div className="card-content">
          <div className="card-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.role !== project.description && <p>{project.role}</p>}
          <div className="card-stats">
            <span>
              <Counter value={game?.visits} /> {site.projects.visits}
            </span>
            <span>
              <i className="status-dot" />
              <Counter value={game?.playing} /> {site.projects.playing}
            </span>
          </div>
          <div className="card-links">
            {project.links.play && (
              <a
                href={project.links.play}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.projects.play}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {project.links.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.projects.video}
                <ArrowUpRight aria-hidden="true" />
              </a>
            )}
            {featured && <LiveBadge stale={stale} offline={!game} />}
          </div>
        </div>
      </m.div>
    </m.article>
  );
}
