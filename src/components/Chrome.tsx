import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { interaction } from "../data/config";
import { site } from "../data/site";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  useMotionValueEvent(scrollY, "change", (value) =>
    setScrolled(value > interaction.navThreshold),
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: interaction.activeMargin },
    );
    for (const link of site.nav) {
      const node = document.getElementById(link.id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        {site.skip}
      </a>
      <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <header className={`navbar ${scrolled ? "compact" : ""}`}>
        <a className="brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            {site.monogram}
          </span>
          <span>
            {site.shortName}
            <small>{site.wordmarkSuffix}</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label={site.navLabel}>
          {site.nav.map((link) => (
            <a
              className={active === link.id ? "active" : ""}
              aria-current={active === link.id ? "location" : undefined}
              href={`#${link.id}`}
              key={link.id}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          {site.cta}
          <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          ref={toggleRef}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? site.menuClose : site.menuOpen}
        >
          {open ? <X /> : <Menu />}
        </button>
        <AnimatePresence>
          {open && (
            <m.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label={site.navLabel}
              initial={{
                opacity: 0,
                y: reduced ? 0 : -interaction.reveal.distance,
              }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {site.nav.map((link) => (
                <a
                  href={`#${link.id}`}
                  key={link.id}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)}>
                {site.cta}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </m.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
export function Intro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(interaction.introKey);
    } catch {
      return false;
    }
  });
  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(interaction.introKey, "seen");
    } catch {
      /* Session storage is optional. */
    }
  };
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(
      () => {
        setVisible(false);
        try {
          sessionStorage.setItem(interaction.introKey, "seen");
        } catch {
          /* Optional. */
        }
      },
      reduced ? 0 : interaction.introMs,
    );
    return () => clearTimeout(timer);
  }, [visible, reduced]);
  return (
    <AnimatePresence>
      {visible && !reduced && (
        <m.div
          className="intro"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: interaction.reveal.duration / 2 }}
        >
          <m.span
            className="intro-mark"
            initial={{ scale: interaction.tapScale, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {site.monogram}
            <small>{site.shortName}</small>
          </m.span>
          <button onClick={dismiss}>
            {site.introSkip}
            <ArrowUpRight aria-hidden="true" />
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, interaction.spring);
  const sy = useSpring(y, interaction.spring);
  useEffect(() => {
    const query = matchMedia(interaction.finePointer);
    const update = () => setEnabled(query.matches && !reduced);
    update();
    query.addEventListener("change", update);
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      query.removeEventListener("change", update);
      window.removeEventListener("pointermove", move);
    };
  }, [reduced, x, y]);
  return enabled ? (
    <m.div
      aria-hidden="true"
      className="cursor-ring"
      style={{ x: sx, y: sy }}
    />
  ) : null;
}
