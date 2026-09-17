import { Link } from 'react-router-dom'

// images/magc.jpg (the "Movies" tile on the current joinus.html) 404s on the
// live site, so the exhibitions block borrows a real banner instead.
import moviesTile from '../assets/banners/hero-oak-street.jpg'
import gamesTile from '../assets/services/games.jpg'
import mealsTile from '../assets/services/meals.jpg'
import PageHeader from '../components/PageHeader'
import { services } from '../data/site'
import { useReveal } from '../hooks/useReveal'

const imagery: Record<string, { src: string; alt: string }> = {
  exhibitions: { src: moviesTile, alt: 'A film playing on the main screen' },
  concessions: { src: mealsTile, alt: 'Hot meals served at the concessions counter' },
  'hall-rentals': { src: gamesTile, alt: 'The games floor beside the cinema halls' },
}

export default function Services() {
  const revealRef = useReveal<HTMLDivElement>(80)

  return (
    <div ref={revealRef}>
      <PageHeader
        eyebrow="Services"
        title="More than a ticket"
        lead="We premiere the best of Nollywood, Hollywood, Bollywood and Yoruba cinema — and the building does a good deal more than screen films."
      />

      {/* Zig-zag rather than three equal columns. */}
      <section className="shell">
        {services.map((service, index) => {
          const art = imagery[service.id]
          const flipped = index % 2 === 1

          return (
            <article
              key={service.id}
              className="reveal grid gap-8 border-t border-line py-14 md:grid-cols-12 md:items-center md:gap-14 md:py-20"
            >
              <div
                className={[
                  'group relative overflow-hidden bg-raised md:col-span-5',
                  flipped ? 'md:order-2 md:col-start-8' : '',
                ].join(' ')}
                style={{ borderRadius: 'var(--radius-panel)' }}
              >
                <img
                  src={art.src}
                  alt={art.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.05]"
                />
              </div>

              <div className={['md:col-span-6', flipped ? 'md:order-1 md:col-start-1' : ''].join(' ')}>
                <p className="tabular text-xs text-gold-deep">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2
                  className="mt-3 max-w-[16ch] font-display font-black leading-[0.92] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
                >
                  {service.name}
                </h2>
                <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted">
                  {service.detail}
                </p>
              </div>
            </article>
          )
        })}
      </section>

      <section className="shell pt-20">
        <div
          className="border border-line bg-surface px-7 py-12 md:px-14 md:py-16"
          style={{ borderRadius: 'var(--radius-panel)' }}
        >
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h2
                className="max-w-[20ch] font-display font-black leading-[0.92] tracking-[-0.03em]"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
              >
                Planning an event? Ask us about the halls.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="text-sm leading-relaxed text-ink-muted">
                Tell us the date and the number of guests and we will come back with
                availability and a rate.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex bg-gold px-6 py-3 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px"
                style={{ borderRadius: 'var(--radius-tight)' }}
              >
                Contact the cinema
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
