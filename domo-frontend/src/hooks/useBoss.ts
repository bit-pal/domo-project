import { useState, useCallback } from 'react';
import { BossService } from '../services/boss/boss.service';
import { toast } from 'react-hot-toast';

export const useBoss = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState<any[]>([]);
    const [inventory, setInventory] = useState<any>(null);

    // Employee Management
    const assignTool = async (employee_id: string, tool: string) => {
        try {
            setIsLoading(true);
            await BossService.putTool(employee_id, tool);
            toast.success('Successfully assigned tool to employee');
            return true;
        } catch (error) {
            console.error('Error assigning tool:', error);
            toast.error('Failed to assign tool');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEmployee = async (employee_id: string) => {
        try {
            setIsLoading(true);
            const employee = await BossService.getEmployee(employee_id);
            return employee;
        } catch (error) {
            console.error('Error fetching employee:', error);
            toast.error('Failed to fetch employee details');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchEmployees = useCallback(async () => {
        try {
            setIsLoading(true);
            const employeeList = await BossService.getEmployeeList();
            setEmployees(employeeList);
            return employeeList;
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to fetch employees');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Inventory Management
    const fetchInventory = useCallback(async () => {
        try {
            setIsLoading(true);
            const inv = await BossService.getInventory();
            setInventory(inv);
            return inv;
        } catch (error) {
            console.error('Error fetching inventory:', error);
            toast.error('Failed to fetch inventory');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Brute Force Game
    const checkBruteForceAvailability = async () => {
        try {
            return await BossService.isBruteForceAvailable();
        } catch (error) {
            console.error('Error checking brute force availability:', error);
            return false;
        }
    };

    const startBruteForceGame = async () => {
        try {
            setIsLoading(true);
            const game = await BossService.startBruteForce();
            toast.success('Successfully started brute force game');
            return game;
        } catch (error) {
            console.error('Error starting brute force game:', error);
            toast.error('Failed to start brute force game');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBruteForceHistory = async () => {
        try {
            setIsLoading(true);
            return await BossService.getBruteForceHistory();
        } catch (error) {
            console.error('Error fetching brute force history:', error);
            toast.error('Failed to fetch game history');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // State
        isLoading,
        employees,
        inventory,

        // Employee Management
        assignTool,
        fetchEmployee,
        fetchEmployees,

        // Inventory Management
        fetchInventory,

        // Brute Force Game
        checkBruteForceAvailability,
        startBruteForceGame,
        fetchBruteForceHistory,
    };
}; 