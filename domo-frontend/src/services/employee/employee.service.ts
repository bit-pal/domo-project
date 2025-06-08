import api from '../api';

interface Employee {
    id: string;
    name: string;
    level: number;
    profession_id: number;
    tools: string[];
    // Add other employee properties as needed
}

interface AddEmployeeParams {
    name?: string;
    profession_id?: number;
}

interface SetToolParams {
    employee_id: string;
    tool_id: number;
}

interface RetrainingParams {
    employee_id: string;
    new_profession: number;
}

export class EmployeeService {
    static async add(params?: AddEmployeeParams): Promise<Employee> {
        try {
            const response = await api.put<{ msg: Employee }>('/employee/add', params);
            return response.data.msg;
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    }

    static async setTools({ employee_id, tool_id }: SetToolParams): Promise<boolean> {
        try {
            await api.post('/employee/set/tools', {
                employee_id,
                tool_id
            });
            return true;
        } catch (error) {
            console.error('Error setting employee tools:', error);
            return false;
        }
    }

    static async retraining({ employee_id, new_profession }: RetrainingParams): Promise<boolean> {
        try {
            await api.post('/employee/retraining', { 
                employee_id,
                new_profession
            });
            return true;
        } catch (error) {
            console.error('Error retraining employee:', error);
            return false;
        }
    }

    static async upgradeLevel(employee_id: string): Promise<void> {
        try {
            await api.post('/employee/upgrade/level', { employee_id });
        } catch (error) {
            console.error('Error upgrading employee level:', error);
            throw error;
        }
    }
} 