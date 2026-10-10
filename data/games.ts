export type Game = {
  icon: string
  slug: string
  title: string
  tagline: string
  description: string
  added: string
}

// Each game is a self-contained HTML file at public/games/<slug>/index.html.
// Add new games to the top of this list.
export const games: Game[] = [
  {
    icon: "/games/icons/snack-slash.svg",
    slug: "snack-slash",
    title: "Snack Slash",
    tagline: "Parent on a mission. Snacks in trouble.",
    description:
      "Swipe through flying junk food, chain combos, and spare the healthy snacks. Play Lunch Rush or slice just for fun with mouse or touch.",
    added: "2026-10-10",
  },
  {
    icon: "/games/icons/q-bee.svg",
    slug: "q-bee",
    title: "Q-BEE",
    tagline: "A little cube. A long way down.",
    description:
      "Steer a smiling cube through 20 themed drops, collect qoins, and land in jello. Story Mode, Free Play, and a wardrobe full of squish.",
    added: "2026-10-09",
  },
  {
    icon: "/games/icons/notebook-invasion.svg",
    slug: "notebook-invasion",
    title: "Notebook Invasion",
    tagline: "The margin is under attack.",
    description:
      "Play as the stick figure defending the neighborhood, or fly the UFO and beam up cows. Works with keyboard, mouse, or touch.",
    added: "2026-10-08",
  },
]
