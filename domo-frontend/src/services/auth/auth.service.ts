import { WalletContextState } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

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
      const response = await api.post<NonceResponse>('/auth/nonce', { wallet });
      return response.data.msg.nonce;
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
      
      const response = await api.post<{ msg: LoginResponse }>('/auth/login', {
        wallet,
        signature,
        nonce,
      });

      if (!response.data.msg?.jwt) {
        throw new Error('No JWT token in response');
      }

      return {
        jwt: response.data.msg.jwt,
        expiresAt: response.data.msg.expiresAt,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login error response:', error.response.data);
        throw new Error(error.response.data.error || 'Invalid signature verify');
      }
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