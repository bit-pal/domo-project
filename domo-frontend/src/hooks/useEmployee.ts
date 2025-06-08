import { useState } from 'react';
import { EmployeeService } from '../services/employee/employee.service';
import { toast } from 'react-hot-toast';

export const useEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addEmployee = async (name: string, profession_id?: number) => {
        try {
            setIsLoading(true);
            const employee = await EmployeeService.add({ name, profession_id });
            toast.success('Successfully added new employee');
            return employee;
        } catch (error) {
            console.error('Error adding employee:', error);
            toast.error('Failed to add employee');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const setEmployeeTools = async (employee_id: string, tool_id: number) => {
        try {
            setIsLoading(true);
            const success = await EmployeeService.setTools({ employee_id, tool_id });
            if (success) {
                return true;
            }
            toast.error('Failed to set employee tool');
            return false;
        } catch (error) {
            console.error('Error setting employee tools:', error);
            toast.error('Failed to set employee tool');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const retrainEmployee = async (employee_id: string, new_profession: number) => {
        try {
            setIsLoading(true);
            const success = await EmployeeService.retraining({ employee_id, new_profession });
            if (success) {
                toast.success('Successfully retrained employee');
                return true;
            }
            toast.error('Failed to retrain employee');
            return false;
        } catch (error) {
            console.error('Error retraining employee:', error);
            toast.error('Failed to retrain employee');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const upgradeEmployeeLevel = async (employee_id: string) => {
        try {
            setIsLoading(true);
            await EmployeeService.upgradeLevel(employee_id);
            toast.success('Successfully upgraded employee level');
            return true;
        } catch (error) {
            console.error('Error upgrading employee level:', error);
            toast.error('Failed to upgrade employee level');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        addEmployee,
        setEmployeeTools,
        retrainEmployee,
        upgradeEmployeeLevel
    };
}; 