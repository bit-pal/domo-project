import React from 'react'
import { styles } from '../../styles/styles'
import Button from '../../shared/ui/Button'
import PartyGif from '../../assets/gif/Domokun_Party_Anim.gif'

const Footer = () => {
	return (
		<footer
			id='contact'
			className='bg-yellow  overflow-hidden
			'
		>
			<div className='relative xs:py-12 xs:pb-16 md:py-[5.4375rem] md:pb-[5.4375rem]'>
				<div className='absolute flex items-end z-0 xs:right-0 lp:right-64 top-0 bottom-0 xs:w-[65%] lp:w-[50%]'>
					<img className='w-full' src={PartyGif} alt='party gif' />
				</div>

				<div
					className={`${styles.container} flex flex-col gap-y-6 relative z-10`}
				>
					<h2 data-aos='fade-left' className={`${styles.titleH2} text-maroon`}>
						SOCIALS
					</h2>
					<p data-aos='fade-left' className='text-2xl text-maroon font-normal'>
						Be part of the blockchain gaming revolution on the SOLANA platform,
						join the $DOMO Community now!
					</p>
					<p
						data-aos='fade-left'
						className='text-2xl leading-10 text-maroon font-normal'
					>
						Remember, your gaming skills can easily transform into real income!
					</p>
					<p
						data-aos='fade-left'
						className='text-2xl leading-10 text-maroon font-normal'
					>
						Start playing today to count your first money tomorrow!
					</p>
					<div className='flex items-center gap-x-4'>
						<Button
							text='X'
							customStyle='w-max text-green'
							variant='maroon'
							callback={() => {}}
							link={true}
							linkPath='https://x.com/sol_DOMO'
						/>
						<Button
							text='TG'
							customStyle='w-max text-green'
							variant='maroon'
							callback={() => {}}
							link={true}
							linkPath='https://t.me/sol_DOMO'
						/>
						<Button
							text='DEXS'
							customStyle='w-max text-green'
							variant='maroon'
							callback={() => {}}
							link={true}
							linkPath='https://dexscreener.com/solana/fdn2ldmvr96btvpbt8wqdmddwxpatlp3qkn6sq63miz'
						/>
						<Button
							text='DEXT'
							customStyle='w-max text-green'
							variant='maroon'
							callback={() => {}}
							link={true}
							linkPath='https://www.dextools.io/app/en/solana/pair-explorer/FDn2LDMVr96BTvpBT8wqdmDdWXPAtLp3qkn6Sq63miz?t=1731506729696'
						/>
					</div>
					<a className='text-2xl' href='mailto:contact@domokun.io'>
						contact@domokun.io
					</a>
					<Button
						text='Click to ape in'
						customStyle='w-max xs:mt-12 xsm:mt-20 md:mt-[12.6rem]'
						variant='primary'
						callback={() => {}}
						link={true}
						linkPath={'https://t.me/sol_domo_bot'}
					/>
				</div>
			</div>

			<div
				className={`${styles.container} relative z-10 flex flex-col gap-y-5 pb-10`}
			>
				<p
					data-aos='fade-right'
					data-aos-offset='0'
					className='text-xl text-center'
				>
					The content on this website is for informational purposes only and is
					not intended as financial advice. Cryptocurrency investments are
					subject to high market risks and volatility. Readers are advised to
					conduct their own research or consult with a professional financial
					advisor before making any investment decisions. domokun.io will not be
					liable for any financial losses incurred based on information
					presented here.
				</p>
				<p className='text-base text-center'>
					Copyright © 2024. All rights reserved.
				</p>
			</div>
		</footer>
	)
}

export default Footer
