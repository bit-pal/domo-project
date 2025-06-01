import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	optimizeDeps: {
		include: [
			'@solana/web3.js',
			'@solana/wallet-adapter-react',
			'@solana/wallet-adapter-base',
			'@solana/wallet-adapter-wallets',
			'@solana/wallet-adapter-react-ui',
			'bs58',
			'react-icons/fa'
		]
	}
})
