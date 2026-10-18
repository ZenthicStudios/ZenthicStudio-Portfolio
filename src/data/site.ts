import type { Testimonial } from "./types.ts";
export const site = {
  name: "Zenthic Studios",
  shortName: "ZENTHIC",
  wordmarkSuffix: "STUDIOS",
  monogram: "Z",
  socialImage: "/og-image.png",
  socialDescription:
    "Your next obsession. Built here. Independent Roblox development, gameplay systems and polished UI/UX.",
  title: "Zenthic Studios — Roblox Developer & Freelance Scripter",
  description:
    "Independent Roblox developer and freelance scripter. Explore 13 projects, live game statistics, gameplay systems and polished UI/UX. Open for commissions.",
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
      "I turn ambitious ideas into Roblox experiences worth coming back to. From the first line of Luau to the final layer of polish.",
    original:
      "Crafting immersive Roblox experiences with advanced gameplay systems, polished UI/UX design, and optimized performance.",
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
        "Only projects where I contributed more than 80% of the work are listed here.",
    },
    services: {
      number: "04",
      eyebrow: "WHAT I BRING",
      title: "One developer.\nThe whole picture.",
      description:
        "From a focused gameplay system to a full-scale experience. Built with care, inside and out.",
    },
    process: {
      number: "05",
      eyebrow: "FROM IDEA TO LAUNCH",
      title: "No guesswork.\nJust forward motion.",
      description:
        "A clear path from your first message to a game you can put in players’ hands.",
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
    years: 4,
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
    solo: "Solo development",
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
    otherEmpty: "No additional projects at this time",
    countLabel: "projects",
  },
  developer: {
    name: "Zenthic",
    role: "Owner · Roblox Scripter",
    experience: "4 years of experience",
  },
  services: [
    {
      id: "01",
      name: "Gameplay systems",
      description:
        "Advanced gameplay mechanics that turn a good idea into something players want to master.",
      tags: ["Gameplay Mechanics", "Luau", "Roblox Studio"],
    },
    {
      id: "02",
      name: "Complete experiences",
      description:
        "Full-scale game development, from simulator progression to connected tycoon frameworks.",
      tags: [
        "Simulator Development",
        "Tycoon Frameworks",
        "Full-Scale Game Development",
      ],
    },
    {
      id: "03",
      name: "Interface & polish",
      description:
        "Polished UI/UX design and optimized performance, so the experience feels as good as it plays.",
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
        "Tell me about your idea, your players and what success looks like. We define the scope together.",
    },
    {
      title: "The blueprint",
      description:
        "We agree on the deliverables, timeline and quote before development begins.",
    },
    {
      title: "The build",
      description:
        "I develop the experience, share progress and refine the details with your feedback.",
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
      "Open for commissions & collaborations. Ready to bring your vision to life.",
    discordCta: "Join our Discord",
    emailCta: "Send an email",
  },
  footer: {
    tagline: "Crafting exceptional Roblox experiences.",
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
