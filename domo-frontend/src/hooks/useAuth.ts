import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AuthService } from '../services/auth/auth.service';

export const useAuth = () => {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check authentication status when component mounts
    setIsAuthenticated(AuthService.isAuthenticated());
  }, []);

  const logout = async () => {
    AuthService.clearStoredToken();
    setIsAuthenticated(false);
    await disconnect();
  };

  return {
    isAuthenticated,
    isLoading,
    logout,
    publicKey,
    connected,
    connecting,
  };
}; 