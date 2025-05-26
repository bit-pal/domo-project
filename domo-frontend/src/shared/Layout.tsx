import React, { useEffect, useState } from 'react'
import Home from '../pages/Home' // компонент страницы
import Preloader from './components/Preloader' // компонент прелоадера

function Layout() {
	const [loading, setLoading] = useState(true) // отвечает за видимость прелоадера
	const [minTimePassed, setMinTimePassed] = useState(false) // минимальное время в 7 секунд
	const [pageLoaded, setPageLoaded] = useState(false) // состояние загрузки страницы Home

	// Таймер на 7 секунд для минимального времени отображения прелоадера
	useEffect(() => {
		const timer = setTimeout(() => {
			setMinTimePassed(true) // через 7 секунд устанавливаем минимальное время
		}, 3000)

		return () => clearTimeout(timer) // очищаем таймер при размонтировании
	}, [])

	// Функция, которая вызовется при полной загрузке страницы Home
	const handlePageLoaded = () => {
		setPageLoaded(true) // меняем состояние на true, когда Home загружена
	}

	// Прелоадер скрывается, когда и 7 секунд прошло, и страница полностью загружена
	const showContent = minTimePassed && pageLoaded

	return (
		<div className='overflow-x-hidden text-maroon'>
			{!showContent && <Preloader />}{' '}
			{/* Показываем прелоадер до полной загрузки */}
			<Home onLoad={handlePageLoaded} />{' '}
			{/* Передаем метод для отслеживания загрузки страницы */}
		</div>
	)
}

export default Layout
