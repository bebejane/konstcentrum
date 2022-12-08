import Link from 'next/link'
import { useRegion } from '/lib/context/region';

export type Props = {
  [key: string]: any
  regional?: boolean
}

export default function RegionLink(props: Props) {

  const region = useRegion()

  const isRegional = props.regional === true ? true : false
  const href = region && !region.global && isRegional ? `/${region.slug}${props.href}` : props.href

  return (
    <Link {...props} href={href} >
      {props.children}
    </Link >
  )
}