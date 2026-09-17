import { useState, type FormEvent } from 'react'

import PageHeader from '../components/PageHeader'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

interface FieldErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const revealRef = useReveal<HTMLDivElement>(80)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: FieldErrors = {}
    if (!name) next.name = 'Please tell us your name.'
    if (!email) next.email = 'Please add an email address so we can reply.'
    else if (!EMAIL_PATTERN.test(email)) next.email = 'That does not look like an email address.'
    if (message.length < 10) next.message = 'Please add a little more detail — at least a sentence.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    // No backend exists yet — see the open questions in the build notes.
    // Until one is wired up, hand the enquiry to the cinema's inbox.
    const body = `From: ${name} (${email})\n\n${message}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Website enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const fieldClass = (hasError: boolean) =>
    [
      'w-full border bg-surface px-4 py-3 text-sm text-ink transition-colors duration-200',
      'placeholder:text-ink-dim focus:border-gold focus:outline-none',
      hasError ? 'border-[#c4644a]' : 'border-line-control',
    ].join(' ')

  return (
    <div ref={revealRef}>
      <PageHeader
        eyebrow="Contact"
        title="Find us on Ikorodu Road"
        lead="The box office is on the 2nd floor of Moyosore House. Call the Help Center for showtimes, group bookings or hall rental rates."
      />

      <section className="shell grid gap-14 md:grid-cols-12">
        {/* Details */}
        <div className="md:col-span-5">
          <dl className="space-y-9">
            <div className="reveal">
              <dt className="eyebrow text-gold">Our cinema is located at</dt>
              <dd className="mt-3">
                <address className="text-lg not-italic leading-relaxed text-ink">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.area}, {site.address.city}
                </address>
              </dd>
            </div>

            <div className="reveal">
              <dt className="eyebrow text-gold">Help center</dt>
              <dd className="mt-3 space-y-1.5">
                {site.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="tabular block text-lg text-ink transition-colors duration-200 hover:text-gold"
                  >
                    {phone}
                  </a>
                ))}
              </dd>
            </div>

            <div className="reveal">
              <dt className="eyebrow text-gold">Email</dt>
              <dd className="mt-3">
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-lg text-ink transition-colors duration-200 hover:text-gold"
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div className="reveal">
              <dt className="eyebrow text-gold">Social</dt>
              <dd className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                {site.social.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink-muted underline decoration-line-bright underline-offset-4 transition-colors duration-200 hover:text-gold hover:decoration-gold"
                  >
                    {channel.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        {/* Map — overlapping the details column slightly on wide screens */}
        <div className="md:col-span-7 md:-mt-24">
          <div
            className="overflow-hidden border border-line bg-surface"
            style={{ borderRadius: 'var(--radius-panel)', boxShadow: 'var(--shadow-lift)' }}
          >
            <iframe
              src={site.mapEmbedUrl}
              title={`Map showing ${site.name} at ${site.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full md:h-[28rem]"
              style={{ border: 0, filter: 'grayscale(0.6) contrast(1.05) brightness(0.85)' }}
            />
          </div>
          <p className="mt-3 text-xs text-ink-dim">
            Moyosore House sits on the Somolu side of Ikorodu Road, near Onipanu bus stop.
          </p>
        </div>
      </section>

      {/* Enquiry form — the current site has none */}
      <section className="shell pt-24 md:pt-32">
        <div className="grid gap-12 border-t border-line pt-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2
              className="max-w-[14ch] font-display font-black leading-[0.92] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
            >
              Send us a message
            </h2>
            <p className="mt-5 max-w-[40ch] text-sm leading-relaxed text-ink-muted">
              For group bookings, hall rentals and press enquiries. We reply from the Help Center
              inbox, usually within a working day.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="md:col-span-7 md:col-start-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="eyebrow block">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`mt-3 ${fieldClass(Boolean(errors.name))}`}
                  style={{ borderRadius: 'var(--radius-tight)' }}
                  placeholder="Adaeze Okonkwo"
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-xs text-[#e08b6f]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="eyebrow block">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`mt-3 ${fieldClass(Boolean(errors.email))}`}
                  style={{ borderRadius: 'var(--radius-tight)' }}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-[#e08b6f]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="eyebrow block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`mt-3 resize-y ${fieldClass(Boolean(errors.message))}`}
                style={{ borderRadius: 'var(--radius-tight)' }}
                placeholder="We would like to rent a hall on the 14th for about 60 guests."
              />
              {errors.message && (
                <p id="message-error" className="mt-2 text-xs text-[#e08b6f]">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                className="bg-gold px-7 py-3.5 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px"
                style={{ borderRadius: 'var(--radius-tight)' }}
              >
                Send message
              </button>
              <p aria-live="polite" className="text-sm text-ink-muted">
                {sent ? 'Your email client should now be open with the message ready to send.' : ''}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
