import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { UserIcon } from '@heroicons/react/24/solid';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, professionId?: number) => void;
  cost: number;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  cost
}) => {
  const [name, setName] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(name, typeof selectedProfession === 'number' ? selectedProfession : undefined);
    setName('');
    setSelectedProfession('');
  };

  // This is a placeholder. In reality, you'd fetch this from your backend
  const professions = [
    { id: 1, name: 'Miner' },
    { id: 2, name: 'Streamer' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Employee Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#1a1f40] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter employee name"
                required
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-2">
                Profession (Optional)
              </label>
              <select
                id="profession"
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value ? Number(e.target.value) : '')}
                className="w-full bg-[#1a1f40] border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a profession</option>
                {professions.map(profession => (
                  <option key={profession.id} value={profession.id}>
                    {profession.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
          <p className="text-yellow-500 text-sm">
            Cost to add new employee: <span className="font-medium">{cost} $DOMO</span>
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            disabled={!name}
          >
            Add Employee
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEmployeeModal; 