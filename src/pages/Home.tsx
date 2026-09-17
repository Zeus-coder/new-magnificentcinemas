import { Link } from 'react-router-dom'

import ComingSoonCard from '../components/ComingSoonCard'
import Marquee from '../components/Marquee'
import MovieCard from '../components/MovieCard'
import PosterWall from '../components/PosterWall'
import { comingSoon } from '../data/comingSoon'
import { movies } from '../data/movies'
import { formatNaira, site, ticketTiers } from '../data/site'
import { useReveal } from '../hooks/useReveal'

const TRAILERS = [
  { id: 'DlBYE7SqoiM', title: 'Spider-Man: Brand New Day trailer' },
  { id: 'd_-awFdQ3oQ', title: 'Now showing at Magnificent Cinemas' },
]

export default function Home() {
  const revealRef = useReveal<HTMLDivElement>(60)

  const screeningCount = movies.reduce((total, movie) => total + movie.showtimes.length, 0)
  const cheapest = Math.min(...ticketTiers.flatMap((tier) => tier.options.map((o) => o.price)))

  const [featured, ...rest] = movies

  return (
    <div ref={revealRef}>
      {/* ---------------------------------------------------------------
          Hero — full-bleed banner with the copy on a left rail and the
          stats pinned to the floor of the frame.
          --------------------------------------------------------------- */}
      <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
        <PosterWall />

        <div className="shell relative w-full pb-28 pt-32 md:pb-32 md:pt-36">
          <p className="eyebrow text-gold">Onipanu, Somolu · Lagos</p>

          <h1
            className="mt-6 max-w-[13ch] font-display font-black"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.75rem)',
              lineHeight: 0.86,
              letterSpacing: '-0.042em',
            }}
          >
            Nollywood,
            <br />
            <span className="text-gold">on the</span> big screen.
          </h1>

          <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-ink-muted md:text-lg">
            {movies.length} films showing today — Igbo and Yoruba epics, family drama, and the
            Hollywood releases — from the first 10:00AM screening to the last at 9:00PM. Tickets
            from <span className="text-ink">{formatNaira(cheapest)}</span>, popcorn and a drink
            included.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#showtimes"
              className="bg-gold px-7 py-3.5 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              See today’s showtimes
            </a>
            <Link
              to="/prices"
              className="text-sm text-ink-muted underline decoration-line-bright underline-offset-[6px] transition-colors duration-200 hover:text-ink hover:decoration-gold"
            >
              Ticket prices
            </Link>
          </div>
        </div>

        {/* Stats bar along the bottom edge of the hero */}
        <div className="relative border-t border-line/80 bg-screen/70 backdrop-blur-sm">
          <dl className="shell grid grid-cols-3 divide-x divide-line/80">
            {[
              { label: 'Screenings daily', value: screeningCount },
              { label: 'Now showing', value: movies.length },
              { label: 'Coming soon', value: comingSoon.length },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={index === 0 ? 'py-4 pr-3 md:py-5 md:pr-6' : 'px-3 py-4 md:px-6 md:py-5'}
              >
                <dt className="eyebrow text-[10px] md:text-[11px]">{stat.label}</dt>
                <dd className="tabular mt-1.5 text-xl text-ink md:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquee items={movies.slice(0, 8).map((movie) => movie.title)} />

      {/* ---------------------------------------------------------------
          Featured film — breaks the grid before the grid starts.
          --------------------------------------------------------------- */}
      <section id="showtimes" className="scroll-mt-20 pt-20 md:pt-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
            <div>
              <p className="eyebrow text-gold">Now showing</p>
              <h2
                className="mt-4 font-display font-black leading-[0.9] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
              >
                Playing this week
              </h2>
            </div>
            <Link
              to="/movies"
              className="group inline-flex items-center gap-2 pb-1 text-sm text-ink-muted transition-colors duration-200 hover:text-gold"
            >
              Full listing with filters
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <article className="reveal group mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
            {/* Capped on phones so a 2:3 poster does not run to ~600px tall */}
            <div
              className="relative w-full max-w-[16rem] overflow-hidden bg-raised sm:max-w-[20rem] md:col-span-5 md:max-w-none lg:col-span-4"
              style={{ borderRadius: 'var(--radius-panel)', boxShadow: 'var(--shadow-lift)' }}
            >
              <img
                src={featured.poster}
                alt={`Poster for ${featured.title}`}
                fetchPriority="high"
                className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
              />
            </div>

            <div className="md:col-span-7 md:self-center lg:col-span-7">
              <div className="flex items-center gap-3">
                <span
                  className="bg-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#120d04]"
                  style={{ borderRadius: 'var(--radius-tight)' }}
                >
                  Featured
                </span>
                <span className="eyebrow">{featured.category}</span>
              </div>

              <h3
                className="mt-5 max-w-[16ch] font-display font-black leading-[0.9] tracking-[-0.035em]"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
              >
                {featured.title}
              </h3>

              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink-muted">
                {featured.synopsis}
              </p>

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
                <div>
                  <dt className="eyebrow">Running time</dt>
                  <dd className="tabular mt-1.5 text-ink">{featured.lengthMinutes} min</dd>
                </div>
                <div>
                  <dt className="eyebrow">Rating</dt>
                  <dd className="tabular mt-1.5 text-ink">{featured.rating.toFixed(1)} / 5</dd>
                </div>
                <div>
                  <dt className="eyebrow">Showing today</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-1.5">
                    {featured.showtimes.map((time) => (
                      <span
                        key={time}
                        className="tabular border border-line-bright px-2 py-1 text-xs text-ink"
                        style={{ borderRadius: 'var(--radius-tight)' }}
                      >
                        {time}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </article>

          <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {rest.slice(0, 9).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section className="bloom pt-20 md:pt-24">
        <div className="shell">
          <div className="border-b border-line pb-6">
            <p className="eyebrow text-gold">On screen</p>
            <h2
              className="mt-4 max-w-[16ch] font-display font-black leading-[0.9] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              Watch before you book
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-12">
            {TRAILERS.map((trailer, index) => (
              <div
                key={trailer.id}
                className={[
                  'reveal overflow-hidden border border-line bg-surface',
                  index === 0 ? 'md:col-span-7' : 'md:col-span-5 md:mt-14',
                ].join(' ')}
                style={{ borderRadius: 'var(--radius-panel)' }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.id}`}
                  title={trailer.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section className="pt-20 md:pt-24">
        <div className="shell flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="eyebrow text-gold">Coming soon</p>
            <h2
              className="mt-4 font-display font-black leading-[0.9] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
            >
              Next on the slate
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-relaxed text-ink-muted">
            Release dates are announced on our{' '}
            <a
              href={site.social[1].href}
              target="_blank"
              rel="noreferrer"
              className="text-gold underline decoration-gold-deep underline-offset-4 transition-colors hover:text-gold-bright"
            >
              Instagram
            </a>{' '}
            first.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <div className="shell flex gap-6">
            {comingSoon.map((film, index) => (
              <ComingSoonCard key={film.id} film={film} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      <section className="pt-20 md:pt-24">
        <div className="shell">
          <div
            className="reveal relative overflow-hidden border border-line bg-surface px-7 py-14 md:px-16 md:py-20"
            style={{ borderRadius: 'var(--radius-panel)' }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgb(217 164 65 / 0.18), transparent 68%)',
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="eyebrow text-gold">Hall rentals</p>
                <h2
                  className="mt-4 max-w-[18ch] font-display font-black leading-[0.92] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
                >
                  Your AGM, premiere or audition, on a real screen
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm leading-relaxed text-ink-muted">
                  We rent our halls for annual general meetings, social gatherings, birthday
                  parties, school events, workshops, auditions and business meetings.
                </p>
                <Link
                  to="/services"
                  className="mt-7 inline-flex items-center gap-2 border border-line-control px-6 py-3 text-sm text-ink transition-colors duration-200 hover:border-gold hover:text-gold"
                  style={{ borderRadius: 'var(--radius-tight)' }}
                >
                  What we offer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
