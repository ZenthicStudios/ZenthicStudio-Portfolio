import { site } from "../data/site";
import { Reveal, SectionHeading } from "./Primitives";
export default function Testimonials() {
  if (!site.testimonials.length) return null;
  return (
    <section id="testimonials" className="section">
      <SectionHeading section={site.sections.testimonials} />
      <div className="testimonials-grid">
        {site.testimonials.map((item, index) => (
          <Reveal key={item.name} index={index} className="quote">
            <blockquote>{item.quote}</blockquote>
            <strong>{item.name}</strong>
            <p>{item.role}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
