import React, { useState, useEffect } from 'react';
import { UserIcon, PlusIcon } from '@heroicons/react/24/solid';
import AddProfessionModal from '../../../components/modals/AddProfessionModal';
import LevelUpModal from '../../../components/modals/LevelUpModal';
import AddEmployeeModal from '../../../components/modals/AddEmployeeModal';
import { useEmployee } from '../../../hooks/useEmployee';
import { useBoss } from '../../../hooks/useBoss';
import { PROFESSIONS } from '../../../constants/game';

interface Employee {
  id: string;
  name: string;
  level: number;
  profession_id: number;
  tools: string[];
}

const EmployeeSlots: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddProfessionModalOpen, setIsAddProfessionModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [maxSlots, setMaxSlots] = useState(4); // This should come from base level

  const { isLoading: isEmployeeLoading, retrainEmployee, upgradeEmployeeLevel, addEmployee } = useEmployee();
  const { isLoading: isBossLoading, fetchEmployees } = useBoss();

  const isLoading = isEmployeeLoading || isBossLoading;

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const employeeList = await fetchEmployees();
    if (employeeList) {
      setEmployees(employeeList);
    }
  };

  const handleAddEmployee = async (name: string, professionId?: number) => {
    const employee = await addEmployee(name, professionId);
    if (employee) {
      await loadEmployees();
      setIsAddModalOpen(false);
    }
  };

  const handleAddProfession = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddProfessionModalOpen(true);
  };

  const handleLevelUp = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsLevelUpModalOpen(true);
  };

  const handleConfirmProfessionAdd = async () => {
    if (selectedEmployee) {
      const success = await retrainEmployee(selectedEmployee.id, selectedEmployee.profession_id);
      if (success) {
        await loadEmployees();
      }
    }
    setIsAddProfessionModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleConfirmLevelUp = async () => {
    if (selectedEmployee) {
      const success = await upgradeEmployeeLevel(selectedEmployee.id);
      if (success) {
        await loadEmployees();
      }
    }
    setIsLevelUpModalOpen(false);
    setSelectedEmployee(null);
  };

  const renderEmployee = (employee: Employee) => {
    const profession = PROFESSIONS.find(p => p.id === employee.profession_id);
    return (
      <div key={employee.id} className="bg-[#151835] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <UserIcon className="w-12 h-12 text-purple-400 mr-3" />
            <div>
              <h3 className="text-gray-300 font-medium">{employee.name}</h3>
              <div className="text-gray-400">
                ID: {employee.id}
              </div>
              <div className="text-blue-400 text-sm mt-1">
                {profession?.name || 'No Profession'}
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
            onClick={() => handleAddProfession(employee)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
          >
            Add Profession
          </button>
          <button
            onClick={() => handleLevelUp(employee)}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded transition-colors"
          >
            Level Up
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-300 mb-2">Tools: {employee.tools?.length || 0}</p>
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div 
              className="h-full bg-emerald-400 rounded-full" 
              style={{ width: `${((employee.tools?.length || 0) / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const renderEmptySlot = (index: number) => (
    <div 
      key={`empty-${index}`} 
      className="bg-[#151835] rounded-lg p-4 opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
      onClick={() => setIsAddModalOpen(true)}
    >
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
          <PlusIcon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-gray-400">Add Employee</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-[#0F1123] rounded-lg p-6">
        <h2 className="text-xl text-gray-300 mb-4">Employee Slots</h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-4">
            {Array.from({ length: maxSlots }).map((_, index) => {
              const employee = employees[index];
              return employee ? renderEmployee(employee) : renderEmptySlot(index);
            })}
          </div>
        )}
      </div>

      {selectedEmployee && (
        <>
          <AddProfessionModal
            isOpen={isAddProfessionModalOpen}
            onClose={() => setIsAddProfessionModalOpen(false)}
            currentProfessionId={selectedEmployee.profession_id}
            professions={PROFESSIONS}
            cost={100}
            cooldownHours={24}
            onConfirm={handleConfirmProfessionAdd}
          />

          <LevelUpModal
            isOpen={isLevelUpModalOpen}
            onClose={() => setIsLevelUpModalOpen(false)}
            currentLevel={selectedEmployee.level}
            progress={0.5} // This should come from the employee data
            cost={50} // Example cost
            onConfirm={handleConfirmLevelUp}
          />
        </>
      )}

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddEmployee}
        cost={100} // This should come from your configuration or API
      />
    </>
  );
};

export default EmployeeSlots; 