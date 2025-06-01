import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC, useEffect, useState } from 'react';
import { AuthService } from '../../services/auth/auth.service';
import { toast } from 'react-hot-toast';

export const WalletButton: FC = () => {
    const walletContext = useWallet();
    const { publicKey, connecting, connected } = walletContext;
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const handleLogin = async () => {
            if (!publicKey || !connected || isLoggingIn) return;
            
            try {
                setIsLoggingIn(true);
                
                await AuthService.handleWalletLogin(
                    walletContext,
                );
                
                toast.success('Successfully logged in!');
            } catch (error) {
                console.error('Login error:', error);
                toast.error('Failed to login. Please try again.');
                AuthService.clearStoredToken();
            } finally {
                setIsLoggingIn(false);
            }
        };

        handleLogin();
    }, [walletContext, publicKey, connected]);

    return (
        <div className="wallet-button-container flex items-center gap-4">
            <WalletMultiButton 
                className={`bg-green border-green hover:border-green hover:text-green hover:bg-transparent text-maroon ${
                    isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''
                }`} 
                disabled={isLoggingIn}
            />
            {isLoggingIn && (
                <div className="text-sm text-white">
                    Logging in...
                </div>
            )}
        </div>
    );
};

export default WalletButton;
