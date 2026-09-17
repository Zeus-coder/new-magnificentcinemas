import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  const { pathname } = useLocation()

  // Route changes should land at the top of the new page, not mid-scroll.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <div className="grain min-h-dvh bg-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:bg-gold focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-[#120d04]"
        style={{ zIndex: 'var(--z-skip)' }}
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
