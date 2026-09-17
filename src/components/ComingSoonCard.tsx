import type { UpcomingFilm } from '../data/comingSoon'

interface ComingSoonCardProps {
  film: UpcomingFilm
  /** Ordinal shown alongside the title — gives the strip an editorial index. */
  index: number
}

export default function ComingSoonCard({ film, index }: ComingSoonCardProps) {
  return (
    <article className="group w-[clamp(11rem,38vw,15rem)] shrink-0">
      <div
        className="relative overflow-hidden bg-raised"
        style={{ borderRadius: 'var(--radius-poster)' }}
      >
        <img
          src={film.poster}
          alt={`Poster for ${film.title}`}
          loading="lazy"
          decoding="async"
          className="aspect-[2/3] w-full object-cover opacity-80 grayscale-[0.35] transition-all duration-700 ease-out-soft group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgb(9 7 5 / 0.6), transparent 55%)' }}
        />
      </div>

      <div className="mt-3 flex items-baseline gap-2.5">
        <span className="tabular text-[11px] text-gold-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="font-display text-base leading-tight tracking-tight">{film.title}</h3>
          <p className="eyebrow mt-1">Coming soon</p>
        </div>
      </div>
    </article>
  )
}
