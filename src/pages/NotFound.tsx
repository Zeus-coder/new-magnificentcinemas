import { Link, useLocation, useNavigate } from 'react-router-dom'

import { movies } from '../data/movies'

export default function NotFound() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const suggestions = movies.slice(0, 4)

  return (
    <div className="bloom">
      <div className="shell flex min-h-[72dvh] flex-col justify-center pb-24 pt-40">
        <p className="eyebrow text-gold">Error 404</p>
        <h1
          className="mt-5 max-w-[14ch] font-display font-black leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}
        >
          That reel is missing
        </h1>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-muted">
          There is nothing at <span className="tabular text-ink">{pathname}</span>. It may have
          moved when we rebuilt the site.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            className="bg-gold px-6 py-3 text-sm font-medium text-[#120d04] transition-all duration-200 ease-out-soft hover:bg-gold-bright active:translate-y-px"
            style={{ borderRadius: 'var(--radius-tight)' }}
          >
            Back to the home page
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border border-line-control px-6 py-3 text-sm transition-colors duration-200 hover:border-gold hover:text-gold"
            style={{ borderRadius: 'var(--radius-tight)' }}
          >
            Go back
          </button>
        </div>

        <div className="mt-20 border-t border-line pt-10">
          <p className="eyebrow">Showing right now</p>
          <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {suggestions.map((movie) => (
              <li key={movie.id}>
                <Link to="/movies" className="group block">
                  <img
                    src={movie.poster}
                    alt={`Poster for ${movie.title}`}
                    loading="lazy"
                    className="aspect-[2/3] w-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                    style={{ borderRadius: 'var(--radius-poster)' }}
                  />
                  <span className="mt-3 block font-display text-sm leading-tight tracking-tight text-ink-muted transition-colors duration-200 group-hover:text-gold">
                    {movie.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
