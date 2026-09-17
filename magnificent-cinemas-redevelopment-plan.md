# Magnificent Cinemas — Website Redevelopment Plan

Source site: https://www.magnificentcinemas.com/
Target stack: **Vite** (vanilla or React — see Step 1) + the **taste-skill** agent skill for a modern, non-generic design pass.

Paste this whole file into a new VS Code project and give it to Claude Code / Cursor / Codex as the build brief. Steps are ordered — do them in sequence.

---

## 0. What we're working with (audit of the current site)

**Pages (current site is static HTML, no framework):**
| Page | URL |
|---|---|
| Home | `/index.html` |
| About | `/about.html` (currently returns 404 — content lives in the footer instead, see below) |
| Movies | `/review.html` |
| Services | `/joinus.html` |
| Prices | `/prices.html` |
| Contact | `/contact.html` |

**Logo:**
- `https://www.magnificentcinemas.com/images/mag_logo.jpg`

**Hero / carousel banners (home page):**
- `dummy/spiderman_.jpg`
- `dummy/insidious_large.jpg`
- `dummy/oakstreet_870x518.jpg`
- `dummy/evildead.jpg`
- `dummy/moana_.jpg`

**Embedded trailers (YouTube):**
- `https://www.youtube.com/embed/DlBYE7SqoiM`
- `https://www.youtube.com/embed/d_-awFdQ3oQ`

**"Now Showing" posters** (all under `/dummy/`, reused as-is): `mutinypost.jpg`, `spiderpost.jpg`, `properpost.jpg`, `ikenpost.jpg`, `nnepost1.jpg`, `alapost.jpg`, `fapost.jpg`, `kokpost.jpg`, `onepost.jpg`, `16post.jpg`, `callpost.jpg`, `endpost.jpg`, `Njem-Poster.jpg`, `ajosepost.jpg`, `nneopost.jpg`, `omopost.jpg` — each movie card has: title, synopsis, rating (out of 5), length, showtimes, category, trailer link.

**"Coming Soon" posters:** `dune3.jpg`, `doomsday_small.jpg`, `toy_storypost-233x396.jpg`, `jumanji.jpg`, `groupost-233x396.jpg` — titles only, "Coming Soon" badge, no synopsis.

**Footer content (present on every page — this is the de facto "About" content since `/about.html` 404s):**
- About Us blurb: *"Magnificent Cinema is a subsidiary of Magnificent International Leisure and Estate Services Ltd. The Cinema aims at providing a unique movie experience to the communities where it operates."*
- Services list: Movie Exhibitions, Concessions, Hall Rentals
- Help Center: `+234701 646 9992`, `+234902 021 2406`, `magnificentcinemas@magnificentinternational.com`
- Address: `180/184 Ikorodu Road, 2nd Floor Moyosore House, Onipanu Somolu`
- Social: [Facebook](https://www.facebook.com/magnificentcinemas) · [Twitter/X](https://twitter.com/magnificentcine) · [Instagram](https://www.instagram.com/magnificentcinemas/)

**Prices page content:**
- Adult: ₦8,000 (Big popcorn + Drink) / ₦7,000 (Small popcorn + Small drink)
- Children: ₦5,000 (Popcorn + Drink)

> ⚠️ Note: Since `/about.html` returned a 404 at audit time, re-check `review.html`, `joinus.html`, and `contact.html` for exact copy/assets before building — fetch them live and copy any additional image paths into `src/assets/` (see Step 2). Treat any copy below as a starting draft, not final truth.

---

## 1. Project setup

```bash
npm create vite@latest magnificent-cinemas -- --template react-ts
cd magnificent-cinemas
npm install
```

Recommended additions:
```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Why React + Tailwind:
- You have 6 distinct pages/routes → `react-router-dom` gives clean routing instead of separate `.html` files.
- Repeating card components (movie cards, coming-soon cards) map naturally to React components + `.map()` over a data array, instead of hand-copied HTML blocks like the current site.
- Tailwind pairs well with the taste-skill design system approach in Step 3.

If you'd rather stay closer to the original (no framework), use `npm create vite@latest magnificent-cinemas -- --template vanilla-ts` instead and skip react-router — but the component/data-driven approach below is strongly recommended given how repetitive the movie listings are.

---

## 2. Pull in the real assets

Don't hand-type image URLs into JSX — download the real files so the site is self-contained and fast.

```bash
mkdir -p src/assets/posters src/assets/banners
```

For each image URL listed in Step 0:
1. Download it into `src/assets/posters/` (movie posters) or `src/assets/banners/` (hero banners + logo).
2. Rename to something readable (e.g. `spiderman-brand-new-day.jpg` instead of `spiderpost.jpg`).
3. Import and reference locally in code — never hotlink the old domain in the rebuilt site.

Also **re-fetch** `review.html`, `joinus.html`, `contact.html`, and try `about.html` again (it may just have been temporarily down) to catch anything not listed above, especially any address/map embed on the Contact page and any extra copy on Services.

---

## 3. Install the taste-skill design skill

This repo (https://github.com/Leonxlnx/taste-skill) is an **agent skill**, not a UI library — it's a set of instructions that make your coding agent (Claude Code, Cursor, Codex) produce a more deliberate, less "AI slop" design instead of generic boilerplate layouts.

Since this is a **redesign of an existing site**, use the `redesign-skill` (install name `redesign-existing-projects`), not the base `taste-skill`:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "redesign-existing-projects"
```

If your agent tool doesn't support `npx skills add` directly, just open the skill's `SKILL.md` on GitHub and paste its contents into your agent's system/project instructions (or into a `.claude/skills/` or `CLAUDE.md` file, depending on your tool).

Optionally layer a visual-direction skill on top, once you've picked a look for a cinema brand (see Step 4):
```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "high-end-visual-design"
```
(or `minimalist-ui` / `industrial-brutalist-ui` depending on the direction you choose)

---

## 4. Decide the design direction before generating anything

Give your agent a short creative brief, e.g.:

> "Redesign a Nigerian cinema chain's website (Magnificent Cinemas). Cinematic, dark-mode-first, editorial movie-poster grid, bold display type for film titles, subtle motion on hover (poster tilt/scale), sticky nav with a 'Book Tickets' CTA. Avoid generic SaaS-template look — no default centered hero + 3 feature cards."

Set the taste-skill dials to match (in the SKILL.md or your prompt):
- `DESIGN_VARIANCE`: 6–8 (cinema sites benefit from asymmetric, poster-grid layouts, not a plain centered template)
- `MOTION_INTENSITY`: 5–7 (hover states, scroll reveals on movie cards — nothing overdone)
- `VISUAL_DENSITY`: 6–7 (movie listings are inherently dense; keep hero/nav airy, tighten the grid)

---

## 5. Information architecture (routes)

```
/                 Home       – hero carousel/banner, "Now Showing" grid, "Coming Soon" strip, footer
/movies           Movies     – full "Now Showing" + "Coming Soon" listing (from review.html)
/services         Services   – Movie Exhibitions / Concessions / Hall Rentals (from joinus.html)
/prices           Prices     – Adult / Children pricing table
/about            About      – company blurb (currently only in footer — expand it here)
/contact          Contact    – phone, email, address, social, map
```

Shared layout: persistent header (logo + nav + Book Tickets CTA) and footer (About/Services/Help Center/Join Us/Social — same 5 columns as today) wrapping every route via a `<Layout>` component + `<Outlet />`.

---

## 6. Suggested folder structure

```
src/
  assets/
    posters/
    banners/
  components/
    Header.tsx
    Footer.tsx
    Layout.tsx
    MovieCard.tsx
    ComingSoonCard.tsx
    HeroCarousel.tsx
  data/
    movies.ts          # typed array: title, synopsis, rating, length, showtimes[], category, poster, trailerUrl
    comingSoon.ts
  pages/
    Home.tsx
    Movies.tsx
    Services.tsx
    Prices.tsx
    About.tsx
    Contact.tsx
  App.tsx
  main.tsx
  index.css
```

`data/movies.ts` should be a typed array built from the Step 0 audit (title, synopsis, rating, length, showtimes, category, poster path, trailer link) — this replaces the hand-copied HTML block-per-movie on the current site with one data source rendered through `<MovieCard />`.

---

## 7. Build order

1. **Layout shell** — `Header`, `Footer`, `Layout` with `react-router-dom` routes wired up; get all 6 routes rendering empty pages first.
2. **Design tokens** — set up Tailwind theme (colors, type scale, spacing) per the direction chosen in Step 4, before building components, so nothing needs restyling later.
3. **Home page** — hero/banner, `MovieCard` grid for Now Showing, `ComingSoonCard` strip.
4. **Movies page** — reuse `MovieCard`, add category filter (Action/Drama/etc. — categories already exist in the data).
5. **Prices page** — simple pricing table/cards, Adult vs Children.
6. **Services page** — Movie Exhibitions / Concessions / Hall Rentals, as three feature blocks.
7. **About page** — expand the footer blurb into a real About page (mission, subsidiary info).
8. **Contact page** — phone/email/address/social, plus a form (the old site has none — optional addition) and/or embedded Google Map for the Ikorodu Road address.
9. **Motion pass** — apply the taste-skill's motion guidance (hover states on posters, scroll reveals) last, once layout is settled.
10. **Responsive pass** — check mobile nav, poster grid wrapping, hero on small screens.
11. **Accessibility pass** — alt text on all posters (use movie titles), focus states, contrast check on dark backgrounds.

---

## 8. Run it

```bash
npm run dev       # local dev server
npm run build      # production build to dist/
npm run preview    # preview the production build
```

---

## 9. Open questions to resolve while building

- `about.html` 404s on the live site — confirm with the client whether there's supposed to be dedicated About copy beyond the footer blurb.
- No booking/ticketing flow exists on the current site (all "trailer" links are `#` placeholders, no real checkout) — confirm whether this redesign should stay informational or add real ticket purchasing.
- Confirm current phone numbers are still correct (home footer only shows one number, prices page shows two).
