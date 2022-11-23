import { apiQuery } from 'dato-nextjs-utils/api';
import { AllNewsDocument, AllAboutsMenuDocument } from "/graphql";

export type Menu = MenuItem[]

export type MenuItem = {
  type: string,
  index?: boolean
  label: string,
  slug?: string,
  sub?: MenuItem[]
}

const base: Menu = [
  {
    type: 'about', label: 'Om', sub: []
  },
  {
    type: 'consult', label: 'Anlita oss', sub: [
      { type: 'consult', label: 'Hitta konstnär', slug: '/anlita-oss/hitta-konstnar' },
      { type: 'consult', label: 'Rådgivning', slug: '/anlita-oss/radgivning' },
      { type: 'consult', label: 'Uppdragsarkiv', slug: '/uppdrag' },
      { type: 'consult', label: 'Uppdragsgivare', slug: '/anlita-oss/uppdragsgivare' },
      { type: 'consult', label: 'Offentlig konst', slug: '/anlita-oss/offentlig-konst' }
    ]
  },
  {
    type: 'artist', label: 'För konstnärer', sub: [
      { type: 'artist', label: 'Bli medlem', slug: '/konstnar/bli-medlem' },
      { type: 'artist', label: 'Logga in', slug: '/konstnar/logga-in' },
      { type: 'artist', label: 'Aktuellt', slug: '/konstnar/aktuellt' },
      { type: 'artist', label: 'Arbeta med oss', slug: '/konstnar/arbeta-med--oss' }
    ]
  },
  {
    type: 'initiative', label: 'Våra initiativ', slug: '/vara-initiativ', index: true, sub: [
      { type: 'initiative', label: 'Konstdepartementet', slug: '/initiativ/konstdepartementet' },
      { type: 'initiative', label: 'Galleri KC', slug: '/initiativ/galleri-kc' },
      { type: 'initiative', label: 'BRAK', slug: '/initiativ/brak' },
      { type: 'initiative', label: 'X - sites', slug: '/initiativ/x-sites' },
      { type: 'initiative', label: 'Plattform Syd', slug: '/initiativ/plattform-syd' }
    ]
  },
  {
    type: 'news', label: 'Nyheter', slug: '/nyheter', index: true, sub: []
  },
  {
    type: 'contact', label: 'Kontakt', slug: '/kontakt', index: true, sub: [
      { type: 'contact', label: 'Förbundet', slug: '/kontakt/forbundet' },
      { type: 'contact', label: 'Våra regioner', slug: '/kontakt/regioner' }
    ]
  },
]

export const buildMenu = async () => {

  const { news, abouts }: { news: NewsRecord[], abouts: AboutRecord[] } = await apiQuery([AllNewsDocument, AllAboutsMenuDocument]);

  const menu = base.map(item => {
    let sub: MenuItem[];
    switch (item.type) {
      case 'news':
        sub = news.slice(0, 5).map(el => ({ type: 'news', label: el.title, slug: `/mitt/${el.slug}` }))
        break;
      case 'about':
        sub = abouts.map(el => ({ type: 'about', label: el.title, slug: `/om/${el.slug}` }))
        break;
      default:
        break;
    }
    return { ...item, sub: sub ? sub : item.sub }
  })

  return menu
}