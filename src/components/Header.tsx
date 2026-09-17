import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import logo from '../assets/banners/mag-logo.jpg'

const navigation = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Movies' },
  { to: '/prices', label: 'Prices' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'relative py-1 text-sm transition-colors duration-200',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold',
      'after:transition-all after:duration-300 after:ease-out-soft',
      isActive
        ? 'text-ink after:w-full'
        : 'text-ink-muted hover:text-ink after:w-0 hover:after:w-full',
    ].join(' ')

  return (
    <header
      className="sticky top-0 border-b transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{
        zIndex: 'var(--z-nav)',
        backgroundColor: scrolled ? 'rgb(11 10 9 / 0.82)' : 'transparent',
        borderColor: scrolled ? 'var(--color-line)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
      }}
    >
      <div className="shell flex items-center gap-6 py-4">
        <Link
          to="/"
          className="group shrink-0 rounded-(--radius-tight)"
          aria-label="Magnificent Cinemas — home"
        >
          {/* The logo is a flat JPG with its own gold rule baked in, so it is
              seated on a slightly raised plate rather than left to float on
              the page background. */}
          <span
            className="block bg-raised/70 p-1.5 ring-1 ring-line transition-colors duration-300 group-hover:ring-line-bright"
            style={{ borderRadius: 'var(--radius-tight)' }}
          >
            <img
              src={logo}
              alt="Magnificent Cinemas"
              width={330}
              height={46}
              className="block h-7 w-auto transition-transform duration-300 ease-spring hover:scale-[1.02] md:h-8"
            />
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="#showtimes"
          className="ml-auto hidden bg-gold px-5 py-2.5 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px lg:ml-0 lg:inline-flex"
          style={{ borderRadius: 'var(--radius-tight)' }}
        >
          Book tickets
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span
            aria-hidden
            className="h-px w-6 bg-ink transition-transform duration-300 ease-out-soft"
            style={menuOpen ? { transform: 'translateY(6px) rotate(45deg)' } : undefined}
          />
          <span
            aria-hidden
            className="h-px w-6 bg-ink transition-opacity duration-200"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            aria-hidden
            className="h-px w-6 bg-ink transition-transform duration-300 ease-out-soft"
            style={menuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}
          />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-line bg-screen/97 backdrop-blur-xl lg:hidden"
        >
          <div className="shell flex flex-col py-4">
            {navigation.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${index * 35}ms` }}
                className={({ isActive }) =>
                  [
                    'border-b border-line/60 py-3.5 font-display text-2xl transition-colors',
                    isActive ? 'text-gold' : 'text-ink-muted',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="#showtimes"
              onClick={() => setMenuOpen(false)}
              className="mt-5 bg-gold px-5 py-3 text-center text-sm font-medium text-[#120d04]"
              style={{ borderRadius: 'var(--radius-tight)' }}
            >
              Book tickets
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
