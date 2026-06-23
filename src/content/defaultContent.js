import { v4 as uuidv4 } from 'uuid';

export const defaultProfile = {
  name: "Aniket Pattanaik",
  role: "Product Manager",
  location: "Kolkata, IN",
  status: "Open to new problems",
  hero: {
    statement: "I take messy, ambiguous problems and ship the version that actually moves a number — across growth, platform and 0→1.",
    facts: [
      { k: "Focus", v: "0→1 · Growth · Platform" },
      { k: "Based", v: "Kolkata , IN" },
      { k: "Shipping since", v: "2024" },
    ],
    education: [
      {
        name: "IIM Ranchi",
        short: "IIM-R",
        course: "MBA-BA",
        year: "2024",
        logo: "https://placehold.co/100x100?text=IIMR", // Placeholder for actual base64
      },
    ],
    certifications: [
      // Extracted from HTML design requirement
      {
        issuer: "Google",
        cert: "Project Management",
        year: "2023",
        short: "PM",
        logo: "https://placehold.co/100x100?text=GOOG"
      }
    ]
  },
};

export const defaultProjects = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    year: "2025",
    title: "Project Alpha",
    blurb: "A brief description of Project Alpha.",
    cover: "https://placehold.co/800x600?text=Project+Alpha",
    tags: ["0→1", "Growth"],
  },
  {
    id: uuidv4(),
    order: 1,
    schemaVersion: 1,
    idx: "02",
    year: "2024",
    title: "Platform Scaling",
    blurb: "A brief description of Platform Scaling.",
    cover: "https://placehold.co/800x600?text=Platform+Scaling",
    tags: ["Platform"],
  }
];

export const defaultCaseStudies = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    kicker: "Growth",
    title: "Unlocking User Retention",
    problem: "Users were dropping off after the first 7 days.",
    approach: "Implemented a habit-forming core loop.",
    outcome: "Increased D7 retention by 15%.",
    metrics: [{ v: "+15%", l: "D7 Retention" }],
  }
];

export const defaultTeardowns = [
  {
    id: uuidv4(),
    order: 0,
    schemaVersion: 1,
    idx: "01",
    app: "Linear",
    title: "Speed as a feature",
    verdict: "Keyboard-first, optimistic UI, zero spinner culture.",
    tags: ["Craft", "Perf"],
    rating: 9.1,
    scores: [8.0, 9.6, 9.8, 9.4, 8.2],
    details: defaultTeardownDetail,
  },
  {
    id: uuidv4(),
    order: 1,
    schemaVersion: 1,
    idx: "02",
    app: "Duolingo",
    title: "Streaks that respect you",
    verdict: "Loss-aversion done with warmth instead of dark patterns.",
    tags: ["Retention", "Behavior"],
    rating: 8.4,
    scores: [9.2, 8.4, 8.6, 8.0, 7.6],
    details: defaultTeardownDetail,
  }
];

export const defaultTeardownDetail = {
  context: "I pulled {app} apart to understand one thing: how it earns the next tap. This is a working teardown — the notes below are the friction I felt as a first-time user, the moves I'd happily steal, and the places where the seams still show. Swap this copy for the real write-up.",
  broken: [
    "The first run asks for a decision before it has earned one — the opening screen is a wall, not a doorway.",
    "The thing I actually came to do sits one menu too deep; the primary action should never be a treasure hunt.",
    "Some state changes happen in silence — no confirmation, no motion — so I'm never quite sure the action landed.",
  ],
  works: [
    "The core loop is tight: the primary action stays within thumb reach and is rarely more than a tap away.",
    "Motion is used as explanation, not decoration — every transition tells me where I came from and where I'm headed.",
    "Defaults are opinionated. {app} makes the boring choices for me so I can spend attention on the interesting ones.",
  ],
  screens: [
    { tag: "first run", cap: "Onboarding — the first decision {app} asks of a new user." },
    { tag: "core loop", cap: "The main flow, annotated for the aha-moment." },
    { tag: "edge case", cap: "What happens when something goes wrong." },
  ],
  criteria: ["First-run", "Core flow", "Craft & polish", "Performance", "Trust signals"],
};

export const defaultAnalytics = {
  intro: "A short field guide to how I reason about product metrics — what I instrument, what I ignore, and how I keep a team honest.",
  projects: [
    {
      id: uuidv4(),
      order: 0,
      schemaVersion: 1,
      idx: "01",
      year: "2025",
      title: "Metric Deep Dive",
      blurb: "Analysis of user behavior over time.",
      cover: "https://placehold.co/800x600?text=Metrics",
      stat: { v: "42%", l: "Activation Rate" },
      tags: ["Analytics"],
    }
  ]
};

export const defaultContent = {
  ...defaultProfile,
  projects: defaultProjects,
  caseStudies: defaultCaseStudies,
  teardowns: defaultTeardowns,
  analytics: defaultAnalytics,
};
