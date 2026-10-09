"use client"

import { useEffect, useRef, useState } from "react"
import type { Game } from "@/data/games"
import styles from "./game-launcher.module.css"

export default function GameLauncher({ games }: { games: Game[] }) {
  const [selected, setSelected] = useState<Game | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const launcherRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!selected) return
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialog?.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selected])

  function closeGame() {
    dialogRef.current?.close()
  }

  return (
    <>
      <ul className={styles.grid}>
        {games.map((game, index) => (
          <li key={game.slug}>
            <button
              className={styles.tile}
              onClick={(event) => {
                launcherRef.current = event.currentTarget
                setSelected(game)
              }}
              aria-label={`Play ${game.title}`}
              aria-haspopup="dialog"
            >
              <span className={styles.art}>
                {/* Local SVG artwork has an intrinsic square ratio and needs no image loader. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={game.icon} alt="" width={400} height={400} />
                <span className={styles.play} aria-hidden="true">↗</span>
                <span className={styles.number}>0{index + 1}</span>
              </span>
              <span className={styles.name}>{game.title}</span>
              <span className={styles.tagline}>{game.tagline}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="active-game-title"
        onClose={() => {
          setSelected(null)
          launcherRef.current?.focus()
        }}
      >
        {selected ? (
          <>
            <div className={styles.windowBar}>
              <div className={styles.windowIdentity}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.icon} alt="" width={36} height={36} />
                <div><span className={styles.nowPlaying}>NOW PLAYING</span><h2 id="active-game-title">{selected.title}</h2></div>
              </div>
              <button className={styles.close} onClick={closeGame} aria-label={`Close ${selected.title} and return to games`}>
                <span>All games</span> <span aria-hidden="true">✕</span>
              </button>
            </div>
            <iframe
              key={selected.slug}
              src={`/games/${selected.slug}`}
              title={`${selected.title} game`}
              className={styles.frame}
              allow="fullscreen"
            />
          </>
        ) : null}
      </dialog>
    </>
  )
}
