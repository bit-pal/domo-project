import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

interface Profession {
  id: number;
  name: string;
}

interface AddProfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfessionId: number;
  professions: Profession[];
  cost: number;
  cooldownHours: number;
  onConfirm: (newProfessionId: number) => void;
}

const AddProfessionModal: React.FC<AddProfessionModalProps> = ({
  isOpen,
  onClose,
  currentProfessionId,
  professions,
  cost,
  cooldownHours,
  onConfirm
}) => {
  const [selectedProfession, setSelectedProfession] = useState<number>(currentProfessionId);

  const handleSubmit = () => {
    onConfirm(selectedProfession);
  };

  const currentProfession = professions?.find(p => p.id === currentProfessionId);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Profession">
      <div className="space-y-4">
        <div className="text-gray-300">
          <p>Current profession: <span className="text-white font-medium">{currentProfession?.name || 'None'}</span></p>
          
          <div className="mt-4">
            <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-2">
              New Profession
            </label>
            <select
              id="profession"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(Number(e.target.value))}
              className="w-full bg-[#1a1f40] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {professions?.map(profession => (
                <option key={profession.id} value={profession.id}>
                  {profession.name}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-4">Cost to add: <span className="text-white font-medium">{cost} $DOMO</span></p>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
            <div className="text-yellow-500 text-sm">
              <p>Adding a new profession will put this employee on a {cooldownHours}-hour cooldown.</p>
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Add Profession
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddProfessionModal; 