import s from './Image.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image as DatoImage } from 'react-datocms'
import { ImageGallery } from '/components'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'

export type ImageBlockProps = {
	id: string,
	data: ImageRecord,
	onClick: Function,
	editable?: any
}

export default function Image({ id, data: { image: images }, onClick, editable }: ImageBlockProps) {

	const isSingle = images.length === 1
	const isDouble = images.length === 2
	const isGallery = images.length > 2;

	return (
		isSingle ?
			<figure className={s.single} data-editable={editable}>
				<DatoImage
					data={images[0].responsiveImage}
					className={s.image}
					fadeInDuration={0}
				/>
				{images[0].title &&
					<figcaption><Markdown allowedElements={['em', 'p']}>{images[0].title}</Markdown></figcaption>
				}
			</figure>
			: isDouble ?
				<div className={s.double} data-editable={editable}>
					<figure >
						<DatoImage
							data={images[0].responsiveImage}
							className={s.image}
							fadeInDuration={0}
						/>
						{images[0].title &&
							<figcaption><Markdown allowedElements={['em', 'p']}>{images[0].title}</Markdown></figcaption>
						}
					</figure>
					<figure>
						<DatoImage
							data={images[1].responsiveImage}
							className={s.image}
							fadeInDuration={0}
						/>
						{images[1].title &&
							<figcaption><Markdown allowedElements={['em', 'p']}>{images[1].title}</Markdown></figcaption>
						}
					</figure>
				</div>
				: isGallery ?
					<ImageGallery id={id} images={images} editable={editable} />
					: null
	)
}