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
