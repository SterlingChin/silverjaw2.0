export type SeriesId = "notebook" | "q" | "dude" | "snack"

export const series = [
  { id: "notebook", number: "01", title: "Notebook Series", subtitle: "Big adventures. One sheet of paper.", color: "#ba714d" },
  { id: "q", number: "02", title: "Q Series", subtitle: "A little cube with a lot of personality.", color: "#796b9a" },
  { id: "dude", number: "03", title: "Dude Series", subtitle: "Long legs. Questionable balance.", color: "#5d806b" },
  { id: "snack", number: "04", title: "Snack Drawer", subtitle: "Open for a little snack-time chaos.", color: "#b97945" },
] as const

export type Game = {
  series: SeriesId
  icon: string
  slug: string
  title: string
  tagline: string
  description: string
  added: string
}

// Each game is a self-contained HTML file at public/tater/<slug>/index.html.
// Add new games to the top of this list.
export const games: Game[] = [
  {
    series: "notebook",
    icon: "/tater/icons/pencil-patrol.svg",
    slug: "pencil-patrol",
    title: "Pencil Patrol",
    tagline: "Hold the line. Save the doodles.",
    description: "Build a pencil defense, collect graphite, and stop erasers from wiping out your notebook. Five pages of stationery strategy.",
    added: "2026-11-03",
  },
  {
    series: "dude",
    icon: "/tater/icons/woobly.svg",
    slug: "woobly",
    title: "Woobly",
    tagline: "One foot. Then the other.",
    description:
      "Drag a pair of ridiculously long legs over crates and gaps. Keep your balance and beat your best distance with mouse or touch.",
    added: "2026-10-18",
  },
  {
    series: "snack",
    icon: "/tater/icons/snack-slash.svg",
    slug: "snack-slash",
    title: "Snack Slash",
    tagline: "Parent on a mission. Snacks in trouble.",
    description:
      "Swipe through flying junk food, chain combos, and spare the healthy snacks. Play Lunch Rush or slice just for fun with mouse or touch.",
    added: "2026-10-10",
  },
  {
    series: "q",
    icon: "/tater/icons/q-bee.svg",
    slug: "q-bee",
    title: "Q-BEE",
    tagline: "A little cube. A long way down.",
    description:
      "Steer a smiling cube through 20 themed drops, collect qoins, and land in jello. Story Mode, Free Play, and a wardrobe full of squish.",
    added: "2026-10-09",
  },
  {
    series: "notebook",
    icon: "/tater/icons/notebook-invasion.svg",
    slug: "notebook-invasion",
    title: "Notebook Invasion",
    tagline: "The margin is under attack.",
    description:
      "Play as the stick figure defending the neighborhood, or fly the UFO and beam up cows. Works with keyboard, mouse, or touch.",
    added: "2026-10-08",
  },
]
