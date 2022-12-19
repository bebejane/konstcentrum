import s from './RelatedSection.module.scss'
import React from 'react'
import { CardContainer, Card, Thumbnail, SectionHeader, BackgroundImage } from '/components'

export type RelatedSectionProps = {
  title: string,
  slug: string,
  regional?: boolean
  items: {
    title: string,
    subtitle?: string,
    image: FileField,
    slug: string
  }[]
}

export default function RelatedSection({ title, slug, items, regional = true }: RelatedSectionProps) {

  return (
    <section className={s.related}>
      <SectionHeader title={title} slug={slug} margin={true} />
      <BackgroundImage></BackgroundImage>
      <CardContainer columns={3}>
        {items.map(({ title, subtitle, image, slug }, idx) =>
          <Card key={idx}>
            <Thumbnail
              image={image}
              title={title}
              subtitle={subtitle}
              slug={slug}
              regional={regional}
            />
          </Card>
        )}
      </CardContainer>
    </section>
  )
}