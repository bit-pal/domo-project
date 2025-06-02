import React, { FC, useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import About from './components/About'
import Tokenomics from './components/Tokenomics'
import Roadmap from './components/Roadmap'
import Docs from './components/Docs'
import Aos from 'aos'
import 'aos/dist/aos.css'
import MainBlock from './components/MainBlock'
import Dashboard from '../Dashboard'

interface HomeProps {
	onLoad: () => void // ожидаем функцию onLoad
}

const Home: FC<HomeProps> = ({ onLoad }) => {
	const [hasScrolled, setHasScrolled] = useState(false)
	const { publicKey } = useWallet()

	const handleScroll = () => {
		if (window.scrollY > 0) {
			setHasScrolled(true)
		} else {
			setHasScrolled(false)
		}
	}

	// Проверяем загрузку всех изображений на странице
	const checkImagesLoaded = () => {
		const images = document.querySelectorAll('img') // находим все изображения на странице
		let loadedImages = 0

		images.forEach(img => {
			// Создаем новый объект Image для каждого изображения
			const image = new Image()
			image.src = img.src

			// Проверяем, загружено ли изображение
			if (image.complete) {
				loadedImages += 1 // если изображение уже загружено
			} else {
				// Если изображение не загружено, добавляем обработчик onload
				image.onload = () => {
					loadedImages += 1
					// Когда все изображения загружены, вызываем onLoad
					if (loadedImages === images.length) {
						onLoad()
					}
				}
			}
		})

		// Если все изображения уже загружены (например, закэшированы)
		if (loadedImages === images.length) {
			onLoad()
		}
	}

	useEffect(() => {
		// Когда компонент смонтировался, проверяем загрузку изображений
		checkImagesLoaded()
	}, [onLoad])

	useEffect(() => {
		handleScroll()

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		Aos.init({
			duration: 1000,
			once: true,
			startEvent: 'DOMContentLoaded',
			initClassName: 'aos-init',
			animatedClassName: 'aos-animate',
		})
	}, [])

	if (publicKey) {
		return <Dashboard />
	}

	return (
		<div>
			<main>
				<MainBlock />
				<About />
				<Docs />
				<Tokenomics />
				<Roadmap />
			</main>
		</div>
	)
}

export default Home
