// src/services/walletConnect.ts
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection, clusterApiUrl } from '@solana/web3.js';

// Define Solana network (e.g., devnet, mainnet)
const network = 'devnet';  // Change this to 'mainnet-beta' for mainnet

// Create a Phantom wallet adapter
export const createPhantomWalletAdapter = () => {
  return new PhantomWalletAdapter();
};

// Create a connection to the Solana blockchain
export const createConnection = () => {
  const endpoint = clusterApiUrl(network);  // Using devnet for testing
  return new Connection(endpoint, 'confirmed');
};
