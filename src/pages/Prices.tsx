import { Link } from 'react-router-dom'

import PageHeader from '../components/PageHeader'
import { formatNaira, site, ticketTiers } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Prices() {
  const revealRef = useReveal<HTMLDivElement>(90)

  return (
    <div ref={revealRef}>
      <PageHeader
        eyebrow="Ticket prices"
        title="What a seat costs"
        lead="Every ticket includes popcorn and a drink. Prices are the same for Nollywood and Hollywood blockbusters, all week."
      />

      <section className="shell">
        {/* Two tiers, laid out as rows rather than a three-tower pricing table.
            Shared elements stay on the same baseline across both rows. */}
        <div className="border-t border-line">
          {ticketTiers.map((tier) => (
            <article
              key={tier.id}
              className="reveal group grid gap-6 border-b border-line py-12 md:grid-cols-12 md:items-start md:py-16"
            >
              <div className="md:col-span-4">
                <h2
                  className="font-display font-black leading-[0.9] tracking-[-0.03em] transition-colors duration-300 group-hover:text-gold"
                  style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}
                >
                  {tier.audience}
                </h2>
                <p className="eyebrow mt-3">{tier.note}</p>
              </div>

              <ul className="md:col-span-8 md:pt-2">
                {tier.options.map((option, index) => (
                  <li
                    key={option.price}
                    className={[
                      'flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-4',
                      index > 0 ? 'border-t border-line/70' : '',
                    ].join(' ')}
                  >
                    <span className="text-base text-ink-muted">{option.includes}</span>
                    <span className="tabular text-2xl text-ink md:text-3xl">
                      {formatNaira(option.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-display text-2xl tracking-tight">Booking a seat</h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-ink-muted">
              Tickets are sold at the box office on the 2nd floor of Moyosore House. To reserve
              seats for a group, or to ask about a private screening, call the Help Center on{' '}
              <a
                href={`tel:${site.phones[1].replace(/\s/g, '')}`}
                className="tabular text-gold underline decoration-gold-deep underline-offset-4 transition-colors hover:text-gold-bright"
              >
                {site.phones[1]}
              </a>
              .
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 border border-line-bright px-6 py-3 text-sm transition-colors duration-200 hover:border-gold hover:text-gold"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              Get in touch
            </Link>
          </div>

          <aside
            className="reveal md:col-span-5"
            style={{ borderRadius: 'var(--radius-panel)' }}
          >
            <div
              className="h-full border border-line bg-surface p-8"
              style={{ borderRadius: 'var(--radius-panel)' }}
            >
              <h2 className="eyebrow text-gold">Good to know</h2>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
                <li>Children’s tickets cover all screenings, not just matinees.</li>
                <li>
                  The first screening of the day starts at 10:00AM; the last begins at 9:00PM.
                </li>
                <li>Hall rentals are priced separately — call for a quote.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
