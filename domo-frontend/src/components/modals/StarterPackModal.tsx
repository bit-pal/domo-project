import React from 'react';
import Modal from '../ui/Modal';
import { GiftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface StarterPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  onConfirm: () => void;
}

const StarterPackModal: React.FC<StarterPackModalProps> = ({
  isOpen,
  onClose,
  price,
  onConfirm
}) => {
  const benefits = [
    'Get your first employee slot',
    'Receive initial $DOMO tokens',
    'Unlock base upgrades',
    'Access to marketplace features',
    'Join the DOMO community'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Purchase Starter Pack">
      <div className="space-y-6">
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-3">
              <GiftIcon className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-2xl font-medium text-white">
              {price} SOL
            </div>
            <div className="text-gray-400 mt-1">
              One-time purchase
            </div>
          </div>
        </div>

        <div className="bg-[#151835] rounded-lg p-4">
          <h4 className="text-white font-medium mb-3">Starter Pack Includes:</h4>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-400">
          Note: Make sure you have enough SOL in your wallet to cover both the pack price and transaction fees.
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
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            Purchase Pack
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StarterPackModal; 