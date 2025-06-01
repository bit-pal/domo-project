import React from 'react'
import Marquee from 'react-fast-marquee'

const Marquees = () => {
	return (
		<div
			data-aos='zoom-in'
			data-aos-offset='0'
			className='w-full bg-green py-4'
		>
			<Marquee gradient={false} speed={50}>
				{[
					1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
					21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
					38, 39, 40,
				].map(item => (
					<p key={item} className='text-maroon mx-3'>
						$DOMO
					</p>
				))}
			</Marquee>
		</div>
	)
}

export default Marquees
