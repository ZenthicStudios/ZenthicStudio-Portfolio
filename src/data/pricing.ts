import type { PaymentPlan } from "./types";
export const pricing = {
  starting: "Starting from",
  cta: "Start a project",
  terms: "Negotiable. No maximum. Larger projects scale with scope.",
  paymentLabel: "How payment works",
  selector: "Payment currency",
  plans: [
    {
      id: "paypal",
      name: "PayPal",
      currency: "USD",
      amount: 349,
      prefix: "$",
      suffix: "",
      subtitle: "Your idea. Built properly.",
      note: "We agree on scope and a quote first. Payment details are confirmed directly before work begins.",
      details: "TO BE PROVIDED: PayPal payment link or email.",
      link: null,
      email: null,
    },
    {
      id: "robux",
      name: "Robux",
      currency: "R$",
      amount: 99000,
      prefix: "",
      suffix: " R$",
      subtitle: "Built for the Roblox ecosystem.",
      note: "We agree on scope and the Robux total first. Transfer method and any fees are confirmed directly.",
      details: "TO BE PROVIDED: Robux payment instructions and fee policy.",
      link: null,
      email: null,
    },
  ] satisfies PaymentPlan[],
  legacyNote:
    "Previously listed options: Bank Transfer, Credit/Debit Card and Crypto (USDT). Ask about current availability.",
};
