interface MarqueeProps {
  items: string[]
}

/**
 * Continuous ticker of film titles, in the spirit of a cinema marquee.
 * The list is rendered twice so the -50% keyframe loops seamlessly.
 */
export default function Marquee({ items }: MarqueeProps) {
  const run = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface py-4"
      aria-hidden
    >
      <div className="marquee-track flex w-max items-center gap-10 pr-10">
        {run.map((item, index) => (
          <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg tracking-tight text-ink-muted">{item}</span>
            <span className="text-gold">◆</span>
          </div>
        ))}
      </div>

      {/* Fade the strip into the page at both ends */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }}
      />
    </div>
  )
}
