import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/layout/PageLayout';
import { UserIcon, StarIcon, WrenchIcon, AcademicCapIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEmployee } from '../../hooks/useEmployee';
import { useBoss } from '../../hooks/useBoss';
import { toast } from 'react-hot-toast';
import AddEmployeeModal from '../../components/modals/AddEmployeeModal';
import LevelUpModal from '../../components/modals/LevelUpModal';
import ManageToolsModal from '../../components/modals/ManageToolsModal';
import AddProfessionModal from '../../components/modals/AddProfessionModal';
import { PROFESSIONS, TOOLS, type Profession, type Tool } from '../../constants/game';

interface Employee {
  id: string;
  name: string;
  level: number;
  profession_id: number;
  tools: string[];
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [isManageToolsModalOpen, setIsManageToolsModalOpen] = useState(false);
  const [isAddProfessionModalOpen, setIsAddProfessionModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { isLoading: isEmployeeLoading, setEmployeeTools, retrainEmployee, upgradeEmployeeLevel, addEmployee } = useEmployee();
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
      toast.success('Employee added successfully');
    }
  };

  const handleRetraining = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddProfessionModalOpen(true);
  };

  const handleUpgradeLevel = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsLevelUpModalOpen(true);
  };

  const handleConfirmLevelUp = async () => {
    if (selectedEmployee) {
      const success = await upgradeEmployeeLevel(selectedEmployee.id);
      if (success) {
        loadEmployees(); // Refresh the list
      }
    }
    setIsLevelUpModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleManageTools = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsManageToolsModalOpen(true);
  };

  const handleConfirmToolsChange = async (toolIds: number[]) => {
    if (!selectedEmployee) return;

    let success = true;
    // Set each tool one by one
    for (const toolId of toolIds) {
      const result = await setEmployeeTools(selectedEmployee.id, toolId);
      if (!result) {
        success = false;
        break;
      }
    }

    if (success) {
      await loadEmployees(); // Refresh the list
      toast.success('Tools updated successfully');
    } else {
      toast.error('Failed to update some tools');
    }
    
    setIsManageToolsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddProfession = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddProfessionModalOpen(true);
  };

  const handleConfirmProfessionAdd = async (newProfessionId: number) => {
    if (selectedEmployee) {
      const success = await retrainEmployee(selectedEmployee.id, newProfessionId);
      if (success) {
        await loadEmployees();
      }
    }
    setIsAddProfessionModalOpen(false);
    setSelectedEmployee(null);
  };

  const getStatusColor = (tools?: string[]) => {
    if (!tools || tools.length === 0) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatus = (tools?: string[]) => {
    if (!tools || tools.length === 0) return 'No Tools';
    return 'Working';
  };

  return (
    <PageLayout 
      title="Employees" 
      subtitle="Manage your workforce and boost your earnings"
    >
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Employee
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : !employees?.length ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No employees found. Add your first employee to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {employees.map(employee => {
            const profession = PROFESSIONS.find(p => p.id === employee.profession_id);
            return (
              <div key={employee.id} className="bg-[#151835] rounded-lg p-6 hover:bg-[#1a1f40] transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">{employee.name}</h3>
                      <p className="text-sm text-gray-400">ID: {employee.id}</p>
                      <p className="text-sm text-blue-400 mt-1">{profession?.name || 'No Profession'}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-sm ${getStatusColor(employee.tools)}`}>
                    {getStatus(employee.tools)}
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
                    <span className="text-gray-400">Tools</span>
                    <span className="text-white">{employee.tools?.length || 0}</span>
                  </div>

                  <div className="pt-4 space-y-2">
                    <button 
                      onClick={() => handleManageTools(employee)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 transition-colors flex items-center justify-center"
                    >
                      <WrenchIcon className="w-4 h-4 mr-2" />
                      Manage Tools
                    </button>
                    <button 
                      onClick={() => handleAddProfession(employee)}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2 transition-colors flex items-center justify-center"
                    >
                      <AcademicCapIcon className="w-4 h-4 mr-2" />
                      Add Profession
                    </button>
                    <button 
                      onClick={() => handleUpgradeLevel(employee)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 transition-colors"
                    >
                      Level Up
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AddEmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddEmployee}
        cost={100} // This should come from your configuration or API
      />

      {selectedEmployee && (
        <>
          <LevelUpModal
            isOpen={isLevelUpModalOpen}
            onClose={() => {
              setIsLevelUpModalOpen(false);
              setSelectedEmployee(null);
            }}
            currentLevel={selectedEmployee.level}
            progress={0.5} // This should come from the employee data
            cost={50} // Example cost
            onConfirm={handleConfirmLevelUp}
          />

          <ManageToolsModal
            isOpen={isManageToolsModalOpen}
            onClose={() => {
              setIsManageToolsModalOpen(false);
              setSelectedEmployee(null);
            }}
            employeeName={selectedEmployee.name}
            currentTools={(selectedEmployee.tools || []).map(Number)}
            availableTools={TOOLS}
            onConfirm={handleConfirmToolsChange}
          />

          <AddProfessionModal
            isOpen={isAddProfessionModalOpen}
            onClose={() => {
              setIsAddProfessionModalOpen(false);
              setSelectedEmployee(null);
            }}
            currentProfessionId={selectedEmployee.profession_id}
            professions={PROFESSIONS}
            cost={100}
            cooldownHours={24}
            onConfirm={handleConfirmProfessionAdd}
          />
        </>
      )}
    </PageLayout>
  );
};

export default EmployeesPage; 