import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Preloader from './components/common/Preloader'

function Layout() {
	const [loading, setLoading] = useState(true)
	const [minTimePassed, setMinTimePassed] = useState(false)
	const [pageLoaded, setPageLoaded] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setMinTimePassed(true)
		}, 3000)

		return () => clearTimeout(timer)
	}, [])

	const handlePageLoaded = () => {
		setPageLoaded(true)
	}

	const showContent = minTimePassed && pageLoaded

	return (
		<div className='overflow-x-hidden text-maroon'>
			{!showContent && <Preloader />}
			<Home onLoad={handlePageLoaded} />
		</div>
	)
}

export default Layout
