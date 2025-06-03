import React from 'react';
import Modal from '../ui/Modal';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';

interface ClaimSafeModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => void;
}

const ClaimSafeModal: React.FC<ClaimSafeModalProps> = ({
  isOpen,
  onClose,
  amount,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Claim Safe Rewards">
      <div className="space-y-6">
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-3">
              <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-2xl font-medium text-white">
              {amount} $DOMO
            </div>
            <div className="text-gray-400 mt-1">
              Available to claim
            </div>
          </div>
        </div>

        <div className="bg-[#151835] rounded-lg p-4 text-sm text-gray-300">
          <p>Claiming will transfer the rewards to your wallet.</p>
          <p className="mt-2">Make sure you have enough SOL to cover the transaction fee.</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Claim Rewards
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimSafeModal; 