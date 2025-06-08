import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { WrenchIcon } from '@heroicons/react/24/solid';

interface Tool {
  id: number;
  name: string;
  cost: number;
}

interface ManageToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  currentTools: number[];
  availableTools: Tool[];
  onConfirm: (toolIds: number[]) => void;
}

const ManageToolsModal: React.FC<ManageToolsModalProps> = ({
  isOpen,
  onClose,
  employeeName,
  currentTools = [],
  availableTools,
  onConfirm
}) => {
  const [selectedToolIds, setSelectedToolIds] = useState<number[]>(currentTools || []);

  const handleToolToggle = (toolId: number) => {
    if (selectedToolIds.includes(toolId)) {
      setSelectedToolIds(selectedToolIds.filter(id => id !== toolId));
    } else {
      if (selectedToolIds.length < 3) { // Maximum 3 tools per employee
        setSelectedToolIds([...selectedToolIds, toolId]);
      }
    }
  };

  const handleSubmit = () => {
    onConfirm(selectedToolIds);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage Employee Tools">
      <div className="space-y-6">
        <div className="flex items-center justify-center py-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-3">
              <WrenchIcon className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-xl font-medium text-white">
              {employeeName}
            </div>
            <div className="text-gray-400 mt-1">
              {selectedToolIds.length}/3 Tools Selected
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-300">Available Tools</div>
          <div className="grid grid-cols-2 gap-3">
            {availableTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => handleToolToggle(tool.id)}
                className={`p-3 rounded-lg border ${
                  selectedToolIds.includes(tool.id)
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                } transition-colors`}
              >
                {tool.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#151835] rounded-lg p-4">
          <div className="text-sm text-gray-300">
            <p>• Each employee can have up to 3 tools</p>
            <p>• Tools increase employee efficiency</p>
            <p>• Tools can be changed at any time</p>
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
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ManageToolsModal; 