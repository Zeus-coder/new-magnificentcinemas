import { useEffect, useId, useRef, useState } from 'react'

import type { Movie } from '../data/movies'

interface MovieCardProps {
  movie: Movie
  /** Cards in a grid can be given a size so the grid breaks its own rhythm. */
  emphasis?: 'default' | 'wide'
}

export default function MovieCard({ movie, emphasis = 'default' }: MovieCardProps) {
  const wide = emphasis === 'wide'

  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)
  const synopsisRef = useRef<HTMLParagraphElement>(null)
  const synopsisId = useId()

  /**
   * Only offer the toggle when the synopsis is genuinely clipped — several are
   * short enough to fit in three lines. Measured while collapsed, and re-checked
   * on resize, since the clamp depends on the column width.
   */
  useEffect(() => {
    const el = synopsisRef.current
    if (!el) return

    const measure = () => {
      if (expanded) return
      setOverflowing(el.scrollHeight > el.clientHeight + 1)
    }

    measure()

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  return (
    <article
      className={[
        'reveal group relative flex flex-col',
        wide ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      <div
        className="relative overflow-hidden bg-raised"
        style={{ borderRadius: 'var(--radius-poster)', boxShadow: 'var(--shadow-poster)' }}
      >
        <img
          src={movie.poster}
          alt={`Poster for ${movie.title}`}
          loading="lazy"
          decoding="async"
          className={[
            'w-full object-cover transition-transform duration-700 ease-out-soft',
            'group-hover:scale-[1.06]',
            wide ? 'aspect-[3/4]' : 'aspect-[2/3]',
          ].join(' ')}
        />

        {/* Warm scrim so the showtimes stay legible over any poster art */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(to top, rgb(9 7 5 / 0.94) 0%, rgb(9 7 5 / 0.55) 42%, transparent 72%)',
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100">
          <p className="eyebrow text-gold">Showing today</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {movie.showtimes.map((time) => (
              <li
                key={time}
                className="tabular border border-line-bright/70 bg-screen/70 px-2 py-1 text-[11px] text-ink"
                style={{ borderRadius: 'var(--radius-tight)' }}
              >
                {time}
              </li>
            ))}
          </ul>
        </div>

        <span
          className="absolute left-3 top-3 bg-screen/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted backdrop-blur-sm"
          style={{ borderRadius: 'var(--radius-tight)' }}
        >
          {movie.category}
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="font-display text-xl leading-[1.08] tracking-tight transition-colors duration-300 group-hover:text-gold">
          {movie.title}
        </h3>

        <p className="tabular mt-2 text-xs text-ink-dim">
          {movie.lengthMinutes} min
          <span className="mx-1.5 text-line-bright">/</span>
          {movie.rating.toFixed(1)} out of 5
        </p>

        <p
          ref={synopsisRef}
          id={synopsisId}
          className={[
            'mt-3 text-sm leading-relaxed text-ink-muted',
            expanded ? '' : 'line-clamp-3',
          ].join(' ')}
        >
          {movie.synopsis}
        </p>

        {overflowing && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={synopsisId}
            className="mt-2 self-start text-xs text-ink-dim underline decoration-line-bright underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
          >
            {expanded ? 'Show less' : 'Read full synopsis'}
            <span className="sr-only"> for {movie.title}</span>
          </button>
        )}

        {/* Pinned to the bottom so CTAs line up across cards of unequal height */}
        <div className="mt-auto pt-4">
          {movie.trailerUrl ? (
            <a
              href={movie.trailerUrl.replace('/embed/', '/watch?v=')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gold transition-colors duration-200 hover:text-gold-bright"
            >
              Watch trailer
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          ) : (
            <span className="text-sm text-ink-dim">Trailer not yet available</span>
          )}
        </div>
      </div>
    </article>
  )
}
