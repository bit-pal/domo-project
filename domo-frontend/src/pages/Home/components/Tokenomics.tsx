import React from 'react'
import { styles } from '../../../styles/styles'
import TokenomicsIcon from '../../../components/icons/Tokenomics'
import Button from '../../../components/ui/Button'
import icon1 from '../../../assets/svg/icon1.svg'
import icon2 from '../../../assets/svg/icon2.svg'
import icon3 from '../../../assets/svg/icon3.svg'
import icon4 from '../../../assets/svg/icon4.svg'
import icon5 from '../../../assets/svg/icon5.svg'
import icon6 from '../../../assets/svg/icon6.svg'
import icon7 from '../../../assets/svg/icon7.svg'

const tokenomicIcons = [
	{
		id: 1,
		icon: icon1,
	},
	{
		id: 2,
		icon: icon2,
	},
	{
		id: 3,
		icon: icon3,
	},
	{
		id: 4,
		icon: icon4,
	},
	{
		id: 5,
		icon: icon5,
	},
	{
		id: 6,
		icon: icon6,
	},
	{
		id: 7,
		icon: icon7,
	},
]

const Tokenomics = () => {
	return (
		<div id='tokenomics' className='bg-maroon xs:py-12 md:py-[5.4375rem]'>
			<div className={`${styles.container} flex gap-x-14 flex-wrap gap-y-10`}>
				<div className='flex-1 flex flex-col gap-y-6'>
					<h2 data-aos='fade-left' className={`${styles.titleH2} text-green`}>
						TOKENOMICS
					</h2>
					<div
						data-aos='zoom-in'
						className='bg-yellow px-4 py-1 justify-center flex-wrap gap-1.5 flex '
					>
						{tokenomicIcons.map(item => (
							<img key={item.id} className='' src={item.icon} alt='icons' />
						))}
					</div>
					<p
						data-aos='fade-left'
						className='xs:text-3xl md:text-[2.25rem] leading-10 text-yellow font-normal'
					>
						Domokun watches his figure, however, he's so fond of catching a high
						from endless SOL crafting. That's why he's so full with a wide
						mouth. So you help the guy get full, play like it's your last time!
					</p>
					<Button
						text='buy domo'
						customStyle='w-max'
						variant='primary'
						callback={() => {}}
						link={true}
						linkPath='https://raydium.io/swap/?outputCurrency=2CfHy8S118K4RPg9ti2bWFc19tFg48qTmJSvqqbhpump&inputMint=sol&outputMint=2CfHy8S118K4RPg9ti2bWFc19tFg48qTmJSvqqbhpump'
					/>
				</div>
				<div className='flex-1 flex flex-col gap-y-4'>
					<div className='bg-yellow flex flex-col gap-y-2.5 px-4 py-3'>
						<h3
							data-aos='fade-left'
							className={` text-maroon text-[2rem] leading-10 font-normal text-center`}
						>
							TOTAL SUPPLY
						</h3>
						<p
							data-aos='fade-right'
							className='text-xl leading-6 text-maroon font-normal text-center'
						>
							1.000.000.000 $DOMO
						</p>
					</div>
					<div className='bg-yellow flex flex-col gap-y-2.5 px-4 py-3'>
						<h3
							data-aos='fade-left'
							className={` text-maroon text-[2rem] leading-10 font-normal text-center`}
						>
							TOKEN ADDRESS
						</h3>
						<p
							data-aos='fade-right'
							className='text-xl leading-6 text-maroon font-normal text-center break-all'
						>
							2CfHy8S118K4RPg9ti2bWFc19tFg48qTmJSvqqbhpump
						</p>
					</div>
					<div className='bg-yellow flex justify-between flex-wrap gap-5 px-4 py-3'>
						<p
							data-aos='fade-left'
							className='text-xl leading-6 text-maroon font-normal text-center'
						>
							FAIR LAUNCH ON PUMP.FUN - NO PRESALE, NO TAX AND LOCKED LIQUIDITY
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Tokenomics
