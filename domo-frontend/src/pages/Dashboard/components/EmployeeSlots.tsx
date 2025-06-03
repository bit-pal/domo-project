import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import ChangeProfessionModal from '../../../components/modals/ChangeProfessionModal';
import LevelUpModal from '../../../components/modals/LevelUpModal';

interface Employee {
  id: number;
  type: 'Miner' | 'Streamer';
  earnings?: number;
  isLocked?: boolean;
  level?: number;
  progress?: number;
}

const EmployeeSlots: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isChangeProfessionModalOpen, setIsChangeProfessionModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const employees: Employee[] = [
    { id: 1, type: 'Miner', earnings: 0.18, level: 1, progress: 0.65 },
    { id: 2, type: 'Streamer', earnings: 1.4, level: 2, progress: 0.3 },
    { id: 3, type: 'Miner', earnings: 1.2, level: 1, progress: 0.45 },
    { id: 4, type: 'Miner', isLocked: true },
  ];

  const handleChangeProfession = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsChangeProfessionModalOpen(true);
  };

  const handleLevelUp = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsLevelUpModalOpen(true);
  };

  const handleConfirmProfessionChange = () => {
    // Handle profession change logic here
    setIsChangeProfessionModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleConfirmLevelUp = () => {
    // Handle level up logic here
    setIsLevelUpModalOpen(false);
    setSelectedEmployee(null);
  };

  const formatTokenAmount = (amount: number) => {
    return (
      <>
        <span className="text-gray-300">{amount} </span>
        <span className="text-blue-400">$DOMO</span>
      </>
    );
  };

  const renderEmployee = (employee: Employee) => {
    if (employee.isLocked) {
      return (
        <div key={employee.id} className="bg-[#151835] rounded-lg p-4 opacity-50">
          <div className="flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-gray-400" />
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-400">Increase base level to unlock</p>
          </div>
        </div>
      );
    }

    return (
      <div key={employee.id} className="bg-[#151835] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserIcon className="w-12 h-12 text-purple-400 mr-3" />
            <div>
              <h3 className="text-gray-300 font-medium">{employee.type}</h3>
              <div className="text-gray-400">
                {formatTokenAmount(employee.earnings || 0)}/hr
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">Level</span>
              <span className="text-blue-400 font-medium">{employee.level}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <button
            onClick={() => handleChangeProfession(employee)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
          >
            Change Profession
          </button>
          <button
            onClick={() => handleLevelUp(employee)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded transition-colors"
          >
            Level Up
          </button>
        </div>
        {employee.type === 'Miner' && (
          <div className="mt-4">
            <p className="text-gray-300 mb-2">Stability bar</p>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="w-2/3 h-full bg-emerald-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#0F1123] rounded-lg p-6">
        <h2 className="text-xl text-gray-300 mb-4">Employee Slots</h2>
        <div className="grid gap-4">
          {employees.map(employee => renderEmployee(employee))}
        </div>
      </div>

      {selectedEmployee && (
        <>
          <ChangeProfessionModal
            isOpen={isChangeProfessionModalOpen}
            onClose={() => setIsChangeProfessionModalOpen(false)}
            employeeType={selectedEmployee.type}
            cost={100} // Example cost
            cooldownHours={24} // Example cooldown
            onConfirm={handleConfirmProfessionChange}
          />

          <LevelUpModal
            isOpen={isLevelUpModalOpen}
            onClose={() => setIsLevelUpModalOpen(false)}
            currentLevel={selectedEmployee.level || 1}
            progress={selectedEmployee.progress || 0}
            cost={50} // Example cost
            onConfirm={handleConfirmLevelUp}
          />
        </>
      )}
    </>
  );
};

export default EmployeeSlots; 