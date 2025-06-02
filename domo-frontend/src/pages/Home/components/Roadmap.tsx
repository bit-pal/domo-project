import React from 'react'
import { styles } from '../../../styles/styles'
import MessageIcon from '../../../components/icons/MessageIcon'
import RockGif from '../../../assets/gif/Domokun_Rock_Anim.gif'
import Button from '../../../components/ui/Button'
import StepOneIcon from '../../../components/icons/StepOneIcon'
import BorderIcon from '../../../components/icons/BorderIcon'
import StepTwoIcon from '../../../components/icons/StepTwoIcon'
import StepThreeIcon from '../../../components/icons/StepThreeIcon'

const roadmapData = [
	{
		id: 1,
		icon: <StepOneIcon />,
		title: 'Step 1: Immersion',
		text: 'It’s time for Domo-SOL to conquer the Solana blockchain, with lightning-fast transactions, ultra-low fees, and top-tier performance. This playground is his to rule!',
	},
	{
		id: 2,
		icon: <StepTwoIcon />,
		title: 'Step 2: Fair Launch',
		text: 'No presales, no waiting—Domo-SOL dives straight into the action! The fair launch is here, bringing everyone an equal chance to join the meme revolution.',
	},
	{
		id: 3,
		icon: <StepThreeIcon />,
		title: 'Step 3: Meme Domination',
		text: 'With Domo-SOL unleashed, the focus shifts to building a vibrant community and spreading meme magic across the Solana ecosystem. Get ready for viral moments and unstoppable growth!',
	},
]

const Roadmap = () => {
	return (
		<div id='roadmap' className=' xs:py-12 overflow-hidden md:py-20  bg-dark'>
			<div
				className={`${styles.container} relative gap-y-10 xs:flex-col lg:flex-row flex items-stretch justify-between`}
			>
				<div className='xs:max-w-full lg:max-w-[35rem] w-full'>
					<h2
						data-aos='fade-right'
						className={`${styles.titleH2} mb-0.5 text-red`}
					>
						ROADMAP
					</h2>
					<div
						data-aos='zoom-in'
						className='xs:mt-5 lg:mt-0 relative flex justify-center'
					>
						<MessageIcon />
						<img
							className='w-full lg:ml-40 max-w-96'
							src={RockGif}
							alt='rock gif'
						/>
					</div>
					<Button
						callback={() => null}
						variant='secondary'
						customStyle='lg:absolute bottom-0 left-0 xs:mt-5 xs:w-full sm:w-auto lg:mt-0'
						text='START PLAYING'
						link={true}
						linkPath={'https://t.me/sol_domo_bot'}
					/>
				</div>
				<div className='flex-1 flex flex-col gap-5'>
					{roadmapData.map(item => (
						<div
							data-aos='flip-down'
							key={item.id}
							className='xs:flex-col sm:flex-row gap-y-10 flex items-center gap-4'
						>
							<div className='relative min-w-28 w-28'>
								<p className='leading-[4.75rem] text-[4rem] text-white'>
									{item.id}
								</p>
								<div className='absolute top-1 -right-1'>{item.icon}</div>
							</div>
							<div
								className={`px-6 py-3 w-full relative box-border ${
									item.id === 1 ? 'max-w-[37.3125rem] ' : 'max-w-[28.375rem]'
								}`}
							>
								<BorderIcon />
								<div className='relative z-10'>
									<h3 className='text-[1.5625rem] '>{item.title}</h3>
									<p className='text-base leading-5'>{item.text}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Roadmap
