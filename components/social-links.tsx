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
