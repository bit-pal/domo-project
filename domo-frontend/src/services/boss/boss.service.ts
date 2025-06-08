import api from '../api';

interface Employee {
    id: string;
    name: string;
    level: number;
    profession_id: number;
    tools: string[];
}

interface Inventory {
    tools: string[];
}

interface BruteForceGame {
    id: string;
    status: string;
    // Add other game properties as needed
}

interface BruteForceHistory {
    games: BruteForceGame[];
    total: number;
}

export class BossService {
    // Employee Management
    static async putTool(employee_id: string, tool: string): Promise<void> {
        try {
            await api.post('/boss/put/tool', { 
                employee_id, 
                tool 
            });
        } catch (error) {
            console.error('Error putting tool:', error);
            throw error;
        }
    }

    static async getEmployee(employee_id: string): Promise<Employee> {
        try {
            const response = await api.post<{ msg: Employee }>(`/boss/get/employee/${employee_id}`);
            return response.data.msg;
        } catch (error) {
            console.error('Error getting employee:', error);
            throw error;
        }
    }

    static async getEmployeeList(): Promise<Employee[]> {
        try {
            const response = await api.post<{ msg: Employee[] }>('/boss/get/employee/list');
            return response.data.msg;
        } catch (error) {
            console.error('Error getting employee list:', error);
            throw error;
        }
    }

    // Inventory Management
    static async getInventory(): Promise<Inventory> {
        try {
            const response = await api.post<{ msg: Inventory }>('/boss/get/inventory');
            return response.data.msg;
        } catch (error) {
            console.error('Error getting inventory:', error);
            throw error;
        }
    }

    // Brute Force Game
    static async isBruteForceAvailable(): Promise<boolean> {
        try {
            const response = await api.get<{ msg: boolean }>('/boss/game/brute-force/is-avaible');
            return response.data.msg;
        } catch (error) {
            console.error('Error checking brute force availability:', error);
            throw error;
        }
    }

    static async startBruteForce(): Promise<BruteForceGame> {
        try {
            const response = await api.post<{ msg: BruteForceGame }>('/boss/game/brute-force');
            return response.data.msg;
        } catch (error) {
            console.error('Error starting brute force game:', error);
            throw error;
        }
    }

    static async getBruteForceHistory(): Promise<BruteForceHistory> {
        try {
            const response = await api.get<{ msg: BruteForceHistory }>('/boss/game/brute-force/history');
            return response.data.msg;
        } catch (error) {
            console.error('Error getting brute force history:', error);
            throw error;
        }
    }
} 