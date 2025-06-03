import React from 'react';
import Modal from '../ui/Modal';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: number;
  progress: number;
  cost: number;
  onConfirm: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  currentLevel,
  progress,
  cost,
  onConfirm
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Level Up Employee">
      <div className="space-y-6">
        <div className="text-gray-300">
          <div className="flex justify-between items-center">
            <span>Current Level</span>
            <span className="text-white font-medium">{currentLevel}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to next level</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-[#151835] rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Cost to level up</span>
            <span className="text-white font-medium">{cost} $DOMO</span>
          </div>
          
          <div className="mt-3 text-sm text-gray-400">
            Leveling up increases employee efficiency and earning potential
          </div>
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
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Level Up
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LevelUpModal; 