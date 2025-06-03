import React from 'react';
import Modal from '../ui/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface ChangeProfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeType: string;
  cost: number;
  cooldownHours: number;
  onConfirm: () => void;
}

const ChangeProfessionModal: React.FC<ChangeProfessionModalProps> = ({
  isOpen,
  onClose,
  employeeType,
  cost,
  cooldownHours,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Profession">
      <div className="space-y-4">
        <div className="text-gray-300">
          <p>Current profession: <span className="text-white font-medium">{employeeType}</span></p>
          <p className="mt-2">Cost to change: <span className="text-white font-medium">{cost} $DOMO</span></p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div className="text-yellow-500 text-sm">
              <p>Changing profession will put this employee on a {cooldownHours}-hour cooldown.</p>
              <p className="mt-1">During cooldown, the employee will not generate any income.</p>
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
            Confirm Change
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeProfessionModal; 