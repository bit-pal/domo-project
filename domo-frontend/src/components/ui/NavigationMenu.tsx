import { Link, animateScroll as scroll } from 'react-scroll'

const navigationMenu = [
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
		title: 'APP',
		url: 'docs',
	},
	{
		id: 5,
		title: 'CONTACT',
		url: 'contact',
	},
]

const NavigationMenu = () => {
	return (
		<nav data-aos='zoom-in' className='xs:hidden md:flex gap-x-6 text-yellow'>
			{navigationMenu.map((item, index) => (
				<Link
					key={item.id}
					to={item.url}
					activeClass='text-green'
					spy={true}
					smooth={true}
					className='font-normal text-xl leading-6 uppercase cursor-pointer link-menu'
					duration={500}
					offset={
						index === navigationMenu.length - 1
							? -window.innerHeight + 550
							: -90
					}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

export default NavigationMenu
