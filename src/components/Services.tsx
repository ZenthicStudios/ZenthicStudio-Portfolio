import { useRef } from "react";
import { useInView } from "motion/react";
import { ArrowUpRight, Code2, Layers, Sparkles } from "lucide-react";
import { site } from "../data/site";
import { Reveal, SectionHeading } from "./Primitives";
const icons = [Code2, Layers, Sparkles];
export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  return (
    <section id="services" className="section services-section">
      <div className="services-intro">
        <SectionHeading section={site.sections.services} />
        <Reveal className="developer-signature">
          <span className="brand-mark">{site.monogram}</span>
          <div>
            <strong>{site.developer.name}</strong>
            <p>{site.developer.role}</p>
          </div>
          <span>{site.developer.experience}</span>
        </Reveal>
      </div>
      <div className="service-list">
        {site.services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal className="service-row" index={index} key={service.id}>
              <span className="service-number">{service.id}</span>
              <Icon aria-hidden="true" />
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="skill-tags">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="service-arrow" aria-hidden="true" />
            </Reveal>
          );
        })}
      </div>
      <div ref={ref} className={`marquee ${visible ? "in-view" : ""}`}>
        <div className="marquee-track">
          {[false, true].map((copy) => (
            <div
              className="marquee-group"
              aria-hidden={copy || undefined}
              key={String(copy)}
            >
              {site.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                  <i aria-hidden="true">✳</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
