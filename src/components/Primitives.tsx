import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { formats, interaction } from "../data/config";
import { site } from "../data/site";
const compact = new Intl.NumberFormat(formats.locale, formats.compact);
export function Counter({
  value,
  suffix = "",
}: {
  value: number | null | undefined;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(0);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!visible || value == null) return;
    if (reduced) {
      if (ref.current) ref.current.textContent = compact.format(value) + suffix;
      previous.current = value;
      return;
    }
    const controls = animate(previous.current, value, {
      duration: interaction.counterSeconds,
      ease: "easeOut",
      onUpdate: (current) => {
        previous.current = current;
        if (ref.current)
          ref.current.textContent =
            compact.format(Math.round(current)) + suffix;
      },
    });
    return () => controls.stop();
  }, [value, visible, suffix, reduced]);
  return (
    <span
      ref={ref}
      className="counter"
      aria-label={
        value == null
          ? formats.unavailable
          : value.toLocaleString(formats.locale) + suffix
      }
    >
      {value == null ? formats.unavailable : compact.format(value) + suffix}
    </span>
  );
}
export function Reveal({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: interaction.reveal.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: interaction.reveal.margin }}
      transition={{
        duration: interaction.reveal.duration,
        delay: index * interaction.reveal.stagger,
      }}
    >
      {children}
    </m.div>
  );
}
export function SectionHeading({
  section,
}: {
  section: {
    number: string;
    eyebrow: string;
    title: string;
    description: string;
  };
}) {
  return (
    <Reveal className="section-heading">
      <div className="eyebrow">
        <span>{section.number}</span>
        <span>{section.eyebrow}</span>
      </div>
      <h2>{section.title}</h2>
      {section.description && <p>{section.description}</p>}
    </Reveal>
  );
}
export function Action({
  children,
  href,
  secondary = false,
  external = false,
  className = "",
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
  external?: boolean;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, interaction.spring);
  const springY = useSpring(y, interaction.spring);
  const reduced = useReducedMotion();
  const rectRef = useRef<DOMRect | null>(null);
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || !matchMedia(interaction.finePointer).matches) return;
    const rect = rectRef.current;
    if (!rect) return;
    x.set(
      (event.clientX - rect.left - rect.width / 2) *
        interaction.magneticStrength,
    );
    y.set(
      (event.clientY - rect.top - rect.height / 2) *
        interaction.magneticStrength,
    );
  }
  return (
    <m.a
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
      style={{ x: springX, y: springY }}
      onMouseEnter={(event) => {
        rectRef.current = event.currentTarget.getBoundingClientRect();
      }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        rectRef.current = null;
      }}
      whileTap={reduced ? undefined : { scale: interaction.tapScale }}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      <ArrowUpRight aria-hidden="true" />
    </m.a>
  );
}
export function LiveBadge({
  stale = false,
  offline = false,
  loading = false,
}: {
  stale?: boolean;
  offline?: boolean;
  loading?: boolean;
}) {
  return (
    <span
      className={`live-badge ${stale || offline || loading ? "not-live" : ""}`}
    >
      <i aria-hidden="true" />
      {loading
        ? site.stats.loading
        : offline
          ? site.stats.offline
          : stale
            ? site.stats.stale
            : site.stats.live}
    </span>
  );
}
