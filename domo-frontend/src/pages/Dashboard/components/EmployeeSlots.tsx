import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid';

interface Employee {
  id: number;
  type: 'Miner' | 'Streamer';
  earnings?: number;
  isLocked?: boolean;
  level?: number;
}

const EmployeeSlots: React.FC = () => {
  const employees: Employee[] = [
    { id: 1, type: 'Miner', earnings: 0.18 },
    { id: 2, type: 'Streamer', earnings: 1.4 },
    { id: 3, type: 'Miner', earnings: 1.2 },
    { id: 4, type: 'Miner', isLocked: true },
  ];

  const renderEmployee = (employee: Employee) => {
    if (employee.isLocked) {
      return (
        <div key={employee.id} className="bg-[#151835] rounded-lg p-4 opacity-50">
          <div className="flex items-center justify-center">
            <UserIcon className="w-16 h-16 text-gray-400" />
          </div>
          <div className="text-center mt-4 text-gray-400">
            <p>Increase base level to unlock</p>
          </div>
        </div>
      );
    }

    return (
      <div key={employee.id} className="bg-[#151835] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserIcon className="w-12 h-12 text-purple-500 mr-3" />
            <div>
              <h3 className="text-white">{employee.type}</h3>
              <p className="text-gray-400">{employee.earnings} /hr</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors">
            Change Profession
          </button>
          <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors">
            Level Up
          </button>
        </div>
        {employee.type === 'Miner' && (
          <div className="mt-4">
            <p className="text-gray-400 mb-2">Stability bar</p>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="w-2/3 h-full bg-green-500 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#0F1123] rounded-lg p-6">
      <h2 className="text-xl text-gray-300 mb-4">Employee Slots</h2>
      <div className="grid gap-4">
        {employees.map(employee => renderEmployee(employee))}
      </div>
    </div>
  );
};

export default EmployeeSlots; 