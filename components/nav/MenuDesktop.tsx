import s from './MenuDesktop.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import { regions } from "/lib/region";
import { useStore, shallow } from '/lib/store'
import { useScrollInfo } from 'dato-nextjs-utils/hooks'
import type { Menu, MenuItem } from '/lib/menu'
import { RegionSelector, RegionLink, User } from '/components'

export type MenuDesktopProps = { items: Menu }

export default function MenuDesktop({ items }: MenuDesktopProps) {

	const menuRef = useRef<HTMLDivElement | null>(null);
	const subRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter()
	const [paddingLeft, setPaddingLeft] = useState<string>('0px')
	const [selected, setSelected] = useState<MenuItem | undefined>()
	const [showMenu, setShowMenu] = useStore((state) => [state.showMenu, state.setShowMenu])
	const { isPageBottom, isPageTop, isScrolledUp, scrolledPosition, viewportHeight } = useScrollInfo()

	useEffect(() => { // Toggle menu bar on scroll
		//setShowMenu((isScrolledUp && !isPageBottom) || isPageTop)
	}, [scrolledPosition, isPageBottom, isPageTop, isScrolledUp, setShowMenu]);


	useEffect(() => {
		if (typeof selected === 'undefined')
			return


		const isAtBottom = menuRef.current.getBoundingClientRect().bottom >= viewportHeight //subRef.current.getBoundingClientRect().top
		const el = document.querySelector<HTMLUListElement>(`[data-menu-type="${selected.type}"]`)
		const bounds = el.getBoundingClientRect()


		setPaddingLeft(`${bounds.left}px`)

		if (isAtBottom) {
			console.log(getComputedStyle(subRef.current).paddingTop);

			const height = 140//subRef.current.getBoundingClientRect().height - 70
			window.scrollTo({
				top: height,
				behavior: 'smooth'
			})
		}



	}, [selected])

	useEffect(() => {
		setSelected(undefined)
	}, [router])

	return (
		<>
			<nav id="menu" ref={menuRef} className={cn(s.menu, showMenu && s.show)}>
				<ul
					className={s.nav}
					onMouseLeave={() => setSelected(undefined)}
				>
					{items.map((item, idx) =>
						<li
							key={idx}
							data-menu-type={item.type}
							onMouseEnter={() => setSelected(item)}
						>
							{item.index ?
								<RegionLink href={item.slug} regional={item.regional}>
									{item.label}
								</RegionLink>
								:
								<>{item.label}</>
							}
						</li>
					)}
					<li className={s.user}>
						<User />
					</li>
					<li className={s.region}>
						<RegionSelector />
					</li>
				</ul>
				<div className={s.background} ref={subRef} style={{ paddingLeft }}>
					{items.map((item, i) => {
						return (
							<ul
								key={i}
								data-sub-type={item.type}
								className={cn(s.sub, selected?.type === item.type && !selected.index && s.show)}
								onMouseLeave={() => setSelected(undefined)}
								onMouseEnter={() => setSelected(item)}
							>
								{item.sub?.map(({ slug, label, regional }, idx) =>
									<li key={idx}>
										<RegionLink href={slug} regional={regional}>
											{label}
										</RegionLink>
									</li>
								)}
							</ul>
						)
					})}
				</div>
			</nav>
		</>
	)
}
