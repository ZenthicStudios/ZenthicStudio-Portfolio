import type { Testimonial } from "./types.ts";
export const site = {
  name: "Zenthic Studios",
  shortName: "ZENTHIC",
  wordmarkSuffix: "STUDIOS",
  monogram: "Z",
  socialImage: "/og-image.png",
  socialDescription:
    "Roblox scripting by Zenthic06. Clean, modular systems and full game scripting, backed by around 3 years of commission experience.",
  title: "Zenthic Studios — Roblox Developer & Freelance Scripter",
  description:
    "Zenthic06, Roblox developer and freelance scripter with around 3 years of experience. Explore my work, from modular gameplay systems to full game scripting. Open for commissions.",
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
      "Hey, I’m Zenthic. I’ve been scripting on Roblox for around 3 years, building games and systems from scratch. Clean, modular code that’s easy to work with and expand.",
    original:
      "Roblox scripting for individual systems and full games, with clean, modular code and a clear commission process.",
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
      title: "Roblox scripting.\nBuilt around your game.",
      description:
        "From an individual system to full game scripting. Code that fits your project and leaves room to expand.",
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
        "Flexible payment methods to suit your needs. Every project starts with a conversation.",
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
    years: 3,
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
    historical:
      "The previous portfolio reported 10+ games and 3M+ visits. Live totals above cover the games listed here.",
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
    role: "Owner · Roblox Scripter",
    experience: "Around 3 years of scripting",
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
      name: "Full game scripting",
      description:
        "Building and connecting a game’s systems from scratch, from progression and core loops to the logic that brings it all together.",
      tags: [
        "Simulator Development",
        "Tycoon Frameworks",
        "Full Game Scripting",
      ],
    },
    {
      id: "03",
      name: "Interface & polish",
      description:
        "Responsive interfaces, connected gameplay logic and performance improvements for a smoother player experience.",
      tags: ["UI/UX Design", "Performance", "Responsive Interfaces"],
    },
  ],
  skills: [
    "LUAU",
    "ROBLOX STUDIO",
    "GAMEPLAY SYSTEMS",
    "UI / UX",
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
        "We agree the scope, timeline, quote and payment structure: per system, milestones, tasks or another arrangement. For payment on completion, we settle fair terms for both sides first.",
    },
    {
      title: "The build",
      description:
        "I build the agreed systems in clean, modular code, share progress and work through feedback with you.",
    },
    {
      title: "The final polish",
      description:
        "We review the finished work, test the experience and prepare the agreed handoff.",
    },
  ],
  testimonials: [] as Testimonial[],
  contact: {
    eyebrow: "HAVE SOMETHING IN MIND?",
    headline: "LET’S BUILD\nWHAT’S NEXT.",
    description:
      "Tell me what you need built, your budget and your timeline. Take a look through my work, or ask for system examples relevant to your project.",
    discordCta: "Join our Discord",
    emailCta: "Send an email",
  },
  footer: {
    tagline: "Clean Roblox scripting. Built to grow with your game.",
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
