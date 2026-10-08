export type Game = {
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
    slug: "notebook-invasion",
    title: "Notebook Invasion",
    tagline: "The margin is under attack.",
    description:
      "Play as the stick figure defending the neighborhood, or fly the UFO and beam up cows. Works with keyboard, mouse, or touch.",
    added: "2026-10-08",
  },
]
