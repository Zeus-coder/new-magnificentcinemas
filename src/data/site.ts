/**
 * Single source of truth for the contact details, services and pricing that
 * the current site repeats in every page footer.
 */

export const site = {
  name: 'Magnificent Cinemas',
  parentCompany: 'Magnificent International Leisure and Estate Services Ltd',
  blurb:
    'Magnificent Cinemas is a subsidiary of Magnificent International Leisure and Estate Services Ltd. The cinema aims at providing a unique movie experience to the communities where it operates.',
  address: {
    line1: '180/184 Ikorodu Road',
    line2: '2nd Floor, Moyosore House',
    area: 'Onipanu, Somolu',
    city: 'Lagos',
    full: '180/184 Ikorodu Road, 2nd Floor Moyosore House, Onipanu, Somolu, Lagos',
  },
  /** Both numbers appear on the live site; the prices page lists the pair. */
  phones: ['+234 701 646 9992', '+234 902 021 2406'],
  email: 'magnificentcinemas@magnificentinternational.com',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15855.40503636275!2d3.355329619775391!3d6.5404600500000125!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8dbae8bdd4b5%3A0xd9de4f726adacb8b!2s180%2F182+Ikorodu+Rd%2C+Somolu%2C+Lagos!5e0!3m2!1sen!2sng!4v1535680369716',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/magnificentcinemas' },
    { label: 'Instagram', href: 'https://www.instagram.com/magnificentcinemas/' },
    { label: 'X', href: 'https://twitter.com/magnificentcine' },
  ],
} as const

export interface ServiceEntry {
  id: string
  name: string
  summary: string
  detail: string
}

/**
 * The footer lists three services; joinus.html describes two of them at
 * length and shows tiles for games, meals and movies.
 */
export const services: ServiceEntry[] = [
  {
    id: 'exhibitions',
    name: 'Movie exhibitions',
    summary: 'Nollywood, Hollywood, Bollywood and Yoruba releases, screened daily.',
    detail:
      'We premiere only the best movies from Nollywood, Hollywood, Bollywood and Yoruba cinema. Showtimes run from 10:00AM through the last screening at 9:00PM, seven days a week.',
  },
  {
    id: 'concessions',
    name: 'Concessions',
    summary: 'Popcorn, drinks, hot meals and a games floor beside the halls.',
    detail:
      'Every ticket tier includes popcorn and a drink. Beyond the counter there is a full kitchen serving hot meals, and a games area for the wait between screenings.',
  },
  {
    id: 'hall-rentals',
    name: 'Cinema hall rentals',
    summary: 'Screens available for meetings, premieres, auditions and private events.',
    detail:
      'We rent our halls for annual general meetings, social gatherings, birthday parties, school events, workshops and seminars, auditions, and business meetings. Call the Help Center to check availability and rates.',
  },
]

export interface TicketTier {
  id: string
  audience: string
  note: string
  options: { price: number; includes: string }[]
}

export const ticketTiers: TicketTier[] = [
  {
    id: 'adult',
    audience: 'Adult',
    note: 'Blockbusters, Nollywood and Hollywood',
    options: [
      { price: 8000, includes: 'Big popcorn and drink' },
      { price: 7000, includes: 'Small popcorn and small drink' },
    ],
  },
  {
    id: 'children',
    audience: 'Children',
    note: 'All screenings',
    options: [{ price: 5000, includes: 'Popcorn and drink' }],
  },
]

export const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`
