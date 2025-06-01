import { WalletContextState } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface NonceResponse {
  msg: {
    nonce: string;
  };
}

interface LoginResponse {
  jwt: string;
  expiresAt: number;
}

export class AuthService {
  static async getNonce(wallet: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/auth/nonce`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet }),
      });

      if (!response.ok) {
        throw new Error('Failed to get nonce');
      }

      const data: NonceResponse = await response.json();
      return data.msg.nonce;
    } catch (error) {
      console.error('Error getting nonce:', error);
      throw error;
    }
  }

  static async signMessage(wallet: WalletContextState, message: string): Promise<string> {
    if (!wallet.signMessage) {
      throw new Error('Wallet does not support message signing');
    }

    try {
      // Convert message to bytes
      const messageBytes = new TextEncoder().encode(message);
      
      // Sign the message directly - no need for special formatting
      // The wallet adapter will handle the proper formatting
      const signature = await wallet.signMessage(messageBytes);
      
      // Convert signature to base58
      return bs58.encode(signature);
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }

  static async login(wallet: string, signature: string, nonce: string): Promise<LoginResponse> {
    try {
      console.log('Sending login request with:', { wallet, signature, nonce });
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet, signature, nonce }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error response:', errorData);
        throw new Error(errorData.error || 'Invalid signature verify');
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (!data.msg?.jwt) {
        throw new Error('No JWT token in response');
      }

      return {
        jwt: data.msg.jwt,
        expiresAt: data.msg.expires_at
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }

  static async handleWalletLogin(wallet: WalletContextState): Promise<string> {
    try {
      // 1. Get the public key
      const publicKey = wallet.publicKey?.toBase58();
      if (!publicKey) {
        throw new Error('No public key available');
      }

      // 2. Get nonce and sign it
      const nonce = await this.getNonce(publicKey);

      const signature = await this.signMessage(wallet, nonce);

      // 3. Login with the signature
      const { jwt } = await this.login(publicKey, nonce, signature);

      // Store JWT
      localStorage.setItem('jwt', jwt);
      return jwt;
    } catch (error) {
      console.error('Error during wallet login:', error);
      throw error;
    }
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  static clearStoredToken(): void {
    localStorage.removeItem('jwt_token');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
} 