import React, { FC, useState } from 'react'
import { styles } from '../../styles/styles'
import NavigationMenu from '../ui/NavigationMenu'
import Button from '../ui/Button'
import CLoseIcon from '../icons/CLoseIcon'
import BurgerIcon from '../icons/BurgerIcon'
import MobileMenu from '../ui/MobileMenu'
import WalletButton from '../auth/WalletButton'
import { useWallet } from '@solana/wallet-adapter-react'
import { FaUser, FaCog, FaBell, FaBars, FaPlus } from 'react-icons/fa'
import SsolIcon from '../icons/SsolIcon'
import SdomoIcon from '../icons/SdomoIcon'
import Sidebar from './Sidebar'
import NotificationsDropdown from '../ui/NotificationsDropdown'
import SettingsDropdown from '../ui/SettingsDropdown'
import UserAvatar from '../ui/UserAvatar'
import { useBalance } from '../../hooks/useBalance'
import DepositModal from '../modals/DepositModal'

interface HeaderProps {
	className?: string;
	onToggleSidebar?: () => void;
	isSidebarOpen?: boolean;
}

const Header: FC<HeaderProps> = ({ className, onToggleSidebar, isSidebarOpen }) => {
	const [mobMenu, setMobMenu] = useState(false)
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const [isUserAvatarOpen, setIsUserAvatarOpen] = useState(false)
	const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
	const { publicKey } = useWallet()
	const { ssolBalance, sdomoBalance, isLoading, refetch } = useBalance()

	const closeAllDropdowns = () => {
		setIsNotificationsOpen(false);
		setIsSettingsOpen(false);
		setIsUserAvatarOpen(false);
	};

	const handleCloseDepositModal = () => {
		setIsDepositModalOpen(false);
	};

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
								<span className={`font-medium text-white ${isLoading ? 'opacity-50' : ''}`}>
									{ssolBalance} SSOL
								</span>
							</div>

							{/* SDOMO Balance */}
							<div className="flex items-center gap-2">
								<SdomoIcon className="w-6 h-6 text-purple-400" />
								<span className={`font-medium text-white ${isLoading ? 'opacity-50' : ''}`}>
									{sdomoBalance} SDOMO
								</span>
								<button
									onClick={() => setIsDepositModalOpen(true)}
									className="p-1 hover:bg-white/10 rounded-full transition-colors"
								>
									<FaPlus className="w-3 h-3 text-green-400" />
								</button>
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
							<div className="relative">
								<button 
									className="p-2 hover:bg-white/10 rounded-full hidden md:flex"
									onClick={() => {
										setIsNotificationsOpen(!isNotificationsOpen);
										setIsSettingsOpen(false);
										setIsUserAvatarOpen(false);
									}}
								>
									<FaBell className="w-5 h-5 text-white" />
								</button>
								<NotificationsDropdown 
									isOpen={isNotificationsOpen}
									onClose={() => setIsNotificationsOpen(false)}
								/>
							</div>

							{/* Settings */}
							<div className="relative">
								<button 
									className="p-2 hover:bg-white/10 rounded-full hidden md:flex"
									onClick={() => {
										setIsSettingsOpen(!isSettingsOpen);
										setIsNotificationsOpen(false);
										setIsUserAvatarOpen(false);
									}}
								>
									<FaCog className="w-5 h-5 text-white" />
								</button>
								<SettingsDropdown 
									isOpen={isSettingsOpen}
									onClose={() => setIsSettingsOpen(false)}
								/>
							</div>

							{/* User Avatar */}
							<div className="relative">
								<button 
									className="p-2 hover:bg-white/10 rounded-full hidden md:flex"
									onClick={() => {
										setIsSettingsOpen(false);
										setIsNotificationsOpen(false);
										setIsUserAvatarOpen(!isUserAvatarOpen);
									}}
								>
									<FaUser className="w-4 h-4 text-white" />
								</button>
								<UserAvatar 
									publicKey={publicKey.toString()}
									isOpen={isUserAvatarOpen}
									onClose={() => setIsUserAvatarOpen(false)}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			{publicKey && <Sidebar isOpen={isSidebarOpen} />}

			{/* Click outside handler */}
			{(isNotificationsOpen || isSettingsOpen || isUserAvatarOpen) && (
				<div 
					className="fixed inset-0 z-40"
					onClick={closeAllDropdowns}
				/>
			)}

			{/* Deposit Modal */}
			<DepositModal
				isOpen={isDepositModalOpen}
				onClose={handleCloseDepositModal}
				onSuccess={refetch}
			/>
		</header>
	)
}

export default Header
