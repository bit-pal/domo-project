import Marquees from '../../../components/common/Marquees'
import { styles } from '../../../styles/styles'
import Button from '../../../components/ui/Button'
import DomocunCinemaGif from '../../../assets/gif/Domokun_Cinema_Anim.gif'

const MainBlock = () => {
	return (
		<div className='bg-maroon min-h-screen flex flex-col'>
			<div className='relative w-full flex-1 flex items-center overflow-hidden xs:py-20 md:py-0'>
				<img
					className='xs:hidden md:block absolute md:-bottom-[20%] lg:bottom-[auto] right-0 xs:w-5/6 md:w-3/4 z-0'
					src={DomocunCinemaGif}
					alt='cinema gif'
				/>

				<div className={`${styles.container} z-10`}>
					<div className='flex flex-col gap-y-9'>
						<img
							className='mt-10 md:hidden'
							src={DomocunCinemaGif}
							alt='cinema gif'
						/>

						<h1
							data-aos='fade-up'
							className={`${styles.titleH1} w-full max-w-[32.0625rem]`}
						>
							<span className='text-green'>DOMO</span> is an aggressive guy with
							a lot of potential in the SOLANA network
						</h1>
						<div className='flex items-center gap-x-3'>
							<Button
								callback={() => null}
								variant='secondary'
								text='START PLAYING'
								link={true}
								linkPath='https://t.me/sol_domo_bot'
							/>
						</div>
					</div>
				</div>
			</div>

			<Marquees />
		</div>
	)
}

export default MainBlock
