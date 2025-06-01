import React from 'react'
import { styles } from '../../styles/styles'
import Button from '../../components/ui/Button'
import gif1 from '../../assets/gif/Domokun_Angel_Anim_3.gif'
import gif2 from '../../assets/gif/Domokun_Angry_Anim.gif'

const About = () => {
	return (
		<section
			id='about'
			className='bg-yellow relative overflow-hidden xs:pt-20 xs:pb-32 md:py-[10.625rem]'
		>
			<img
				className='absolute left-0 bottom-5 xs:w-[40%] xsm:w-[38%] md:w-[30%]'
				src={gif1}
				alt='gif1'
			/>
			<img
				className='absolute right-0 bottom-0 xs:w-[42%] xsm:w-[40%] md:w-[32.5%]'
				src={gif2}
				alt='gif2'
			/>

			<div
				className={`${styles.container} flex flex-col gap-y-6 items-center justify-center relative xs:-top-10 md:top-0 z-10`}
			>
				<h2 data-aos='fade-left' className={`${styles.titleH2} text-red`}>
					DOMO
				</h2>
				<p
					data-aos='fade-right'
					className='text-center xs:text-3xl md:text-[2.25rem] leading-10 text-maroon w-full max-w-[40rem]'
				>
					Available for purchase on DEXs
				</p>
				<p
					data-aos='fade-right'
					className='text-center xs:text-3xl md:text-[2.25rem] leading-10 text-maroon w-full max-w-[40rem]'
				>
					Don't miss your chance for sweet profits{' '}
				</p>
				<Button
					text='buy here'
					variant='maroon'
					callback={() => {}}
					link={true}
					linkPath='https://raydium.io/swap/?outputCurrency=2CfHy8S118K4RPg9ti2bWFc19tFg48qTmJSvqqbhpump&inputMint=sol&outputMint=2CfHy8S118K4RPg9ti2bWFc19tFg48qTmJSvqqbhpump'
				/>
			</div>
		</section>
	)
}

export default About
