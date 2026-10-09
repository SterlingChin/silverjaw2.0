"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { contentItems, type ContentItem } from "@/data/content"

type ContentFilter = "All" | ContentItem["type"]

const filters: ContentFilter[] = ["All", "Blog", "Video", "Repo", "Media"]
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]
const initialLimit = 6

function dateKey(date: string) {
  const [month, year] = date.split(" ")
  return `${year}-${String(months.indexOf(month) + 1).padStart(2, "0")}`
}

const sortedContent = [...contentItems].sort((a, b) =>
  dateKey(b.date).localeCompare(dateKey(a.date))
)

export function ContentSection() {
  const [filter, setFilter] = useState<ContentFilter>("All")
  const [expanded, setExpanded] = useState(false)
  const filtered = sortedContent.filter(
    (item) => filter === "All" || item.type === filter
  )
  const shown = expanded ? filtered : filtered.slice(0, initialLimit)

  return (
    <section id="content" aria-labelledby="content-heading" className="py-20">
      <div className="site-container">
        <p className="section-kicker">From the workbench</p>
        <h2
          id="content-heading"
          className="display-heading mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl"
        >
          Writing, demos &amp; experiments.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A curated selection of things I&apos;ve written, recorded, and built
          while exploring how agents work with APIs.
        </p>

        <div
          role="group"
          aria-label="Filter by content type"
          className="mt-8 flex flex-wrap gap-2"
        >
          {filters.map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={filter === type}
              aria-controls="content-list"
              onClick={() => {
                setFilter(type)
                setExpanded(false)
              }}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                filter === type
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-transparent text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {shown.length} of {filtered.length} {filter === "All" ? "items" : `${filter.toLowerCase()} items`}.
        </p>

        <ul id="content-list" className="mt-7 divide-y divide-border border-y border-border">
          {shown.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-3 rounded-xl px-3 py-6 transition-colors hover:bg-card sm:grid-cols-[5rem_1fr_auto_auto] sm:px-4"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {item.type}
                </span>
                <h3 className="col-span-2 row-start-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary sm:col-span-1 sm:row-start-auto">
                  {item.title}
                </h3>
                <time
                  dateTime={dateKey(item.date)}
                  className="col-start-2 row-start-1 whitespace-nowrap text-sm text-muted-foreground sm:col-start-auto sm:row-start-auto"
                >
                  {item.date}
                </time>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 text-primary sm:block"
                />
              </a>
            </li>
          ))}
        </ul>

        {filtered.length > initialLimit ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="content-list"
            onClick={() => setExpanded((value) => !value)}
            className="button-secondary mt-6"
          >
            {expanded ? "Show fewer" : `Show all ${filtered.length}`}
          </button>
        ) : null}
      </div>
    </section>
  )
}
