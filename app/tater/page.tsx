import Link from "next/link"
import type { Metadata } from "next"
import GameLauncher from "@/components/game-launcher"
import { games } from "@/data/games"

export const metadata: Metadata = {
  title: "Tater Arcade",
  description: "Little browser games we build together.",
  alternates: {
    canonical: "/tater",
  },
  openGraph: {
    title: "Tater Arcade | Sterling Chin",
    description: "Little browser games we build together. Pick one and press play.",
    url: "https://sterlingchin.com/tater",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tater Arcade | Sterling Chin",
    description: "Little browser games we build together. Pick one and press play.",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function GamesPage() {
  return (
    <main className="min-h-svh bg-[#f1eddf] px-5 py-7 text-[#35463d] sm:px-12 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6 border-b border-[#bec5b1] pb-5">
          <Link href="/" className="text-xs font-semibold tracking-wide text-[#647060] transition hover:text-[#35463d]">← STERLING CHIN</Link>
          <span className="font-mono text-[10px] tracking-[2px] text-[#647060]">FAMILY MADE. JUST FOR FUN.</span>
        </div>
        <header className="relative overflow-hidden pb-10 pt-12 sm:pb-14 sm:pt-16">
          <p className="mb-4 font-mono text-[10px] tracking-[3px] text-[#9c6546]">WELCOME TO OUR LITTLE CORNER OF PLAY</p>
          <h1 className="text-6xl font-extrabold tracking-[-3px] sm:text-8xl">Tater<span className="text-[#bb714b]"> arcade.</span></h1>
          <div className="mt-6 flex items-end justify-between gap-6">
            <p className="max-w-lg text-base leading-relaxed text-[#647060]">From the margins of a notebook to the back of the snack drawer. Pick a collection. Find your next adventure.</p>
            <span aria-hidden="true" className="hidden rotate-[-7deg] rounded-lg border-2 border-[#be815b] px-5 py-3 font-mono text-xs text-[#9c6546] sm:block">GOOD IDEAS<br />GET TO PLAY.</span>
          </div>
        </header>
        <GameLauncher games={games} />
        <footer className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-[#bec5b1] py-7 font-mono text-[10px] tracking-wide text-[#647060]">
          <span>{String(games.length).padStart(2, "0")} GAMES / MORE ADVENTURES ON THE WAY</span>
          <span>PLAY A LITTLE. IMAGINE A LOT.</span>
        </footer>
      </div>
    </main>
  )
}
