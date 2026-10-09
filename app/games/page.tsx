import type { Metadata } from "next"
import { games } from "@/data/games"

export const metadata: Metadata = {
  title: "Games",
  description: "Little browser games we build together.",
  alternates: {
    canonical: "/games",
  },
  openGraph: {
    title: "Game Night | Sterling Chin",
    description: "Little browser games we build together. Pick one and press play.",
    url: "https://sterlingchin.com/games",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Game Night | Sterling Chin",
    description: "Little browser games we build together. Pick one and press play.",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function GamesPage() {
  return (
    <main className="min-h-svh px-4 py-12 sm:py-20">
      <div
        className="mx-auto max-w-4xl -rotate-[0.3deg] border border-[#d4d0c5] bg-[#faf7ed] px-6 pb-10 pt-8 text-[#343943] shadow-[0_16px_60px_#45423740] sm:px-12"
        style={{
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
          backgroundImage:
            "linear-gradient(to right, transparent 46px, #d9828270 46px, #d9828270 48px, transparent 48px), repeating-linear-gradient(to bottom, transparent 0, transparent 30px, #b1c5cf66 30px, #b1c5cf66 31px)",
        }}
      >
        <header className="pl-10 sm:pl-12">
          <p className="font-mono text-[11px] uppercase tracking-[3px] text-[#77796f]">
            Sketchbook games
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
            Game <span className="text-[#416d96]">Night</span> ✳
          </h1>
          <p className="mt-3 text-lg text-[#64665f]">
            Games we dream up and build together. Pick one and press play.
          </p>
        </header>

        <ul className="mt-10 grid gap-6 pl-10 sm:grid-cols-2 sm:pl-12">
          {games.map((game, i) => (
            <li key={game.slug}>
              <a
                href={`/games/${game.slug}`}
                className="block h-full rounded-[5px_12px_7px_10px] border-2 border-[#343943] bg-[#faf8ed] p-5 shadow-[4px_5px_0_#35394314] transition hover:-translate-y-1 hover:-rotate-1 hover:bg-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-[#416d96]"
              >
                <span className="font-mono text-[11px] tracking-[2px] text-[#888]">
                  No. {String(games.length - i).padStart(3, "0")}
                </span>
                <strong className="mt-2 block text-2xl">{game.title}</strong>
                <span className="mt-1 block text-[#b5504f]">{game.tagline}</span>
                <p className="mt-3 font-mono text-[13px] leading-relaxed text-[#65685f]">
                  {game.description}
                </p>
                <span className="mt-4 block font-bold text-[#416d96]">Play →</span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 pl-10 font-mono text-[11px] text-[#787a73] sm:pl-12">
          More pages coming soon.
        </p>
      </div>
    </main>
  )
}
