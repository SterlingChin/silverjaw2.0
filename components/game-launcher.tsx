"use client"

import { useEffect, useRef, useState } from "react"
import { series, type Game } from "@/data/games"
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
      <nav className={styles.tabs} aria-label="Game collections">
        {series.map((collection) => <a key={collection.id} href={`#${collection.id}`}>{collection.title} <span>↗</span></a>)}
      </nav>
      <div className={styles.collections}>
      {series.map((collection) => (
        <section key={collection.id} id={collection.id} className={styles.collection} aria-labelledby={`title-${collection.id}`}>
          <header className={styles.collectionHeader}>
            <span className={styles.collectionNumber} style={{ color: collection.color }}>{collection.number}</span>
            <div><h2 id={`title-${collection.id}`}>{collection.title}</h2><p>{collection.subtitle}</p></div>
            <span className={styles.count}>{games.filter(game => game.series === collection.id).length} {games.filter(game => game.series === collection.id).length === 1 ? "GAME" : "GAMES"}</span>
          </header>
          <ul className={styles.grid}>
        {games.filter(game => game.series === collection.id).map((game, index) => (
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
        </section>
      ))}
      </div>

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
              src={`/tater/${selected.slug}`}
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
