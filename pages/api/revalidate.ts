import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { regions } from '/lib/region'

export default withRevalidate(async (record, revalidate) => {

  const { api_key: apiKey } = record.model;
  const { slug, region } = record
  const paths = []

  switch (apiKey) {
    case 'region':
      paths.push(`/${slug}`)
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      break;
    case 'commission':
      paths.push(`/anlita-oss/uppdrag/${slug}`)
      paths.push(`/${region.slug}/anlita-oss/uppdrag/${slug}`)
      break;
    case 'consult':
      paths.push(`/anlita-oss/${slug}`)
      break;
    case 'apply':
      paths.push(`/konstnar/bli-medlem`)
      break;
    case 'member_news':
      paths.push(`/konstnar/aktuellt/${slug}`)
      paths.push(`/${region.slug}/konstnar/aktuellt/${slug}`)
      break;
    case 'project':
      paths.push(`/vara-initiativ`)
      break;
    case 'news':
      paths.push(`/nyheter/${slug}`)
      paths.push(`/${region.slug}/nyheter/${slug}`)
      break;
    case 'employee':
      paths.push(`/kontakt`)
      regions.forEach(({ slug }) => paths.push(`/${slug}/kontakt`))
      break;
    case 'press':
      paths.push(`/about/press`)
      break;
    case 'member':
      paths.push(`/anlita-oss/hitta-konstnar/${slug}`)
      paths.push(`/anlita-oss/hitta-konstnar`)
      break;
    default:
      break;
  }

  revalidate(paths)
})