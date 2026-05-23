"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "MARVIN", href: "/marvin" },
  { label: "Clara", href: "/clara" },
  { label: "Speaking", href: "#speaking" },
  { label: "Content", href: "#content" },
]

export function Nav() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const isHome = pathname === "/"

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
    if (href.startsWith("/")) {
      window.location.href = href
      return
    }

    if (!isHome) {
      window.location.href = `/${href}`
      return
    }

    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  const getHref = (href: string) => {
    if (href.startsWith("#") && !isHome) {
      return `/${href}`
    }

    return href
  }

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === href
    }

    return isHome && activeSection === href.slice(1)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href={isHome ? "#hero" : "/"}
          onClick={(e) => {
            e.preventDefault()
            handleClick(isHome ? "#hero" : "/")
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
              href={getHref(item.href)}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href)
              }}
              className={`text-sm transition-colors hover:text-primary ${
                isActive(item.href)
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
                    href={getHref(item.href)}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(item.href)
                    }}
                    className={`text-lg transition-colors hover:text-primary ${
                      isActive(item.href)
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
