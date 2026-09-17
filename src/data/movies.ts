import aFathersSecret from '../assets/posters/a-fathers-secret.jpg'
import ajosepo from '../assets/posters/ajosepo-the-gathering.jpg'
import alahun from '../assets/posters/alahun-the-weaver.jpg'
import callOfMyLife from '../assets/posters/call-of-my-life.jpg'
import ikenga from '../assets/posters/ikenga-the-last-festival.jpg'
import kingKosoko from '../assets/posters/king-kosoko.jpg'
import mutiny from '../assets/posters/mutiny.jpg'
import njem from '../assets/posters/njem-the-journey.jpg'
import nneMgbafor from '../assets/posters/nne-mgbafor.jpg'
import oneNightOnly from '../assets/posters/one-night-only.jpg'
import properties from '../assets/posters/properties-of-the-gods.jpg'
import remiNneoma from '../assets/posters/remi-and-nneoma.jpg'
import spiderMan from '../assets/posters/spider-man-brand-new-day.jpg'
import sweet16 from '../assets/posters/sweet-16.jpg'
import endOfOakStreet from '../assets/posters/the-end-of-oak-street.jpg'
import omotara from '../assets/posters/the-return-of-omotara-johnson.jpg'

export type Category = 'Action' | 'Drama'

export interface Movie {
  /** URL-safe id, also used as the anchor target from poster links. */
  id: string
  title: string
  synopsis: string
  /** Out of 5, as published on the current site. */
  rating: number
  /** Running time in minutes. */
  lengthMinutes: number
  showtimes: string[]
  category: Category
  poster: string
  /** `null` where the live site only has a `#` placeholder for the trailer. */
  trailerUrl: string | null
}

/**
 * Transcribed from the "Now Showing" grid on magnificentcinemas.com/index.html
 * (audited 17 Sep 2026). Ratings and running times are uniform on the source
 * site — see the open questions in the redevelopment plan.
 */
export const movies: Movie[] = [
  {
    id: 'mutiny',
    title: 'Mutiny',
    synopsis:
      'After his billionaire industrialist boss is murdered in front of him, Cole Reed is set up to take the fall for the crime — leaving him on the run as he works to uncover an international conspiracy.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['2:00PM'],
    category: 'Action',
    poster: mutiny,
    trailerUrl: null,
  },
  {
    id: 'spider-man-brand-new-day',
    title: 'Spider-Man: Brand New Day',
    synopsis:
      'Four years have passed since the events of No Way Home, and Peter is now an adult living entirely alone, having voluntarily erased himself from the lives and memories of those he loves. Crime-fighting in a New York that no longer knows his name, he has devoted himself entirely to protecting his city — but as the demands on him intensify, the pressure sparks a physical evolution that threatens his existence.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['4:00PM', '6:30PM', '8:40PM'],
    category: 'Action',
    poster: spiderMan,
    trailerUrl: 'https://www.youtube.com/embed/DlBYE7SqoiM',
  },
  {
    id: 'properties-of-the-gods',
    title: 'Properties of the Gods',
    synopsis:
      'Properties of the Gods traces the origins of the ancient Osu caste system through the true story of two young Igbo Americans whose love is tested by a centuries-old tradition. Returning to Nigeria to celebrate their union, they discover their dream wedding is impossible when a family investigation reveals she is Osu and he is Diala.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['3:00PM', '7:00PM', '9:00PM'],
    category: 'Drama',
    poster: properties,
    trailerUrl: null,
  },
  {
    id: 'ikenga-the-last-festival',
    title: 'Ikenga: The Last Festival',
    synopsis:
      'In the peaceful kingdom of Umuani, where honour, integrity and sacred traditions guide the people, the use of dark spiritual forces is strongly condemned. But when a powerful man rises through forbidden powers, the foundation of their way of life is threatened, and the king and elders come under immense pressure to restore honour.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['3:00PM', '7:00PM', '9:00PM'],
    category: 'Drama',
    poster: ikenga,
    trailerUrl: null,
  },
  {
    id: 'nne-mgbafor',
    title: 'Nne Mgbafor',
    synopsis:
      'A gripping historical epic inspired by the warrior traditions of Ohafia. When Itenta, a peaceful farmer mocked for lacking a warrior’s title, is captured by enemies, his fearless wife Mgbafor defies custom and embarks on a perilous rescue mission that challenges the beliefs of an entire kingdom.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM', '4:00PM', '6:00PM'],
    category: 'Drama',
    poster: nneMgbafor,
    trailerUrl: null,
  },
  {
    id: 'alahun-the-weaver',
    title: 'Alahun: The Weaver',
    synopsis:
      'In the warrior kingdom of Irepewole, Adeboriiku is an unlikely heir — a gentle basket weaver born to the realm’s greatest warlord. When his betrothed, Princess Olajumoke, is lured into the spirit world by the Demon King, he journeys through enchanted forests and masquerade realms to learn that true strength is forged by sacrifice, not the sword.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['5:00PM'],
    category: 'Drama',
    poster: alahun,
    trailerUrl: null,
  },
  {
    id: 'banished-scroll',
    title: 'Banished Scroll',
    synopsis:
      'After ten years of absence, Juwon returns to Nigeria to reconnect with the daughter he abandoned and the woman he once betrayed. As old wounds resurface, Anita must confront a past that cost her education, family and dignity, while protecting the child she raised alone.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['12:00PM', '2:00PM', '8:00PM'],
    category: 'Drama',
    poster: aFathersSecret,
    trailerUrl: null,
  },
  {
    id: 'king-kosoko',
    title: 'King Kosoko: The Battle For Lagos',
    synopsis:
      'Warrior Kosoko, grandson of King Ologun Kutere, survives childhood curses to become a formidable prince. When his father Esinlokun dies, Kosoko is sidelined as his younger brother Idewu and later his uncle Adele Ajosun usurp the throne. Kosoko bides his time, amassing wealth through trade and alliances.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['12:00PM', '6:00PM', '9:00PM'],
    category: 'Drama',
    poster: kingKosoko,
    trailerUrl: null,
  },
  {
    id: 'a-fathers-secret',
    title: 'A Father’s Secret',
    synopsis:
      'Torn between faith, forgiveness and self-preservation, Anita faces a difficult choice: allow Juwon back into their lives, or finally close a chapter built on lies.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['3:00PM', '7:00PM'],
    category: 'Drama',
    poster: aFathersSecret,
    trailerUrl: null,
  },
  {
    id: 'one-night-only',
    title: 'One Night Only',
    synopsis:
      'When life’s endless struggle drives a young hustler to chase migration as his only escape, an unexpected twist ties his dream of freedom to a painful choice that could cost him someone he loves.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM', '2:00PM'],
    category: 'Drama',
    poster: oneNightOnly,
    trailerUrl: null,
  },
  {
    id: 'sweet-16',
    title: 'Sweet 16',
    synopsis:
      'A spoiled, wealthy city girl counts down to a glamorous 16th birthday party where she expects a car as a gift. Her world turns upside down when she is tricked into spending the summer holidays in a village, and must use her sassiness to bring redemption to the village and discover her true self.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM', '3:00PM'],
    category: 'Drama',
    poster: sweet16,
    trailerUrl: null,
  },
  {
    id: 'call-of-my-life',
    title: 'Call of My Life',
    synopsis:
      'A romantic comedy following Soluchi, a hopeless romantic still healing from being jilted by her former lover Kalu. When a regular work call puts her in touch with the charming Eli, Soluchi begins to see the possibility of the love story she has always wanted.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['1:00PM', '4:00PM', '5:00PM'],
    category: 'Drama',
    poster: callOfMyLife,
    trailerUrl: null,
  },
  {
    id: 'the-end-of-oak-street',
    title: 'The End of Oak Street',
    synopsis:
      'Synopsis to be confirmed with the cinema — the listing on the current site has no description.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['12:00PM', '6:30PM'],
    category: 'Action',
    poster: endOfOakStreet,
    trailerUrl: null,
  },
  {
    id: 'njem-the-journey',
    title: 'Njem: The Journey',
    synopsis:
      'When life’s endless struggle drives a young hustler to chase migration as his only escape, an unexpected twist ties his dream of freedom to a painful choice that could cost him someone he loves.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM', '1:00PM'],
    category: 'Drama',
    poster: njem,
    trailerUrl: null,
  },
  {
    id: 'ajosepo-the-gathering',
    title: 'Ajosepo: The Gathering',
    synopsis:
      'Two families reunite for a lavish Yoruba wedding after a past scandal nearly tore them apart. As Mary and Jide prepare to marry, unresolved tensions and reputation fears threaten their union, while new parents Dapo and Tani battle constant clashes between their feuding mothers.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM', '1:00PM'],
    category: 'Drama',
    poster: ajosepo,
    trailerUrl: null,
  },
  {
    id: 'remi-and-nneoma',
    title: 'Remi & Nneoma',
    synopsis:
      'After losing their loved ones, Remi insists on staying with her mother-in-law, Nneoma. Together they navigate emotional pain, societal expectations of widows, and the process of rebuilding their lives — during which Remi discovers new love.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['10:00AM'],
    category: 'Drama',
    poster: remiNneoma,
    trailerUrl: null,
  },
  {
    id: 'the-return-of-omotara-johnson',
    title: 'The Return of Omotara Johnson',
    synopsis:
      'Haunted by her criminal past, Omotara Johnson has built a quiet life around her son. But when he is accused of murder, old enemies resurface and hidden betrayals explode — from a lover’s double life to a best friend’s deadly secret.',
    rating: 4,
    lengthMinutes: 101,
    showtimes: ['12:00PM', '8:00PM'],
    category: 'Drama',
    poster: omotara,
    trailerUrl: null,
  },
]

export const categories: Category[] = ['Action', 'Drama']
