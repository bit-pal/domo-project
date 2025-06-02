import React, { FC, useState } from 'react'
import { styles } from '../../styles/styles'
import NavigationMenu from '../ui/NavigationMenu'
import Button from '../ui/Button'
import CLoseIcon from '../icons/CLoseIcon'
import BurgerIcon from '../icons/BurgerIcon'
import MobileMenu from '../ui/MobileMenu'
import WalletButton from '../auth/WalletButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { FaCog, FaBell, FaBars } from 'react-icons/fa'
import SsolIcon from '../icons/SsolIcon'
import SdomoIcon from '../icons/SdomoIcon'
import Sidebar from './Sidebar'

interface HeaderProps {
	className?: string;
	onToggleSidebar?: () => void;
	isSidebarOpen?: boolean;
}

const Header: FC<HeaderProps> = ({ className, onToggleSidebar, isSidebarOpen }) => {
	const [mobMenu, setMobMenu] = useState(false)
	const { publicKey } = useWallet()

	// Placeholder balances - these will come from your backend later
	const ssolBalance = "0.00"
	const sdomoBalance = "0.00"

	return (
		<header className={`left-0 fixed right-0 z-20 ${className}`}>
			{/* Absolute positioned toggle button */}
			{publicKey && (
				<button 
					onClick={onToggleSidebar}
					className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 text-white z-50"
				>
					<FaBars className="w-5 h-5" />
				</button>
			)}

			<div className={`${styles.container} px-4 h-16 flex items-center justify-between`}>
				{/* Center section - Navigation and Balances */}
				<div className="hidden md:flex items-center gap-8">
					{/* Show NavigationMenu only when wallet is NOT connected */}
					{!publicKey && <NavigationMenu />}
					
					{/* Token Balances - only show when wallet is connected */}
					{publicKey && (
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
					)}
				</div>

				{/* Right Section - Wallet and User Controls */}
				<div className="flex items-center gap-4 ml-auto">
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
			{publicKey && <Sidebar isOpen={isSidebarOpen} />}
		</header>
	)
}

export default Header
