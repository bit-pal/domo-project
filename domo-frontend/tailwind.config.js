/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				dark: '#161616',
				green: '#B1EB33',
				red: '#EB544D',
				maroon: '#4C1615',
				gray: '#C3C3C3',
				yellow: '#F3C932',
			},
			fontFamily: {
				norwester: ['Norwester', 'sans-serif'],
			},
		},
		screens: {
			xs: '320px',
			xsm: '500px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			lp: '1280px',
			xl: '1440px',
		},
	},
	plugins: [],
}
