import s from './Pager.module.scss'
import React from 'react'
import Link from 'next/link'
import { RegionLink } from '/components'

export type PagerProps = {
  pagination: Pagination,
  slug: string
}

export default function Pager({ pagination: { count, page, size }, slug }: PagerProps) {


  const pages = new Array(Math.ceil(count / size)).fill(0).map((p, idx) => idx + 1);

  if (pages.length <= 1)
    return null

  return (
    <nav className={s.container}>
      <ul>
        {pages.map((p, idx) =>
          <li key={idx}>
            {page === p ? <>{p}</> : <RegionLink regional={true} href={`${slug}/sida/${p}`}>{p}</RegionLink>}
          </li>
        )}
      </ul>
    </nav>
  )
}