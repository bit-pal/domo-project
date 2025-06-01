import React, { FC, useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import About from './About'
import Tokenomics from './Tokenomics'
import Roadmap from './Roadmap'
import Docs from './Docs'
import Aos from 'aos'
import 'aos/dist/aos.css'
import MainBlock from './MainBlock'

interface HomeProps {
	onLoad: () => void // ожидаем функцию onLoad
}

const Home: FC<HomeProps> = ({ onLoad }) => {
	const [hasScrolled, setHasScrolled] = useState(false)

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

	return (
		<>
			<div>
				<Header
					className={
						hasScrolled ? 'bg-maroon shadow-lg py-5' : 'bg-transparent py-11'
					}
				/>
				<main>
					<MainBlock />
					<About />
					<Docs />
					<Tokenomics />
					<Roadmap />
				</main>
				<Footer />
			</div>
		</>
	)
}

export default Home
