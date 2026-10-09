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
    icon: "/games/icons/q-bee.svg",
    slug: "q-bee",
    title: "Q-BEE",
    tagline: "A little cube. A long way down.",
    description:
      "Steer a smiling cube through six themed drops, collect qoins, and land in jello. Story Mode, Free Play, and a wardrobe full of squish.",
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
