import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { BalanceService } from '../services/balance/balance.service';
import { toast } from 'react-hot-toast';

export const useBalance = () => {
    const { publicKey, connected } = useWallet();
    const [ssolBalance, setSsolBalance] = useState<number>(0);
    const [sdomoBalance, setSdomoBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDepositing, setIsDepositing] = useState(false);

    const fetchBalances = useCallback(async () => {
        if (!publicKey || !connected) return;

        try {
            setIsLoading(true);
            const balance = await BalanceService.getUserBalance();
            setSsolBalance(balance.sol_balance);
            setSdomoBalance(balance.domo_balance);
        } catch (error) {
            console.error('Error fetching balances:', error);
            toast.error('Failed to fetch balances');
        } finally {
            setIsLoading(false);
        }
    }, [publicKey, connected]);

    const depositDomo = async (amount: number): Promise<boolean> => {
        if (!publicKey || !connected) {
            toast.error('Please connect your wallet first');
            return false;
        }

        try {
            setIsDepositing(true);
            const response = await BalanceService.depositDomo(amount);
            if (response.status) {
                toast.success(response.status || `Successfully deposited ${amount} SDOMO`);
                // Fetch updated balances
                await fetchBalances();
                return true;
            } else {
                toast.error(response.status || 'Failed to deposit DOMO');
                return false;
            }
        } catch (error) {
            console.error('Error depositing DOMO:', error);
            toast.error('Failed to deposit DOMO');
            return false;
        } finally {
            setIsDepositing(false);
        }
    };

    // Fetch balances when wallet connects
    useEffect(() => {
        fetchBalances();
    }, [fetchBalances]);

    // Refresh balances periodically when connected
    useEffect(() => {
        if (!connected) return;

        const intervalId = setInterval(fetchBalances, 10000); // Refresh every 10 seconds

        return () => clearInterval(intervalId);
    }, [connected, fetchBalances]);

    return {
        ssolBalance,
        sdomoBalance,
        isLoading,
        isDepositing,
        depositDomo,
        refetch: fetchBalances
    };
}; 