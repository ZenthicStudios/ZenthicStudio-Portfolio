import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { pricing } from "../data/pricing";
import { site } from "../data/site";
import { formats } from "../data/config";
import { Action, Reveal, SectionHeading } from "./Primitives";
export default function Payment() {
  const [selected, setSelected] = useState(pricing.plans[0].id);
  return (
    <section id="pricing" className="section">
      <SectionHeading section={site.sections.pricing} />
      <div
        className="payment-toggle"
        role="group"
        aria-label={pricing.selector}
      >
        {pricing.plans.map((plan) => (
          <button
            key={plan.id}
            aria-pressed={selected === plan.id}
            onClick={() => setSelected(plan.id)}
          >
            {plan.name}
          </button>
        ))}
      </div>
      <div className="pricing-grid">
        {pricing.plans.map((plan, index) => (
          <Reveal
            key={plan.id}
            index={index}
            className={`price-card ${selected === plan.id ? "is-selected" : ""}`}
          >
            <div className="price-card-top">
              <h3>{plan.name}</h3>
              <span>
                {plan.currency}
                <ArrowUpRight aria-hidden="true" />
              </span>
            </div>
            <p>{plan.subtitle}</p>
            <div className="price">
              <span>{pricing.starting}</span>
              <strong>
                {plan.prefix}
                {plan.amount.toLocaleString(formats.locale)}
                <small>{plan.suffix}</small>
              </strong>
            </div>
            <div className="price-terms">
              <Check aria-hidden="true" />
              <p>{pricing.terms}</p>
            </div>
            <Action
              href={
                plan.link ?? (plan.email ? `mailto:${plan.email}` : "#contact")
              }
              external={Boolean(plan.link)}
            >
              {pricing.cta}
            </Action>
            <div className="payment-note">
              <strong>{pricing.paymentLabel}</strong>
              <p>{plan.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="legacy-payment">{pricing.legacyNote}</p>
    </section>
  );
}
