export type Game = {
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
    icon: "/tater/icons/woobly.svg",
    slug: "woobly",
    title: "Woobly",
    tagline: "One foot. Then the other.",
    description:
      "Drag a pair of ridiculously long legs over crates and gaps. Keep your balance and beat your best distance with mouse or touch.",
    added: "2026-10-18",
  },
  {
    icon: "/tater/icons/snack-slash.svg",
    slug: "snack-slash",
    title: "Snack Slash",
    tagline: "Parent on a mission. Snacks in trouble.",
    description:
      "Swipe through flying junk food, chain combos, and spare the healthy snacks. Play Lunch Rush or slice just for fun with mouse or touch.",
    added: "2026-10-10",
  },
  {
    icon: "/tater/icons/q-bee.svg",
    slug: "q-bee",
    title: "Q-BEE",
    tagline: "A little cube. A long way down.",
    description:
      "Steer a smiling cube through 20 themed drops, collect qoins, and land in jello. Story Mode, Free Play, and a wardrobe full of squish.",
    added: "2026-10-09",
  },
  {
    icon: "/tater/icons/notebook-invasion.svg",
    slug: "notebook-invasion",
    title: "Notebook Invasion",
    tagline: "The margin is under attack.",
    description:
      "Play as the stick figure defending the neighborhood, or fly the UFO and beam up cows. Works with keyboard, mouse, or touch.",
    added: "2026-10-08",
  },
]
