import s from './Breadcrumbs.module.scss'
import cn from 'classnames'
import { usePage } from '/lib/context/page';
import { RegionLink } from '/components'

export type Props = {
  title?: string
  show: boolean
}

export default function Breadcrumbs({ show }: Props) {

  const page = usePage()
  if (!page.crumbs)
    return null

  const crumbs = [{ slug: '', title: 'Hem', regional: true }, ...page.crumbs]

  return (
    <div className={cn(s.container, show && s.show)}>
      {crumbs.map(({ slug, title, regional }, idx) =>
        <>
          {slug === undefined ?
            <>{title}</>
            :
            <RegionLink key={idx} href={`/${slug}`} regional={regional}>
              {title}
            </RegionLink>
          }
          {idx + 1 < crumbs.length && <>&nbsp;›&nbsp;</>}
        </>
      )
      }
    </div >
  )
}