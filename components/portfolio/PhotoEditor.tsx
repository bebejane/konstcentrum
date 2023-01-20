import s from "./PhotoBlockEditor.module.scss";
import { useEffect, useState } from "react";
import { KCImage as Image, PortfolioContent } from '/components'

export type Props = {
  image: FileField,
  onClose: () => void
  onChoose: () => void
  onUpdate: (image: FileField) => void
}

export default function PhotoEditor({ image, onUpdate, onChoose }: Props) {

  if (!image) return null

  return (
    <div className={s.editor}>
      <div className={s.photo}>
        <figure>
          {image ?
            <Image
              data={image.responsiveImage}
              className={s.image}
              objectFit="contain"
              usePlaceholder={false}
            />
            :
            <button onClick={() => onChoose()}>Välj bild</button>
          }
        </figure>
      </div>
      <div className={s.meta}>
        <label className="small" htmlFor="description">
          Bildtext <span>Tips! Du kan kursivera titlar med *titel*.</span>
        </label>
        <input name="title" type="text" value={image.title} onChange={(e) => onUpdate({ ...image, title: e.target.value })} />
      </div>
    </div>
  )
}
