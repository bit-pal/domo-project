import React from 'react'
import PreloaderGif from '../../assets/gif/Domokun_Ninja_Anim.gif'

const Preloader = () => {
	return (
		<div className='bg-maroon w-full h-screen z-[99999] fixed flex items-center justify-center'>
			<img
				className='xs:max-w-[50%] md:max-w-[30%] w-full'
				src={PreloaderGif}
				alt='preloader'
			/>
		</div>
	)
}

export default Preloader
