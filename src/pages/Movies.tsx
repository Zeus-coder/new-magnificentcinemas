import { useMemo, useState } from 'react'

import ComingSoonCard from '../components/ComingSoonCard'
import MovieCard from '../components/MovieCard'
import PageHeader from '../components/PageHeader'
import { comingSoon } from '../data/comingSoon'
import { categories, movies, type Category } from '../data/movies'
import { useReveal } from '../hooks/useReveal'

type Filter = Category | 'All'

export default function Movies() {
  const [filter, setFilter] = useState<Filter>('All')
  const revealRef = useReveal<HTMLDivElement>(50)

  const filters: Filter[] = useMemo(() => ['All', ...categories], [])

  const visible = useMemo(
    () => (filter === 'All' ? movies : movies.filter((movie) => movie.category === filter)),
    [filter],
  )

  const countFor = (value: Filter) =>
    value === 'All' ? movies.length : movies.filter((movie) => movie.category === value).length

  return (
    <div ref={revealRef}>
      <PageHeader
        eyebrow="Now showing"
        title="Every film on our screens"
        lead={`${movies.length} titles in rotation, with showtimes from 10:00AM to 9:00PM daily. Filter by category to narrow the list.`}
      />

      <section className="shell">
        <div
          role="group"
          aria-label="Filter films by category"
          className="flex flex-wrap items-center gap-2.5 border-b border-line pb-8"
        >
          {filters.map((value) => {
            const isActive = filter === value
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={isActive}
                className={[
                  'group inline-flex items-baseline gap-2 border px-4 py-2 text-sm transition-all duration-200 ease-out-soft active:translate-y-px',
                  isActive
                    ? 'border-gold bg-gold text-[#120d04]'
                    : 'border-line-control text-ink-muted hover:border-gold hover:text-ink',
                ].join(' ')}
                style={{ borderRadius: 'var(--radius-tight)' }}
              >
                {value}
                <span
                  className={[
                    'tabular text-[11px]',
                    isActive ? 'text-[#120d04]/65' : 'text-ink-dim',
                  ].join(' ')}
                >
                  {countFor(value)}
                </span>
              </button>
            )
          })}
        </div>

        {visible.length > 0 ? (
          <div
            key={filter}
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {visible.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="mt-14 border border-dashed border-line-bright px-8 py-20 text-center">
            <h2 className="font-display text-2xl">Nothing in {filter} this week</h2>
            <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-ink-muted">
              Our line-up changes every Friday. Try another category, or call the Help Center to
              ask what is coming.
            </p>
            <button
              type="button"
              onClick={() => setFilter('All')}
              className="mt-7 border border-line-control px-5 py-2.5 text-sm transition-colors duration-200 hover:border-gold hover:text-gold"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              Show all films
            </button>
          </div>
        )}
      </section>

      <section className="pt-28 md:pt-36">
        <div className="shell border-b border-line pb-6">
          <p className="eyebrow text-gold">Coming soon</p>
          <h2
            className="mt-4 font-display font-black leading-[0.9] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Not yet on our screens
          </h2>
        </div>

        <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <div className="shell flex gap-6">
            {comingSoon.map((film, index) => (
              <ComingSoonCard key={film.id} film={film} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
