import s from './LatestMemberNews.module.scss'
import React from 'react'
import { CardContainer, NewsCard, SectionHeader } from '/components'
import format from 'date-fns/format'

export type LatestMemberBlockProps = {
  data: LatestMemberNewsRecord & {
    memberNews: MemberNewsRecord[]
  }
}

export default function LatestMemberNews({ data: { memberNews } }: LatestMemberBlockProps) {

  return (
    <section className={s.container}>
      <SectionHeader title="För medlemmar" slug={"/anlita-oss/uppdrag"} margin={true} />
      <CardContainer columns={2}>
        {memberNews.map(({ date, title, intro, slug, region, image }, idx) =>
          <NewsCard
            key={idx}
            title={title}
            subtitle={`${format(new Date(date), "d MMMM y")} • ${region.name}`}
            text={intro}
            image={image}
            slug={`/konstnar/aktuellt/${slug}`}
            regionName={region.name}
          />
        )}
      </CardContainer>
    </section>
  )
}