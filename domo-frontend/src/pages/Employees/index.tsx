import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { UserIcon, StarIcon } from '@heroicons/react/24/solid';

interface EmployeeCard {
  id: number;
  name: string;
  role: string;
  level: number;
  earnings: number;
  status: 'active' | 'resting' | 'training';
}

const employees: EmployeeCard[] = [
  { id: 1, name: 'Miner #1', role: 'Miner', level: 3, earnings: 1.2, status: 'active' },
  { id: 2, name: 'Streamer #1', role: 'Streamer', level: 2, earnings: 0.8, status: 'active' },
  { id: 3, name: 'Miner #2', role: 'Miner', level: 1, earnings: 0.5, status: 'resting' },
  { id: 4, name: 'Streamer #2', role: 'Streamer', level: 4, earnings: 1.5, status: 'training' },
];

const EmployeesPage: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'resting': return 'text-yellow-500';
      case 'training': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <PageLayout 
      title="Employees" 
      subtitle="Manage your workforce and boost your earnings"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.map(employee => (
          <div key={employee.id} className="bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{employee.name}</h3>
                  <p className="text-sm text-gray-400">{employee.role}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-sm ${getStatusColor(employee.status)}`}>
                {employee.status}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Level</span>
                <div className="flex items-center">
                  <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-white">{employee.level}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Earnings/hr</span>
                <span className="text-white">{employee.earnings} $DOMO</span>
              </div>

              <div className="pt-4">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition-colors">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default EmployeesPage; 