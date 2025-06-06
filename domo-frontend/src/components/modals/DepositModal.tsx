import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../ui/Modal';
import { toast } from 'react-hot-toast';
import { useBalance } from '../../hooks/useBalance';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const DepositModal: React.FC<DepositModalProps> = ({
    isOpen,
    onClose,
    onSuccess
}) => {
    const [amount, setAmount] = useState<string>('');
    const { depositDomo, isDepositing } = useBalance();

    const handleDeposit = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            toast.error('Please enter a valid amount');
            return;
        }

        const success = await depositDomo(Number(amount));
        if (success) {
            setAmount('');
            onSuccess?.();
            onClose();
        }
    };

    const handleClose = () => {
        setAmount('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Deposit SDOMO">
            <div className="space-y-6">
                <div className="flex items-center justify-center py-4">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-3">
                            <PlusIcon className="w-8 h-8 text-green-500" />
                        </div>
                        <div className="text-gray-400">
                            Enter amount to deposit
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-[#151835] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={isDepositing}
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                            SDOMO
                        </span>
                    </div>

                    <div className="bg-[#151835] rounded-lg p-4 text-sm text-gray-300">
                        <p>Make sure you have enough balance in your wallet.</p>
                        <p className="mt-2">Transaction fees will be applied.</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        disabled={isDepositing}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeposit}
                        disabled={isDepositing}
                        className={`px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ${
                            isDepositing ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isDepositing ? 'Depositing...' : 'Deposit'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DepositModal; 