import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { FC } from 'react';

export const WalletButton: FC = () => {
    const { wallet } = useWallet();

    return (
        <div className="wallet-button-container flex flex-col items-end gap-2">
            <WalletMultiButton className="!bg-maroon hover:!bg-maroon/80 transition-all" />
            {wallet && (
                <div className="wallet-name text-sm text-maroon bg-white/80 px-3 py-1 rounded-lg">
                    Connected to {wallet.adapter.name}
                </div>
            )}
        </div>
    );
};

export default WalletButton;
