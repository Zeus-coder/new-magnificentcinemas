import { Link } from 'react-router-dom'

import { services, site } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-32 border-t border-line bg-surface">
      <div className="shell grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl leading-none tracking-tight">
            A unique movie experience, on Ikorodu Road.
          </h2>
          <p className="mt-5 max-w-[48ch] text-sm leading-relaxed text-ink-muted">{site.blurb}</p>

          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ink-muted underline decoration-line-bright underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h3 className="eyebrow">Our services</h3>
          <ul className="mt-5 space-y-2.5">
            {services.map((service) => (
              <li key={service.id}>
                <Link
                  to="/services"
                  className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="eyebrow">Help center</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-muted">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="tabular transition-colors duration-200 hover:text-ink"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="break-all transition-colors duration-200 hover:text-ink"
              >
                {site.email}
              </a>
            </li>
          </ul>

          <h3 className="eyebrow mt-8">Find us</h3>
          <address className="mt-5 text-sm not-italic leading-relaxed text-ink-muted">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.area}, {site.address.city}
          </address>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. A subsidiary of {site.parentCompany}.
          </p>
          <nav aria-label="Secondary" className="flex gap-5">
            <Link to="/contact" className="transition-colors duration-200 hover:text-ink-muted">
              Contact
            </Link>
            <Link to="/prices" className="transition-colors duration-200 hover:text-ink-muted">
              Ticket prices
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
