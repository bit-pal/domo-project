import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';

export const WalletButton: FC = () => {
    const { wallet } = useWallet();

    return (
        <div className="wallet-button-container flex items-center gap-4">
            <WalletMultiButton className="bg-green border-green hover:border-green hover:text-green hover:bg-transparent  text-maroon" />
        </div>
    );
};

export default WalletButton;
