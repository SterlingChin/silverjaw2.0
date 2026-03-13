# sterlingchin.com Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild sterlingchin.com as a Next.js + Tailwind + shadcn/ui single-page scroll site with dark/light mode amber theme.

**Architecture:** Next.js App Router with a single page (`page.tsx`) that imports 6 section components. Theme via CSS custom properties + next-themes. Content data in a separate TypeScript file. Framer Motion for scroll animations.

**Tech Stack:** Next.js 15, Tailwind CSS v4, shadcn/ui, next-themes, framer-motion, lucide-react (icons), Vercel deployment

**Spec:** `docs/superpowers/specs/2026-03-13-website-rebuild-design.md`

---

## Chunk 1: Project Scaffolding & Theme

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Scaffold Next.js with Tailwind**

Run from parent directory of silverjaw2.0. We're rebuilding in-place, so first preserve the old files, then init.

```bash
cd /Users/sterlingchin/personal/silverjaw2.0
# Preserve old site in git history - it's already committed
# Remove old template files (git tracks history)
rm -rf assets/css assets/js assets/sass assets/webfonts
rm -f index.html LICENSE.txt README.md

# Init Next.js in current directory
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --use-npm
```

Expected: Next.js scaffolded with App Router, Tailwind configured.

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/sterlingchin/personal/silverjaw2.0
npm install next-themes framer-motion lucide-react
```

- [ ] **Step 3: Initialize shadcn/ui**

```bash
npx shadcn@latest init
```

Select: New York style, Neutral base color, CSS variables = yes.

- [ ] **Step 4: Add shadcn components we'll need**

```bash
npx shadcn@latest add button card sheet
```

- [ ] **Step 5: Commit scaffold**

```bash
git add -A
git commit -m "feat: scaffold Next.js + Tailwind + shadcn/ui project"
```

### Task 2: Apply theme and fonts

**Files:**
- Modify: `app/globals.css` (replace with full theme)
- Modify: `app/layout.tsx` (add fonts, theme provider)
- Create: `components/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`

- [ ] **Step 1: Replace globals.css with amber theme**

Replace the contents of `app/globals.css` with the full CSS custom properties from the spec (`:root`, `.dark`, `@theme inline` blocks). Add Tailwind directives at the top:

```css
@import "tailwindcss";

/* Then paste full :root, .dark, and @theme inline from spec */
```

- [ ] **Step 2: Create theme provider**

Create `components/theme-provider.tsx`:

```tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 3: Create theme toggle**

Create `components/theme-toggle.tsx`:

```tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="h-8 w-8"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

- [ ] **Step 4: Update layout.tsx with fonts and theme**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Sterling Chin",
  description: "Senior Developer Advocate at Postman. AI Council Co-Chair. Building tools that make APIs work for AI agents.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Verify theme works**

```bash
npm run dev
```

Open http://localhost:3000. Should see dark background (#171717). Verify no build errors.

- [ ] **Step 6: Commit theme setup**

```bash
git add -A
git commit -m "feat: add amber theme with dark/light mode support"
```

### Task 3: Migrate images to public/

**Files:**
- Move: `images/sterling-primary.jpg` → `public/images/sterling-primary.jpg`
- Move: `images/ms_build_24.jpg` → `public/images/ms_build_24.jpg`
- Move: `images/shift_24.jpg` → `public/images/shift_24.jpg`
- Move: `images/api_world_24.jpg` → `public/images/api_world_24.jpg`
- Move: `images/conexion24.jpg` → `public/images/conexion24.jpg`
- Move: `images/ai_big_data_panel_24.jpeg` → `public/images/ai_big_data_panel_24.jpeg`
- Move: `images/snowboarding-solid.ico` → `public/favicon.ico`

- [ ] **Step 1: Move images**

```bash
cd /Users/sterlingchin/personal/silverjaw2.0
mkdir -p public/images
cp images/sterling-primary.jpg public/images/
cp images/ms_build_24.jpg public/images/
cp images/shift_24.jpg public/images/
cp images/api_world_24.jpg public/images/
cp images/conexion24.jpg public/images/
cp images/ai_big_data_panel_24.jpeg public/images/
cp images/snowboarding-solid.ico public/favicon.ico
```

- [ ] **Step 2: Remove old images directory (pptx files no longer needed)**

```bash
rm -rf images/
```

- [ ] **Step 3: Commit image migration**

```bash
git add -A
git commit -m "chore: migrate images to public/ and remove old assets"
```

---

## Chunk 2: Navigation & Hero

### Task 4: Create sticky navigation

**Files:**
- Create: `components/nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create nav component**

Create `components/nav.tsx`:

```tsx
"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Speaking", href: "#speaking" },
  { label: "Content", href: "#content" },
]

export function Nav() {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px -50% 0px" }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleClick("#hero")
          }}
          className="text-lg font-bold text-primary"
        >
          SC
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href)
              }}
              className={`text-sm transition-colors hover:text-primary ${
                activeSection === item.href.slice(1)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="mt-8 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(item.href)
                    }}
                    className={`text-lg transition-colors hover:text-primary ${
                      activeSection === item.href.slice(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add nav to page.tsx**

Replace `app/page.tsx`:

```tsx
import { Nav } from "@/components/nav"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <section id="hero" className="min-h-screen" />
        <section id="about" className="py-24" />
        <section id="work" className="py-24" />
        <section id="speaking" className="py-24" />
        <section id="content" className="py-24" />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Verify nav renders**

```bash
npm run dev
```

Verify sticky nav appears with SC logo, section links, and theme toggle.

- [ ] **Step 4: Commit nav**

```bash
git add -A
git commit -m "feat: add sticky nav with scroll spy and mobile sheet menu"
```

### Task 5: Create hero section

**Files:**
- Create: `components/hero.tsx`
- Create: `components/social-links.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create social links component (shared by hero and footer)**

Create `components/social-links.tsx`:

```tsx
import { Linkedin, Twitter, Github } from "lucide-react"

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sterlingchin/", icon: Linkedin },
  { label: "X", href: "https://twitter.com/SilverJaw82", icon: Twitter },
  { label: "GitHub", href: "https://github.com/SterlingChin", icon: Github },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/sterlingchin.bsky.social",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.553 3.503 6.092 3.248-4.286.726-8.023 2.489-3.27 8.672C7.757 27.088 11.06 20.48 12 18.283c.94 2.197 4.243 8.805 8.554 3.884 4.753-6.183 1.016-7.946-3.27-8.672 2.539.255 5.307-.621 6.092-3.248C23.622 9.418 24 4.458 24 3.768c0-.688-.139-1.86-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.747 13.087 8.686 12 10.8Z" />
      </svg>
    ),
  },
  {
    label: "Substack",
    href: "https://open.substack.com/pub/sterlingchin/",
    icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
]

export { socialLinks }

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={link.label}
        >
          <link.icon />
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Create hero section**

Create `components/hero.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { SocialIcons } from "@/components/social-links"

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col justify-center px-6"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            I build tools that make{" "}
            <span className="text-primary">APIs work for AI agents.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Sterling Chin — Senior Developer Advocate at Postman. AI Council
            Co-Chair. 24+ conference talks. Creator of the official Postman
            plugin for Claude Code.
          </p>
          <SocialIcons className="mt-8" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add hero to page.tsx**

Update `app/page.tsx` to import and render `<Hero />` inside the hero section.

- [ ] **Step 4: Verify hero renders**

```bash
npm run dev
```

Check: large statement text, amber highlight, social icons, bouncing scroll indicator.

- [ ] **Step 5: Commit hero**

```bash
git add -A
git commit -m "feat: add statement hero with social icons and scroll indicator"
```

---

## Chunk 3: About & Work Sections

### Task 6: Create about section

**Files:**
- Create: `components/about.tsx`
- Create: `components/section-header.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create reusable section header**

Create `components/section-header.tsx`:

```tsx
export function SectionHeader({
  label,
  subtitle,
}: {
  label: string
  subtitle?: string
}) {
  return (
    <div className="mb-8">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create about section**

Create `components/about.tsx`:

```tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const stats = [
  { value: "24+", label: "Conferences" },
  { value: "9", label: "Cities" },
  { value: "5K+", label: "LinkedIn" },
  { value: "1", label: "Plugin Shipped" },
]

export function About() {
  return (
    <section id="about" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="About" />

        <div className="flex items-start gap-5">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary">
            <Image
              src="/images/sterling-primary.jpg"
              alt="Sterling Chin"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-foreground leading-relaxed">
              I co-chair Postman&apos;s AI Council, where we turn proof-of-concepts
              into shipped products. I created Postman&apos;s first MCP server, built
              Claude Code skills for API development, and launched the official
              Postman plugin for Claude Code.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              I came into tech through a coding bootcamp. Before DevRel, I was an
              Engineering Manager at Postman leading the Labs team. Before that, I
              spent years shipping software across startups and enterprise.
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 grid grid-cols-2 border-t border-border md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-border px-4 py-5 text-center md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Add about to page.tsx**

- [ ] **Step 4: Verify about renders**

- [ ] **Step 5: Commit about**

```bash
git add -A
git commit -m "feat: add about section with bio and stats bar"
```

### Task 7: Create work section

**Files:**
- Create: `components/work.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create work section**

Create `components/work.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const supportingProjects = [
  {
    title: "AI Council Co-Chair",
    description: "Industry analysis, POCs, shipped products.",
  },
  {
    title: "Clara",
    description: "AI agent that grades APIs on agent-readiness.",
  },
  {
    title: "Postman Cursor Rules",
    description: "Open-source rules for API-first development.",
  },
]

export function Work() {
  return (
    <section id="work" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Work" />

        {/* Featured project */}
        <div className="relative rounded-xl border border-primary bg-card p-6">
          <span className="absolute -top-2 right-4 rounded bg-primary px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            Featured
          </span>
          <h3 className="text-xl font-bold text-foreground">
            Postman Plugin for Claude Code
          </h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Designed and shipped the official Postman plugin for Claude Code. AI
            agents can create, manage, test, and document APIs through
            conversation. Built on Postman&apos;s first MCP server, Claude Code
            skills, and the Learning Center&apos;s documentation layer.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["MCP", "Claude Code", "TypeScript", "Plugin SDK"].map((tag) => (
              <span
                key={tag}
                className="rounded bg-accent px-3 py-1 text-xs font-medium text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Supporting projects */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {supportingProjects.map((project) => (
            <div
              key={project.title}
              className="rounded-lg border border-border bg-card p-4"
            >
              <h4 className="font-semibold text-foreground">{project.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add work to page.tsx**

- [ ] **Step 3: Verify work renders with featured card and amber border**

- [ ] **Step 4: Commit work**

```bash
git add -A
git commit -m "feat: add work section with featured project and supporting grid"
```

---

## Chunk 4: Speaking, Content & Footer

### Task 8: Create speaking section

**Files:**
- Create: `components/speaking.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create speaking section with masonry grid**

Create `components/speaking.tsx`:

```tsx
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"

const speakingPhotos = [
  { src: "/images/ms_build_24.jpg", caption: "Microsoft Build '24", tall: true },
  { src: "/images/shift_24.jpg", caption: "Shift '24", tall: false },
  { src: "/images/api_world_24.jpg", caption: "API World '24", tall: false },
  { src: "/images/conexion24.jpg", caption: "Conexion '24", tall: false },
  { src: "/images/ai_big_data_panel_24.jpeg", caption: "AI & Big Data Expo '24", tall: false },
]

export function Speaking() {
  return (
    <section id="speaking" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Speaking" subtitle="24+ conferences worldwide" />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {speakingPhotos.map((photo, i) => (
            <div
              key={photo.caption}
              className={`group relative overflow-hidden rounded-lg ${
                photo.tall ? "md:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative w-full ${photo.tall ? "h-full min-h-[300px] lg:min-h-full" : "h-48 lg:h-auto lg:aspect-[4/3]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <span className="text-sm font-semibold text-white">
                  {photo.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Add speaking to page.tsx**

- [ ] **Step 3: Verify masonry grid renders with photos and hover effect**

- [ ] **Step 4: Commit speaking**

```bash
git add -A
git commit -m "feat: add speaking section with masonry photo grid"
```

### Task 9: Create content section

**Files:**
- Create: `data/content.ts`
- Create: `components/content-section.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create content data file**

Create `data/content.ts`:

```tsx
export type ContentItem = {
  type: "Blog" | "Video" | "Repo" | "Media"
  title: string
  url: string
  date: string
}

export const contentItems: ContentItem[] = [
  {
    type: "Blog",
    title: "MCP Apps are Here, and Postman Already Supports Them",
    url: "https://postmandeveloperrelations.substack.com/p/mcp-apps-are-here-and-postman-already",
    date: "Feb 2026",
  },
  {
    type: "Video",
    title: "How to Use Postman's MCP Server in Cursor",
    url: "https://youtu.be/cKUXopUlGPg",
    date: "Feb 2026",
  },
  {
    type: "Repo",
    title: "postman-cursor-rules",
    url: "https://github.com/Postman-Devrel/postman-cursor-rules",
    date: "Feb 2026",
  },
  {
    type: "Blog",
    title: "How to Use Postman's MCP Server in Cursor",
    url: "https://sterlingatpostman.substack.com/p/how-to-use-postmans-mcp-server-in",
    date: "Jan 2026",
  },
  {
    type: "Media",
    title: "Agent-Ready APIs: The Foundation of Scalable Agentic AI",
    url: "https://opendatascience.com/agent-ready-apis-the-foundation-of-scalable-agentic-ai/",
    date: "Jan 2026",
  },
]
```

- [ ] **Step 2: Create content section component**

Create `components/content-section.tsx`:

```tsx
"use client"

import { Pencil, Play, Code, Newspaper } from "lucide-react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/section-header"
import { contentItems, type ContentItem } from "@/data/content"

const typeIcons: Record<ContentItem["type"], React.ElementType> = {
  Blog: Pencil,
  Video: Play,
  Repo: Code,
  Media: Newspaper,
}

export function ContentSection() {
  return (
    <section id="content" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeader label="Content" />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentItems.map((item) => {
            const Icon = typeIcons[item.type]
            return (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary"
              >
                <div className="flex h-20 items-center justify-center bg-muted">
                  <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                    {item.type}
                  </span>
                  <h4 className="mt-1 font-semibold text-foreground text-sm leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.date}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Add content section to page.tsx**

- [ ] **Step 4: Verify content cards render with correct links**

- [ ] **Step 5: Commit content section**

```bash
git add -A
git commit -m "feat: add content section with card grid and data file"
```

### Task 10: Create CTA footer

**Files:**
- Create: `components/footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create footer**

Create `components/footer.tsx`:

```tsx
"use client"

import { motion } from "framer-motion"
import { socialLinks } from "@/components/social-links"

export function Footer() {
  return (
    <footer id="footer" className="px-6 py-24">
      <motion.div
        className="mx-auto max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground">
          Let&apos;s connect.
        </h2>
        <p className="mt-2 text-muted-foreground">
          Find me on these platforms or reach out directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted-foreground">
          &copy; Sterling Chin {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  )
}
```

- [ ] **Step 2: Add footer to page.tsx**

- [ ] **Step 3: Verify footer renders**

- [ ] **Step 4: Commit footer**

```bash
git add -A
git commit -m "feat: add CTA footer with social links"
```

---

## Chunk 5: Final Assembly & Polish

### Task 11: Assemble final page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write final page.tsx with all sections**

```tsx
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Work } from "@/components/work"
import { Speaking } from "@/components/speaking"
import { ContentSection } from "@/components/content-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-14">
        <Hero />
        <About />
        <Work />
        <Speaking />
        <ContentSection />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify full page scrolls through all sections correctly**

- [ ] **Step 3: Test dark/light mode toggle on all sections**

- [ ] **Step 4: Test responsive at 375px, 768px, and 1024px**

- [ ] **Step 5: Commit final assembly**

```bash
git add -A
git commit -m "feat: assemble all sections into final single-page site"
```

### Task 12: Build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: No errors, no warnings.

- [ ] **Step 2: Test production build locally**

```bash
npm start
```

Verify all sections, images, links, theme toggle work in production mode.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: verify production build"
```
