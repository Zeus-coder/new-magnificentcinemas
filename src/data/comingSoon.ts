import doomsday from '../assets/posters/avengers-doomsday.jpg'
import dune from '../assets/posters/dune-part-three.jpg'
import jumanji from '../assets/posters/jumanji-open-world.jpg'
import differentGrounds from '../assets/posters/on-different-grounds.jpg'
import toyStory from '../assets/posters/toy-story-5.jpg'

export interface UpcomingFilm {
  id: string
  title: string
  poster: string
}

/**
 * From the "Coming Soon" strip on the current index.html. Titles only — the
 * source site publishes no synopsis or release date for these.
 */
export const comingSoon: UpcomingFilm[] = [
  { id: 'dune-part-three', title: 'Dune: Part Three', poster: dune },
  { id: 'avengers-doomsday', title: 'Avengers: Doomsday', poster: doomsday },
  { id: 'toy-story-5', title: 'Toy Story 5', poster: toyStory },
  { id: 'jumanji-open-world', title: 'Jumanji: Open World', poster: jumanji },
  { id: 'on-different-grounds', title: 'On Different Grounds', poster: differentGrounds },
]
