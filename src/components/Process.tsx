import { useRef } from "react";
import { m, useReducedMotion, useScroll } from "motion/react";
import { site } from "../data/site";
import { formats } from "../data/config";
import { Reveal, SectionHeading } from "./Primitives";
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  return (
    <section id="process" className="section process-section">
      <SectionHeading section={site.sections.process} />
      <div className="timeline" ref={ref}>
        <m.div
          className="timeline-fill"
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : scrollYProgress }}
        />
        {site.process.map((step, index) => (
          <Reveal className="process-step" index={index} key={step.title}>
            <span>
              {String(index + 1).padStart(
                formats.indexLength,
                formats.indexPad,
              )}
            </span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
