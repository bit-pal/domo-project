import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { endpoint, wallets } from './config/wallet'
import { ConnectionProvider } from '@solana/wallet-adapter-react'
import { BrowserRouter } from 'react-router-dom'

// Default styles that can be overridden by your app
// require('@solana/wallet-adapter-react-ui/styles.css');

import '@solana/wallet-adapter-react-ui/styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					<Layout />
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
		</BrowserRouter>
	</React.StrictMode>
)