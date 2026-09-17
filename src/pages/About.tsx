import { Link } from 'react-router-dom'

import PageHeader from '../components/PageHeader'
import { services, site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const revealRef = useReveal<HTMLDivElement>(80)

  return (
    <div ref={revealRef}>
      <PageHeader
        eyebrow="About us"
        title="A cinema built for its neighbourhood"
        lead={site.blurb}
      />

      <section className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="font-display text-3xl tracking-tight">Who we are</h2>
          <div className="mt-6 max-w-[62ch] space-y-5 text-base leading-relaxed text-ink-muted">
            <p>
              Magnificent Cinemas sits on the 2nd floor of Moyosore House at 180/184 Ikorodu
              Road, in Onipanu, Somolu. We are a subsidiary of {site.parentCompany}, and our
              screens have been part of this stretch of Ikorodu Road for years.
            </p>
            <p>
              The programme leans Nigerian. On any given week most of what we show is Nollywood
              and Yoruba cinema — epics, family dramas, romantic comedies — playing alongside the
              Hollywood releases audiences expect. That mix is deliberate: this is a
              neighbourhood cinema, and the neighbourhood turns out for its own films.
            </p>
            <p>
              Beyond the screenings, the building runs as a small leisure venue: a concessions
              counter with hot meals, a games floor for the wait between showings, and halls that
              local businesses and schools rent for meetings and events.
            </p>
          </div>
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <div
            className="border border-line bg-surface p-8"
            style={{ borderRadius: 'var(--radius-panel)' }}
          >
            <h2 className="eyebrow text-gold">At a glance</h2>
            <dl className="mt-6 space-y-6 text-sm">
              <div>
                <dt className="eyebrow">Parent company</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{site.parentCompany}</dd>
              </div>
              <div>
                <dt className="eyebrow">Location</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">{site.address.full}</dd>
              </div>
              <div>
                <dt className="eyebrow">What we do</dt>
                <dd className="mt-2 leading-relaxed text-ink-muted">
                  {services.map((service) => service.name).join(' · ')}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>

      <section className="shell pt-24">
        <div className="border-t border-line pt-10">
          <h2 className="max-w-[20ch] font-display text-3xl leading-tight tracking-tight md:text-4xl">
            “Providing a unique movie experience to the communities where it operates.”
          </h2>
          <p className="eyebrow mt-6">Our stated aim, in our own words</p>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/movies"
              className="bg-gold px-6 py-3 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              See what is showing
            </Link>
            <Link
              to="/contact"
              className="border border-line-control px-6 py-3 text-sm transition-colors duration-200 hover:border-gold hover:text-gold"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              Visit us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
