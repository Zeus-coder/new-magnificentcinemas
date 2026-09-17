import { useEffect, useRef } from 'react'

/**
 * Adds `reveal-in` to every `.reveal` descendant as it enters the viewport,
 * staggering siblings so nothing mounts all at once.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(stagger = 70) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (targets.length === 0) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      targets.forEach((el) => el.classList.add('reveal-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const el = entry.target as HTMLElement
            el.style.setProperty('--reveal-delay', `${index * stagger}ms`)
            el.classList.add('reveal-in')
            observer.unobserve(el)
          })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [stagger])

  return ref
}
