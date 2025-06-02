import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useWallet } from '@solana/wallet-adapter-react'
import Home from './pages/Home'
import Preloader from './components/common/Preloader'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Employees from './pages/Employees'
import Tasks from './pages/Tasks'
import Store from './pages/Store'
import Marketplace from './pages/Marketplace'
import Storage from './pages/Storage'
import Upgrades from './pages/Upgrades'
import Referrals from './pages/Referrals'
import Leaderboard from './pages/Leaderboard'
import Blog from './pages/Blog'

function Layout() {
	const [loading, setLoading] = useState(true)
	const [minTimePassed, setMinTimePassed] = useState(false)
	const [pageLoaded, setPageLoaded] = useState(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)
	const { publicKey } = useWallet()

	useEffect(() => {
		const timer = setTimeout(() => {
			setMinTimePassed(true)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	const handlePageLoaded = () => {
		setPageLoaded(true)
	}

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const showContent = minTimePassed && pageLoaded

	return (
		<div className='overflow-x-hidden text-maroon'>
			{!showContent && <Preloader />}
			<Header 
				className='bg-[#1A1A1A] shadow-lg' 
				onToggleSidebar={toggleSidebar}
				isSidebarOpen={isSidebarOpen}
			/>
			<main className={`pt-16 ${publicKey ? 'md:pl-16' : ''}`}>
				<Routes>
					<Route path="/" element={<Home onLoad={handlePageLoaded} />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/tasks" element={<Tasks />} />
					<Route path="/store" element={<Store />} />
					<Route path="/marketplace" element={<Marketplace />} />
					<Route path="/storage" element={<Storage />} />
					<Route path="/upgrades" element={<Upgrades />} />
					<Route path="/referrals" element={<Referrals />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/blog" element={<Blog />} />
				</Routes>
			</main>
			{/* <Footer /> */}
		</div>
	)
}

export default Layout
