import React, { FC, useState } from 'react'
import { styles } from '../../styles/styles'
import NavigationMenu from '../ui/NavigationMenu'
import Button from '../ui/Button'
import CLoseIcon from '../icons/CLoseIcon'
import BurgerIcon from '../icons/BurgerIcon'
import MobileMenu from '../ui/MobileMenu'
import WalletButton from '../auth/WalletButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { FaCog, FaBell } from 'react-icons/fa'
import SsolIcon from '../icons/SsolIcon'
import SdomoIcon from '../icons/SdomoIcon'

interface HeaderProps {
	className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
	const [mobMenu, setMobMenu] = useState(false)
	const { publicKey } = useWallet()

	// Placeholder balances - these will come from your backend later
	const ssolBalance = "0.00"
	const sdomoBalance = "0.00"

	return (
		<header className={`left-0 fixed right-0 z-20 ${className}`}>
			<div className={`${styles.container} px-2 flex items-center justify-between h-16`}>
				{/* Mobile Menu */}
				<MobileMenu
					customStyle={`${mobMenu ? 'translate-x-0' : '-translate-x-full'}`}
					setMobMenu={setMobMenu}
				/>

				{/* Center section - Navigation and Balances */}
				<div className="hidden md:flex items-center gap-8">
					<NavigationMenu />
					
					{/* Token Balances */}
					<div className="flex items-center gap-6">
						{/* SSOL Balance */}
						<div className="flex items-center gap-2">
							<SsolIcon className="w-6 h-6 text-yellow-400" />
							<span className="font-medium text-white">{ssolBalance} SSOL</span>
						</div>

						{/* SDOMO Balance */}
						<div className="flex items-center gap-2">
							<SdomoIcon className="w-6 h-6 text-purple-400" />
							<span className="font-medium text-white">{sdomoBalance} SDOMO</span>
						</div>
					</div>
				</div>

				{/* Right Section - Wallet and User Controls */}
				<div className="flex items-center gap-4">
					{/* START PLAYING Button */}
					<div>
						<Button
							callback={() => null}
							variant='secondary'
							text='START PLAYING'
							link={true}
							linkPath='https://t.me/sol_domo_bot'
						/>
					</div>

					<WalletButton />

					{publicKey && (
						<>
							{/* Notifications */}
							<button className="p-2 hover:bg-white/10 rounded-full hidden md:flex">
								<FaBell className="w-5 h-5 text-white" />
							</button>

							{/* Settings */}
							<button className="p-2 hover:bg-white/10 rounded-full hidden md:flex">
								<FaCog className="w-5 h-5 text-white" />
							</button>

							{/* User Avatar */}
							<div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-white hidden md:block">
								{/* Avatar image will go here */}
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
