import { ArrowUpRight } from "lucide-react";
import { site } from "../data/site";
import { socials } from "../data/socials";
import { Reveal } from "./Primitives";
export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <Reveal>
        <div className="eyebrow">
          <span className="status-dot" />
          {site.contact.eyebrow}
        </div>
        <h2>
          {site.contact.headline}
          <ArrowUpRight aria-hidden="true" />
        </h2>
        <div className="contact-bottom">
          <p>{site.contact.description}</p>
          <div className="contact-links">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
              >
                <span>
                  {social.label}
                  <strong>{social.value}</strong>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
