import type { Testimonial } from "./types.ts";
const scriptingYears = 3;
export const site = {
  name: "Zenthic Studios",
  shortName: "ZENTHIC",
  wordmarkSuffix: "STUDIOS",
  monogram: "Z",
  socialImage: "/og-image.png",
  socialDescription:
    "Roblox games built from scratch by Zenthic06. Clean, modular scripting, complete game development and separately scoped UI, building and animation work.",
  title: "Zenthic Studios",
  description:
    `Zenthic06, independent Roblox developer with around ${scriptingYears} years of scripting experience. From individual systems to complete games built solo, ready for launch. Open for commissions.`,
  navLabel: "Main navigation",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  skip: "Skip to content",
  nav: [
    { id: "projects", label: "Work" },
    { id: "services", label: "Expertise" },
    { id: "process", label: "Process" },
    { id: "pricing", label: "Pricing" },
  ],
  cta: "Let’s talk",
  viewWork: "Explore my work",
  start: "Start a project",
  availability: "OPEN FOR COMMISSIONS",
  introSkip: "Skip intro",
  hero: {
    eyebrow: "INDEPENDENT ROBLOX DEVELOPER",
    lines: ["YOUR NEXT", "OBSESSION.", "BUILT HERE."],
    description:
      `Hey, I’m Zenthic. I turn ideas into complete Roblox games, built solo from scratch. Around ${scriptingYears} years of scripting experience, with clean, modular code at the core of everything I make.`,
    original:
      "From a single gameplay system to a complete Roblox game, with scope, assets and launch requirements agreed before development begins.",
    stamp: "SOLO DEV. FULL COMMITMENT.",
    caption: "CODE. CREATE. CAPTIVATE.",
    scroll: "SCROLL TO EXPLORE",
    feature: "FROM THE PORTFOLIO",
    selected: "SELECTED WORK",
    previewSlug: "build-and-seek",
  },
  sections: {
    stats: {
      number: "01",
      eyebrow: "THE NUMBERS, LIVE",
      title: "Built to be played.",
      description: "Real games. Real players. Direct from Roblox.",
    },
    top: {
      number: "02",
      eyebrow: "THE LEADERBOARD",
      title: "Leading the lineup.",
      description: "The most visited experiences in my portfolio, ranked live.",
    },
    projects: {
      number: "03",
      eyebrow: "SELECTED WORK",
      title: "Ideas made playable.",
      description:
        "Most projects here are 80–100% scripted by me. I can also share relevant examples where I worked on specific systems.",
    },
    services: {
      number: "04",
      eyebrow: "WHAT I BRING",
      title: "One developer.\nFrom idea to launch.",
      description:
        "Scripting is my strongest skill. I also bring the other pieces together to build complete Roblox experiences, from simulators and tycoons to other game genres.",
    },
    process: {
      number: "05",
      eyebrow: "FROM IDEA TO LAUNCH",
      title: "No guesswork.\nJust forward motion.",
      description:
        "Scope, expectations and payment terms agreed before development begins.",
    },
    pricing: {
      number: "06",
      eyebrow: "LET’S MAKE IT HAPPEN",
      title: "Big ideas. Clear starting points.",
      description:
        "Scripting with supplied assets or a complete game built from scratch: we agree exactly what is included before I quote. UI, building, modeling, rigging and animation add to the scope and cost.",
    },
    testimonials: {
      number: "07",
      eyebrow: "CLIENT NOTES",
      title: "In their words.",
      description: "",
    },
  },
  stats: {
    visits: "TOTAL VISITS",
    playing: "PLAYING NOW",
    projects: "PROJECTS IN PORTFOLIO",
    experience: "YEARS OF EXPERIENCE",
    years: scriptingYears,
    live: "LIVE",
    stale: "CACHED",
    offline: "OFFLINE",
    loading: "CONNECTING",
    updated: "Updated",
    ago: "s ago",
    unavailable: "Live stats are temporarily unavailable.",
    cached: "Showing the last successful update.",
    pending: "Connecting to Roblox…",
    refresh: "Refresh stats",
  },
  projects: {
    all: "All work",
    solo: "Solo scripting",
    collaboration: "Collaborations",
    filterLabel: "Filter projects",
    sortLabel: "Sort projects",
    sorts: [
      { value: "rank", label: "Live ranking" },
      { value: "original", label: "Portfolio order" },
      { value: "name", label: "Name: A–Z" },
    ],
    play: "Play experience",
    video: "Watch showcase",
    visits: "visits",
    playing: "playing",
    rank: "Rank",
    fallback: "PORTFOLIO ORDER · LIVE RANKING UNAVAILABLE",
    empty: "No projects match this filter.",
    other: "Other Projects",
    otherEmpty: "Looking for a specific system? Ask me for relevant examples beyond the projects shown here.",
    countLabel: "projects",
  },
  developer: {
    name: "Zenthic",
    role: "Solo Roblox Developer · Scripting Specialist",
    experience: `Around ${scriptingYears} years of scripting`,
  },
  services: [
    {
      id: "01",
      name: "Gameplay systems",
      description:
        "Custom gameplay systems built for your requirements, with clean Luau and modular code that’s straightforward to maintain.",
      tags: ["Gameplay Mechanics", "Luau", "Roblox Studio"],
    },
    {
      id: "02",
      name: "Complete game development",
      description:
        "A complete game built solo from scratch: core loops, progression, interfaces and the pieces needed for launch. Simulators, tycoons and other genres, shaped around your idea and agreed scope.",
      tags: [
        "Simulator Development",
        "Tycoon Frameworks",
        "Solo Game Development",
      ],
    },
    {
      id: "03",
      name: "UI, assets & final polish",
      description:
        "I can create UI, build environments, rig and animate, and handle basic modeling. Scripting remains my specialty; I’ll be clear about asset complexity before we agree the work. These services cost extra beyond scripting with assets supplied.",
      tags: ["UI & Building", "Basic Modeling", "Rigging & Animation"],
    },
  ],
  skills: [
    "LUAU",
    "ROBLOX STUDIO",
    "GAMEPLAY SYSTEMS",
    "UI / UX",
    "BUILDING",
    "RIGGING & ANIMATION",
    "SIMULATORS",
    "TYCOON FRAMEWORKS",
    "OPTIMIZATION",
  ],
  process: [
    {
      title: "The conversation",
      description:
        "Share your project, Roblox username and any studio or team details. Links to games you’ve developed or published help me understand your background.",
    },
    {
      title: "The agreement",
      description:
        "We agree deliverables, who supplies each asset, timeline, quote and payment structure. UI and asset production are quoted separately from scripting-only work. If payment is on completion, we settle fair terms for both sides first.",
    },
    {
      title: "The build",
      description:
        "I build the agreed systems and any included UI or assets, share progress and work through feedback with you. Clean, modular scripting keeps the game straightforward to expand.",
    },
    {
      title: "The final polish",
      description:
        "We test the agreed gameplay, review the final details and prepare the handoff. For complete games, that includes the launch preparation we agreed in the scope.",
    },
  ],
  testimonials: [] as Testimonial[],
  contact: {
    eyebrow: "HAVE SOMETHING IN MIND?",
    headline: "LET’S BUILD\nWHAT’S NEXT.",
    description:
      "Hire me for a system or a complete game. Share your idea, budget, timeline and the assets you already have. My Discord is the place for private commission enquiries and a little community conversation.",
    discordCta: "Discuss a commission",
    emailCta: "Send an email",
  },
  footer: {
    tagline: "Your idea. My craft. A Roblox game ready to play.",
    rights: "All rights reserved.",
    top: "Back to top",
    credit: "INDEPENDENT BY DESIGN.",
  },
  error: {
    title: "Something interrupted the experience.",
    message: "Please reload the page, or reach out directly.",
    retry: "Reload page",
  },
};
