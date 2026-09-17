import { movies } from '../data/movies'

/**
 * Hero backdrop: a wall of the posters actually playing this week.
 *
 * This replaces the old site's banner carousel, which rotated Insidious,
 * Evil Dead and Moana — none of which are in the current line-up — and which
 * put Hollywood art behind a headline about Nollywood.
 *
 * Deliberately static. A drifting wall would be decorative motion running for
 * well over five seconds, which would need its own pause control under
 * WCAG 2.2.2; a still wall carries no such debt and reads as a lobby display.
 */
export default function PosterWall() {
  // Doubled so the tilted, scaled-up grid still covers the corners.
  const tiles = [...movies, ...movies]

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 -rotate-6 scale-125">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
          {tiles.map((movie, index) => (
            <img
              key={`${movie.id}-${index}`}
              src={movie.poster}
              alt=""
              loading={index < 7 ? 'eager' : 'lazy'}
              decoding="async"
              className="aspect-[2/3] w-full object-cover"
              style={{ borderRadius: 'var(--radius-tight)' }}
            />
          ))}
        </div>
      </div>

      {/* Knock the wall back so it reads as texture, not content */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgb(11 10 9 / 0.62)' }}
      />

      {/* Left rail stays dark enough to carry the display type */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgb(11 10 9 / 0.97) 0%, rgb(11 10 9 / 0.93) 32%, rgb(11 10 9 / 0.62) 60%, rgb(11 10 9 / 0.4) 100%)',
        }}
      />

      {/* Vignette + floor, so the wall fades into the stats bar */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgb(11 10 9) 0%, rgb(11 10 9 / 0.4) 18%, transparent 46%), radial-gradient(ellipse 85% 60% at 50% 0%, rgb(11 10 9 / 0.9), transparent 72%)',
        }}
      />
    </div>
  )
}
