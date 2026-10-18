import { useRef } from "react";
import {
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight, Code2 } from "lucide-react";
import { site } from "../data/site";
import { projects } from "../data/projects";
import { interaction, formats } from "../data/config";
import { Action } from "./Primitives";
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, interaction.parallaxDistance],
  );
  const project =
    projects.find((item) => item.slug === site.hero.previewSlug) ?? projects[0];
  return (
    <section id="home" ref={ref} className={`hero ${inView ? "in-view" : ""}`}>
      <m.div
        className="hero-art"
        aria-hidden="true"
        style={{ y: reduced ? 0 : y }}
      >
        <div className="orbital orbital-one" />
        <div className="orbital orbital-two" />
        <div className="orbital orbital-three" />
        <div className="red-core">
          <span>{site.monogram}</span>
        </div>
        <div className="crosshair crosshair-one" />
        <div className="crosshair crosshair-two" />
      </m.div>
      <div className="hero-content">
        <div className="eyebrow hero-eyebrow">
          <span className="status-dot" />
          {site.hero.eyebrow}
        </div>
        <h1 aria-label={site.hero.lines.join(" ")}>
          {site.hero.lines.map((line, index) => (
            <span
              className={`headline-line line-${index}`}
              key={line}
              aria-hidden="true"
            >
              <m.span
                initial={reduced ? false : { y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: interaction.reveal.duration,
                  delay: index * interaction.headlineStagger,
                }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <Action href="#projects">{site.viewWork}</Action>
          <Action href="#contact" secondary>
            {site.start}
          </Action>
        </div>
        <div className="hero-proof">
          <span className="status-dot" />
          {site.availability}
          <span className="proof-divider" />
          {site.developer.experience}
        </div>
      </div>
      <div className="hero-aside">
        <span className="vertical-caption">{site.hero.caption}</span>
        <a
          className="hero-project"
          href={project.links.play}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={project.thumbnail}
            alt={project.name}
            width="768"
            height="432"
            fetchPriority="high"
          />
          <div>
            <span className="eyebrow">{site.hero.feature}</span>
            <strong>{project.name}</strong>
            <ArrowUpRight aria-hidden="true" />
          </div>
        </a>
        <div className="hero-stamp">
          <Code2 aria-hidden="true" />
          {site.hero.stamp}
        </div>
      </div>
      <div className="hero-bottom">
        <a href="#stats">
          <ArrowDown aria-hidden="true" />
          {site.hero.scroll}
        </a>
        <span>
          {site.hero.selected}
          <i />
          {String(projects.length).padStart(
            formats.indexLength,
            formats.indexPad,
          )}
        </span>
      </div>
    </section>
  );
}
