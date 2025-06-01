import React, { FC } from 'react'
import { styles } from '../../styles/styles'

type ButtonTypes = 'button' | 'submit' | 'reset'

interface ButtonProps {
	type?: ButtonTypes
	callback: () => void
	customStyle?: string
	text: string
	variant: 'primary' | 'secondary' | 'maroon'
	link?: boolean
	linkPath?: string
}

const Button: FC<ButtonProps> = ({
	type,
	callback,
	customStyle,
	text,
	variant,
	link,
	linkPath,
}) => {
	return !link ? (
		<button
			data-aos='zoom-in'
			data-aos-offset='0'
			onClick={callback}
			type={type}
			className={`${styles.button} ${customStyle} ${
				variant === 'primary' &&
				'bg-red border-red hover:bg-transparent hover:text-red  text-marron'
			} ${
				variant === 'secondary' &&
				'bg-green border-green hover:border-green hover:text-green hover:bg-transparent  text-maroon'
			} ${
				variant === 'maroon' &&
				'bg-maroon border-maroon hover:border-maroon hover:text-maroon hover:bg-transparent  text-yellow'
			}`}
		>
			{text}
		</button>
	) : (
		<a
			href={linkPath}
			target='_blank'
			data-aos='zoom-in'
			data-aos-offset='0'
			onClick={callback}
			type={type}
			className={`${styles.button} ${customStyle} ${
				variant === 'primary' &&
				'bg-red border-red hover:bg-transparent hover:text-red  text-marron'
			} ${
				variant === 'secondary' &&
				'bg-green border-green hover:border-green hover:text-green hover:bg-transparent  text-maroon'
			} ${
				variant === 'maroon' &&
				'bg-maroon border-maroon hover:border-maroon hover:text-maroon hover:bg-transparent  text-yellow'
			}`}
		>
			{text}
		</a>
	)
}

export default Button
