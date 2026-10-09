import type { Metadata } from "next"
import GameLauncher from "@/components/game-launcher"
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
    <main className="min-h-svh bg-[#19192c] px-6 py-8 text-[#fff9e9] sm:px-12 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-6">
          <a href="/" className="text-xs font-semibold tracking-wide text-[#a4a4bb] transition hover:text-white">← STERLING CHIN</a>
          <span className="font-mono text-[10px] tracking-[2px] text-[#a4a4bb]">THE FAMILY ARCADE</span>
        </div>
        <header className="pb-10 pt-14 sm:pb-12 sm:pt-20">
          <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[2px] text-[#d9f890]"><span className="h-1.5 w-1.5 rounded-full bg-[#d9f890]" /> SMALL IDEAS. BIG ADVENTURES.</p>
          <h1 className="text-5xl font-extrabold tracking-[-2px] sm:text-7xl">Pick your <span className="text-[#d9f890]">play.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#a4a4bb]">A collection of games we dream up and build together.<br className="hidden sm:block" /> Pick a square. Open a world. Make yourself at home.</p>
        </header>
        <GameLauncher games={games} />
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 font-mono text-[10px] tracking-wide text-[#8e8ea8]">
          <span>{String(games.length).padStart(2, "0")} GAMES / MORE ADVENTURES ON THE WAY</span>
          <span>PLAY A LITTLE. IMAGINE A LOT.</span>
        </footer>
      </div>
    </main>
  )
}
