import React, { FC, useState } from 'react'
import { styles } from '../../styles/styles'
import NavigationMenu from '../ui/NavigationMenu'
import Button from '../ui/Button'
import CLoseIcon from '../svg/CLoseIcon'
import BurgerIcon from '../svg/BurgerIcon'
import MobileMenu from '../ui/MobileMenu'

interface HeaderProps {
	className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
	const [mobMenu, setMobMenu] = useState(false)
	return (
		<header className={` left-0 fixed right-0  z-20 ${className}`}>
			<div
				className={`${styles.container} px-2 flex items-center justify-between`}
			>
				<button
					onClick={() => setMobMenu(true)}
					className='xs:flex size-8 justify-center items-center md:hidden'
				>
					<BurgerIcon />
				</button>
				<MobileMenu
					customStyle={`${mobMenu ? 'translate-x-0' : '-translate-x-full'}`}
					setMobMenu={setMobMenu}
				/>

				<NavigationMenu />
				<Button
					callback={() => null}
					variant='secondary'
					text='START PLAYING'
					link={true}
					linkPath='https://t.me/sol_domo_bot'
				/>
			</div>
		</header>
	)
}

export default Header
