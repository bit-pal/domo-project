import React, { FC } from 'react'
import { Link } from 'react-scroll'
import CLoseIcon from '../icons/CLoseIcon'

interface MobileMenuProps {
	setMobMenu: (value: boolean) => void
	customStyle?: string
}

const mobileMenu = [
	{
		id: 1,
		title: 'ABOUT',
		url: 'about',
	},
	{
		id: 2,
		title: 'TOKENOMICS',
		url: 'tokenomics',
	},
	{
		id: 3,
		title: 'ROADMAP',
		url: 'roadmap',
	},
	{
		id: 4,
		title: 'App',
		url: 'docs',
	},
	{
		id: 5,
		title: 'CONTACT',
		url: 'contact',
	},
]

const MobileMenu: FC<MobileMenuProps> = ({ setMobMenu, customStyle }) => {
	return (
		<nav
			className={`md:hidden flex transition-all flex-col gap-y-5 bg-maroon fixed shadow-xl left-0 top-0 bottom-0 py-11 px-5 gap-x-6 text-white ${customStyle}`}
		>
			<button
				onClick={() => setMobMenu(false)}
				className='ml-auto xs:flex size-8 justify-center items-center md:hidden'
			>
				<CLoseIcon />
			</button>
			{mobileMenu.map((item, index) => (
				<Link
					key={item.id}
					to={item.url}
					activeClass='text-white/80'
					spy={true}
					smooth={true}
					className='font-normal text-xl leading-6 uppercase cursor-pointer text-white hover:text-white/80 transition-colors'
					duration={500}
					offset={
						index === mobileMenu.length - 1 ? -window.innerHeight + 550 : -90
					}
					onClick={() => setMobMenu(false)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

export default MobileMenu 