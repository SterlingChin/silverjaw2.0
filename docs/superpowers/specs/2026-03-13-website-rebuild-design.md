# sterlingchin.com Rebuild — Design Spec

**Date:** 2026-03-13
**Status:** Approved
**Author:** Sterling Chin + MARVIN

## Overview

Rebuild sterlingchin.com from an HTML5 UP template into a modern single-page scroll site using Next.js, Tailwind CSS, shadcn/ui, and 21st.dev components. The site serves as a professional presence: "here's who I am and what I do."

**Tone:** Technical but approachable.

## Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js (App Router) | Single-page, scroll-based |
| Styling | Tailwind CSS v4 | Utility-first |
| Components | shadcn/ui | Pre-built, accessible, themeable |
| Component library | 21st.dev Magic MCP | Source polished interactive components |
| Dark/light mode | next-themes | System preference + manual toggle |
| Deployment | Vercel | Already set up via CLI |
| Fonts | Inter (sans), JetBrains Mono (mono), Source Serif 4 (serif) | Via Google Fonts or next/font |

## Theme

Full shadcn/ui token system with amber (`#f59e0b`) as the primary accent color. Both light and dark mode defined. Dark mode is the default.

### Dark Mode (default)
| Token | Value |
|-------|-------|
| background | `#171717` |
| card | `#262626` |
| border | `#404040` |
| primary | `#f59e0b` |
| foreground | `#e5e5e5` |
| muted-foreground | `#a3a3a3` |
| accent | `#92400e` |
| accent-foreground | `#fde68a` |

### Light Mode
| Token | Value |
|-------|-------|
| background | `#ffffff` |
| card | `#ffffff` |
| border | `#e5e7eb` |
| primary | `#f59e0b` |
| foreground | `#262626` |
| muted-foreground | `#6b7280` |
| accent | `#fffbeb` |
| accent-foreground | `#92400e` |

### Full CSS Custom Properties

Paste the following into `globals.css`:

```css
:root {
  --card: #ffffff;
  --ring: #f59e0b;
  --input: #e5e7eb;
  --muted: #f9fafb;
  --accent: #fffbeb;
  --border: #e5e7eb;
  --radius: 0.375rem;
  --chart-1: #f59e0b;
  --chart-2: #d97706;
  --chart-3: #b45309;
  --chart-4: #92400e;
  --chart-5: #78350f;
  --popover: #ffffff;
  --primary: #f59e0b;
  --sidebar: #f9fafb;
  --spacing: 0.25rem;
  --font-mono: JetBrains Mono, monospace;
  --font-sans: Inter, sans-serif;
  --secondary: #f3f4f6;
  --background: #ffffff;
  --font-serif: Source Serif 4, serif;
  --foreground: #262626;
  --destructive: #ef4444;
  --shadow-blur: 8px;
  --shadow-color: hsl(0 0% 0%);
  --sidebar-ring: #f59e0b;
  --shadow-spread: -1px;
  --letter-spacing: 0em;
  --shadow-opacity: 0.1;
  --sidebar-accent: #fffbeb;
  --sidebar-border: #e5e7eb;
  --card-foreground: #262626;
  --shadow-offset-x: 0px;
  --shadow-offset-y: 4px;
  --sidebar-primary: #f59e0b;
  --muted-foreground: #6b7280;
  --accent-foreground: #92400e;
  --popover-foreground: #262626;
  --primary-foreground: #000000;
  --sidebar-foreground: #262626;
  --secondary-foreground: #4b5563;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #92400e;
  --sidebar-primary-foreground: #ffffff;
}

.dark {
  --card: #262626;
  --ring: #f59e0b;
  --input: #404040;
  --muted: #262626;
  --accent: #92400e;
  --border: #404040;
  --chart-1: #fbbf24;
  --chart-2: #d97706;
  --chart-3: #92400e;
  --chart-4: #b45309;
  --chart-5: #92400e;
  --popover: #262626;
  --primary: #f59e0b;
  --sidebar: #0f0f0f;
  --secondary: #262626;
  --background: #171717;
  --foreground: #e5e5e5;
  --destructive: #ef4444;
  --sidebar-ring: #f59e0b;
  --sidebar-accent: #92400e;
  --sidebar-border: #404040;
  --card-foreground: #e5e5e5;
  --sidebar-primary: #f59e0b;
  --muted-foreground: #a3a3a3;
  --accent-foreground: #fde68a;
  --popover-foreground: #e5e5e5;
  --primary-foreground: #000000;
  --sidebar-foreground: #e5e5e5;
  --secondary-foreground: #e5e5e5;
  --destructive-foreground: #ffffff;
  --sidebar-accent-foreground: #fde68a;
  --sidebar-primary-foreground: #ffffff;
}

@theme inline {
  /* Colors */
  --color-card: var(--card);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-popover: var(--popover);
  --color-primary: var(--primary);
  --color-sidebar: var(--sidebar);
  --color-secondary: var(--secondary);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-destructive: var(--destructive);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-border: var(--sidebar-border);
  --color-card-foreground: var(--card-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary-foreground: var(--primary-foreground);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);

  /* Non-color tokens */
  --radius: var(--radius);
  --spacing: var(--spacing);
  --font-mono: var(--font-mono);
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --letter-spacing: var(--letter-spacing);
  --shadow-blur: var(--shadow-blur);
  --shadow-color: var(--shadow-color);
  --shadow-spread: var(--shadow-spread);
  --shadow-opacity: var(--shadow-opacity);
  --shadow-offset-x: var(--shadow-offset-x);
  --shadow-offset-y: var(--shadow-offset-y);
}
```

## Layout

Single-page scroll with 6 sections and a sticky navigation bar. Max content width: `max-w-5xl` (1024px) centered. Sections separated by generous vertical padding (`py-24` or similar).

### Navigation (sticky)
- Sticky top bar with blur backdrop (`backdrop-blur-sm`)
- Left: "SC" in amber, bold
- Right: Section links (About, Work, Speaking, Content) + dark/light mode toggle icon
- Smooth scroll to section anchors on click
- Active section highlighted in nav as user scrolls (Intersection Observer)
- Section anchor IDs: `hero`, `about`, `work`, `speaking`, `content`, `footer`

## Sections

### 1. Hero

**Layout:** Statement style. No photo. Full viewport height or near it.

**Content:**
- Large heading with amber highlight: "I build tools that make **APIs work for AI agents.**" (the highlighted portion in `primary` color)
- Subtext paragraph: "Sterling Chin — Senior Developer Advocate at Postman. AI Council Co-Chair. 24+ conference talks. Creator of the official Postman plugin for Claude Code."
- Row of circular social icon links (LinkedIn, X/Twitter, GitHub, Bluesky, Substack). All social links use `target="_blank" rel="noopener noreferrer"` (applies globally to Hero and Footer).
- Subtle scroll indicator at bottom (chevron or arrow)

**Typography:** Heading at `text-5xl` or `text-6xl`, `font-bold`. Subtext at `text-lg`, `text-muted-foreground`.

### 2. About

**Layout:** Bio + Stats Bar.

**Content:**
- Section label: "ABOUT" in amber, uppercase, tracked
- Row with circular profile photo (bordered in amber, ~80px) alongside bio paragraph
- Bio text: "I co-chair Postman's AI Council, where we turn proof-of-concepts into shipped products. I created Postman's first MCP server, built Claude Code skills for API development, and launched the official Postman plugin for Claude Code."
- Secondary paragraph (muted): coding bootcamp origin, engineering manager to DevRel path
- Stats bar at the bottom, 4 columns with top border divider:
  - "24+" / Conferences
  - "9" / Cities
  - "5K+" / LinkedIn
  - "1" / Plugin Shipped
- Stats numbers in amber, `text-2xl font-bold`. Labels in `text-sm text-muted-foreground`.

**Photo source:** `images/sterling-primary.jpg` from the existing site.

### 3. Work

**Layout:** Featured project + supporting card grid.

**Featured card (Plugin):**
- Larger card with amber border (`border-primary`)
- "Featured" badge: amber background, black text, absolute positioned top-right of the card (`absolute -top-2 right-4`). Card container is `relative`.
- Title: "Postman Plugin for Claude Code"
- Description: "Designed and shipped the official Postman plugin for Claude Code. AI agents can create, manage, test, and document APIs through conversation. Built on Postman's first MCP server, Claude Code skills, and the Learning Center's documentation layer."
- Tech tags: MCP, Claude Code, TypeScript, Plugin SDK (amber accent background with amber text)

**Supporting cards (3-column grid below):**

| Card | Title | Description |
|------|-------|-------------|
| AI Council | AI Council Co-Chair | Industry analysis, POCs, shipped products. |
| Clara | Clara | AI agent that grades APIs on agent-readiness. |
| Cursor Rules | Postman Cursor Rules | Open-source rules for API-first development. |

Each supporting card: `bg-card`, `border`, `rounded-lg`, `p-4`. Title in `font-semibold`, description in `text-sm text-muted-foreground`. No tech tags on supporting cards. Clara and Cursor Rules are display-only (no outbound links). AI Council is display-only.

### 4. Speaking

**Layout:** Masonry photo grid with overlay captions.

**Grid structure:** CSS Grid, 3 columns (`grid-cols-3`). First image spans 2 rows (`row-span-2`) for emphasis. On tablet (2 columns), hero image still spans 2 rows. On mobile (1 column), all images are single row, equal height.

| Position | Image | Caption |
|----------|-------|---------|
| Col 1, Row 1-2 (tall) | `ms_build_24.jpg` | Microsoft Build '24 |
| Col 2, Row 1 | `shift_24.jpg` | Shift '24 |
| Col 3, Row 1 | `api_world_24.jpg` | API World '24 |
| Col 2, Row 2 | `conexion24.jpg` | Conexion '24 |
| Col 3, Row 2 | `ai_big_data_panel_24.jpeg` | AI & Big Data Expo '24 |

**Photo treatment:**
- `rounded-lg`, `overflow-hidden`
- Gradient overlay at bottom: `bg-gradient-to-t from-black/80 to-transparent`
- Event name in white, `text-sm font-semibold`, positioned over the gradient
- Subtle scale on hover (`hover:scale-105 transition-transform`)

**Header:** "SPEAKING" label in amber + "24+ conferences worldwide" subtext.

### 5. Content

**Layout:** Card grid, 3 columns.

Each card:
- Icon/thumbnail area at top (icon representing type: pencil for blog, play for video, code brackets for repo)
- Type label in amber uppercase
- Title in `font-semibold`
- Date in `text-sm text-muted-foreground`
- Entire card is a link (wraps in `<a>`)
- Hover: border shifts to amber or subtle lift

**Initial content to populate:**

| Type | Title | URL | Date |
|------|-------|-----|------|
| Blog | MCP Apps are Here, and Postman Already Supports Them | https://postmandeveloperrelations.substack.com/p/mcp-apps-are-here-and-postman-already | Feb 2026 |
| Video | How to Use Postman's MCP Server in Cursor | https://youtu.be/cKUXopUlGPg | Feb 2026 |
| Repo | postman-cursor-rules | https://github.com/Postman-Devrel/postman-cursor-rules | Feb 2026 |
| Blog | How to Use Postman's MCP Server in Cursor | https://sterlingatpostman.substack.com/p/how-to-use-postmans-mcp-server-in | Jan 2026 |
| Media | Agent-Ready APIs: The Foundation of Scalable Agentic AI | https://opendatascience.com/agent-ready-apis-the-foundation-of-scalable-agentic-ai/ | Jan 2026 |

Cards should be easy to add to (data-driven array or simple content list).

### 6. Footer (CTA)

**Layout:** Centered CTA with button-style social links.

**Content:**
- Heading: "Let's connect." in `text-2xl font-bold`
- Subtext: "Find me on these platforms or reach out directly." in `text-muted-foreground`
- Row of button-style links with border: LinkedIn, Twitter/X, GitHub, Bluesky, Substack
- Buttons: `border rounded-md px-4 py-2 text-sm` with hover highlight
- Copyright line below: "© Sterling Chin 2026" in `text-xs text-muted-foreground`

## Existing Assets to Migrate

From `silverjaw2.0/images/`:

| File | Usage |
|------|-------|
| `sterling-primary.jpg` | About section profile photo |
| `ms_build_24.jpg` | Speaking grid (hero position) |
| `shift_24.jpg` | Speaking grid |
| `api_world_24.jpg` | Speaking grid |
| `conexion24.jpg` | Speaking grid |
| `ai_big_data_panel_24.jpeg` | Speaking grid |
| `snowboarding-solid.ico` | Favicon |

PowerPoint files (`*.pptx`) are no longer needed (no download links in the new design).

## Social Links

| Platform | URL |
|----------|-----|
| LinkedIn | https://www.linkedin.com/in/sterlingchin/ |
| Twitter/X | https://twitter.com/SilverJaw82 |
| Bluesky | https://bsky.app/profile/sterlingchin.bsky.social |
| Substack | https://open.substack.com/pub/sterlingchin/ |
| GitHub | https://github.com/SterlingChin |


TikTok (`https://www.tiktok.com/@sterlingtalkstech`) is excluded from the new site. The 5 platforms above are the definitive social link set used in Hero and Footer.

## Responsive Behavior

- **Desktop (>1024px):** Full layouts as described above
- **Tablet (768-1024px):** Speaking masonry collapses to 2 columns. Content cards to 2 columns. Work supporting cards to 2 columns. Stats bar remains 4 columns.
- **Mobile (<768px):** Single column everything. Nav collapses to hamburger menu (shadcn `Sheet` component: slide-in from right, closes on link click, X button, or overlay tap). Hero heading scales down to `text-3xl`. Stats bar stacks to 2x2 grid. Work supporting cards stack to single column. Speaking images stack vertically (hero image no longer spans 2 rows).

## Interactions & Animation

Keep it subtle. No flashy animations.

- **Scroll reveal:** Sections fade in on scroll using `framer-motion` `whileInView` (install `framer-motion` as dependency)
- **Nav active state:** Highlight current section in nav based on scroll position
- **Speaking photos:** Scale on hover (`hover:scale-105`)
- **Content cards:** Border color shift on hover
- **Dark/light toggle:** Smooth transition on theme change
- **Smooth scroll:** `scroll-behavior: smooth` or programmatic smooth scroll on nav clicks

## Out of Scope

- Blog/CMS integration (content is hardcoded or from a simple data array)
- Contact form
- Shop/Etsy section (removed)
- Downloadable slide decks (removed)
- MARVIN mentions (deferred)
- Analytics (can add later)
- SEO meta tags beyond basics (can add later)

## Project Structure

Build inside the existing `silverjaw2.0/` repo. The old HTML template files will be replaced but preserved in git history.

```
silverjaw2.0/
├── app/
│   ├── layout.tsx     # Root layout, fonts, theme provider
│   ├── page.tsx       # Single page, imports all sections
│   └── globals.css    # Theme CSS custom properties
├── components/
│   ├── nav.tsx        # Sticky nav with scroll spy
│   ├── hero.tsx       # Statement hero
│   ├── about.tsx      # Bio + stats bar
│   ├── work.tsx       # Featured + grid
│   ├── speaking.tsx   # Masonry photo grid
│   ├── content.tsx    # Card grid
│   ├── footer.tsx     # CTA footer
│   ├── theme-toggle.tsx  # Dark/light mode switch
│   └── ui/            # shadcn/ui components
├── data/
│   └── content.ts     # Content items array (blogs, videos, repos)
├── public/
│   ├── images/        # Migrated photos
│   └── favicon.ico
├── lib/
│   └── utils.ts       # shadcn cn() helper
└── next.config.ts
```

## Definition of Done

- [ ] All 6 sections render correctly in dark and light mode
- [ ] Sticky nav with scroll spy works
- [ ] Theme toggle switches between dark and light
- [ ] All 5 speaking photos display in masonry grid
- [ ] All content items link to correct URLs
- [ ] All social links open in new tabs
- [ ] Responsive down to 375px (iPhone SE)
- [ ] Deployed to Vercel
- [ ] Old HTML5 UP template preserved in git history (don't delete, just replace)
