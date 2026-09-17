import { useCallback, useEffect, useRef, useState } from 'react'

import evilDead from '../assets/banners/hero-evil-dead.jpg'
import insidious from '../assets/banners/hero-insidious.jpg'
import moana from '../assets/banners/hero-moana.jpg'
import oakStreet from '../assets/banners/hero-oak-street.jpg'
import spiderman from '../assets/banners/hero-spiderman.jpg'

/** The five banners the current site rotates through on its home page. */
const slides = [
  { src: spiderman, label: 'Spider-Man: Brand New Day' },
  { src: insidious, label: 'Insidious' },
  { src: oakStreet, label: 'The End of Oak Street' },
  { src: evilDead, label: 'Evil Dead' },
  { src: moana, label: 'Moana' },
]

const INTERVAL = 6500

/**
 * Full-bleed backdrop for the home hero. Renders the rotating banner plus its
 * own controls; the hero copy is layered over it by the page.
 */
export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const go = useCallback((next: number) => {
    setActive((next + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (paused) return
    timer.current = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, INTERVAL)
    return () => window.clearInterval(timer.current)
  }, [paused])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true)
  }, [])

  return (
    <>
      {/* Slides */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-roledescription="carousel"
        aria-label="Now showing at Magnificent Cinemas"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.label}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-out-soft"
            style={{ opacity: index === active ? 1 : 0 }}
            aria-hidden={index !== active}
          >
            <img
              src={slide.src}
              alt={index === active ? `Now showing: ${slide.label}` : ''}
              fetchPriority={index === 0 ? 'high' : 'low'}
              className="h-full w-full object-cover object-center"
              style={{
                transform: index === active ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 9s var(--ease-out-soft)',
              }}
            />
          </div>
        ))}

        {/* Scrims: left rail for the display type, floor for the stats bar */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgb(11 10 9 / 0.97) 0%, rgb(11 10 9 / 0.92) 30%, rgb(11 10 9 / 0.55) 58%, rgb(11 10 9 / 0.25) 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgb(11 10 9) 0%, rgb(11 10 9 / 0.35) 22%, transparent 48%), radial-gradient(ellipse 80% 55% at 50% 0%, rgb(11 10 9 / 0.85), transparent 70%)',
          }}
        />
      </div>

      {/* Controls — bottom right, clear of the copy on the left rail */}
      <div
        className="pointer-events-auto absolute bottom-32 right-5 flex items-center gap-4 md:bottom-36 md:right-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p className="hidden text-right text-xs text-ink-muted md:block">
          <span className="eyebrow block text-gold">On screen</span>
          <span className="mt-1 block">{slides[active].label}</span>
        </p>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => go(active - 1)}
            className="flex h-9 w-9 items-center justify-center border border-line-bright/70 bg-screen/50 text-ink-muted backdrop-blur-sm transition-colors duration-200 hover:border-gold hover:text-gold"
            style={{ borderRadius: 'var(--radius-tight)' }}
          >
            <span className="sr-only">Previous banner</span>
            <span aria-hidden>←</span>
          </button>

          <ul className="flex items-center gap-1.5">
            {slides.map((slide, index) => (
              <li key={slide.label}>
                <button
                  type="button"
                  onClick={() => go(index)}
                  aria-current={index === active}
                  className="block h-1 transition-all duration-500 ease-out-soft"
                  style={{
                    width: index === active ? '1.75rem' : '0.6rem',
                    backgroundColor:
                      index === active ? 'var(--color-gold)' : 'var(--color-line-bright)',
                  }}
                >
                  <span className="sr-only">Show {slide.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => go(active + 1)}
            className="flex h-9 w-9 items-center justify-center border border-line-bright/70 bg-screen/50 text-ink-muted backdrop-blur-sm transition-colors duration-200 hover:border-gold hover:text-gold"
            style={{ borderRadius: 'var(--radius-tight)' }}
          >
            <span className="sr-only">Next banner</span>
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </>
  )
}
