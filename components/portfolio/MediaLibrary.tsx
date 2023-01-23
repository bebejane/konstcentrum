import { useEffect, useState, useRef } from "react";
import s from "./MediaLibrary.module.scss";
import cn from 'classnames'
import { KCImage as Image } from '/components'
import { Loader, FileInput } from "/components";
import { useSession } from "next-auth/react"

export type Props = {
  onSelect?: (image: FileField) => void
  onSelection?: (images: FileField[]) => void
  onShowLibrary?: (show: boolean) => void
  onError?: (err: Error) => void
  showLibrary: boolean
  selected?: FileField[]
  multi: boolean
}

export default function MediaLibrary({ onSelect, onSelection, onShowLibrary, showLibrary, onError, multi, selected: selectedFromProps = [] }: Props) {

  const { data: session, status } = useSession()
  const [selected, setSelected] = useState<FileField[]>([])
  const [images, setImages] = useState<FileField[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [loading, setLoading] = useState(false)
  const [uploadError, setUploadError] = useState<Error | undefined>()
  const [progress, setProgress] = useState<number | undefined>()
  const uploadRef = useRef<HTMLInputElement | null>()

  async function handleRefresh() {
    setLoading(true)
    setError(undefined)

    try {
      const res = await fetch('/api/account?medialibrary=true', { method: 'GET' })
      if (res.status !== 200)
        throw new Error('Det uppstod ett fel vid hämtning av bilder')
      const { images } = await res.json()
      console.log(images);

      setImages(images)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  const handleUploadDone = (upload: any) => handleRefresh()
  const handleUploadProgress = (progress: number) => setProgress(progress)
  const handleUploading = (upload: boolean) => setUploading(upload)
  const handleUploadError = (err: Error) => setUploadError(err)

  const handleClick = (e, img) => {
    if (multi && showLibrary)
      setSelected((s) => s.find(el => el.id === img.id) ? [...s.filter(el => el.id !== img.id)] : [...s, img])
    else
      onSelect(img)
  }
  useEffect(() => {
    onSelection?.(selected)
  }, [selected])

  useEffect(() => {
    if (status !== 'authenticated') return
    handleRefresh()
  }, [session, status])

  useEffect(() => {
    setSelected(selectedFromProps)
  }, [selectedFromProps])

  return (
    <>
      <ul className={s.gallery}>
        {(showLibrary ? images : selected)?.map((img, idx) =>
          <li
            key={idx}
            className={cn(selected.find(el => el.id === img.id) && showLibrary && s.selected)}
            onClick={(e) => handleClick(e, img)}
          >
            <Image
              data={{ ...img.responsiveImage, sizes: undefined }}
              className={s.thumb}
              usePlaceholder={false}
              objectFit="contain"
              sizes="(min-width: 66em) 400px"
            />
          </li>
        )}
        <li className={s.upload}>
          {progress === undefined || progress === 100 && !uploading ?
            showLibrary ?
              <button type="button" onClick={() => uploadRef.current.click()}>
                Ladda upp
              </button>
              :
              <button type="button" onClick={() => onShowLibrary?.(true)}>
                Lägg till bild(er)
              </button>
            :
            <Loader message={progress === undefined ? 'Laddar upp...' : progress === 100 ? 'Sparar...' : progress + '%'} />
          }
        </li>
      </ul>
      {error &&
        <div className={s.error}>
          <div>{error.message}</div>
          <button type="button" onClick={handleRefresh}>Försök igen</button>
        </div>
      }
      {loading &&
        <div className={s.loading}>
          <Loader />
        </div>
      }
      <FileInput
        ref={uploadRef}
        customData={{}}
        tags={[session?.user.email]}
        accept=".jpg,.png"
        onDone={handleUploadDone}
        onProgress={handleUploadProgress}
        onUploading={handleUploading}
        onError={handleUploadError}
      />
    </>
  )
}