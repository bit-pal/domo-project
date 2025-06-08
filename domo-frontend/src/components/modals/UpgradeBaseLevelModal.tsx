import React from 'react';
import Modal from '../ui/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface UpgradeBaseLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBaseLevel: number;
  cost: number;
  onConfirm: () => void;
}

const UpgradeBaseLevelModal: React.FC<UpgradeBaseLevelModalProps> = ({
  isOpen,
  onClose,
  currentBaseLevel,
  cost,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade Base Level">
      <div className="space-y-4">
        <div className="text-gray-300">
          <p>Current base level: <span className="text-white font-medium">{currentBaseLevel}</span></p>
          <p>New base level: <span className="text-white font-medium">{currentBaseLevel + 1}</span></p>
          <p className="mt-4">Cost to upgrade: <span className="text-white font-medium">{cost} $DOMO</span></p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div className="text-yellow-500 text-sm">
              <p>Upgrading base level will increase the maximum level for all employees.</p>
              <p className="mt-1">This action cannot be undone.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Confirm Upgrade
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeBaseLevelModal; 