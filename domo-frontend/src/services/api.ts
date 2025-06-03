import axios, { InternalAxiosRequestConfig } from 'axios';
import { AuthService } from './auth/auth.service';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = AuthService.getStoredToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface GameData {
  user_id: string;
  boss_id: string;
  base_id: string;
}

interface EmployeeData {
  name: string;
  profession_id: string;
}

interface ToolData {
  employee_id: string;
  tool_id: string;
}

interface BossToolData {
  tool_id: string;
  boss_id: string;
}

interface WalletData {
  wallet: string;
}

interface LeaderboardData {
  interval: number;
  limit: number;
}


// Game API
export const gameApi = {
  getEmployeeList: (data: GameData) =>
    api.post('/boss/get/employee/list', data),
  
  addEmployee: (data: EmployeeData) =>
    api.put('/employee/add', data),
  
  setEmployeeTools: (data: ToolData) =>
    api.post('/employee/set/tools', data),
  
  getInventory: (data: GameData) =>
    api.post('/boss/get/inventory', data),
  
  putBossTool: (data: BossToolData) =>
    api.post('/boss/put/tool', data),
  
  buyStarterPack: (data: WalletData) =>
    api.put('/starter_pack', data),
};

// Referral API
export const referralApi = {
  getReferralCode: (data: WalletData) =>
    api.post('/referral/code', data),
  
  getLeaderBoard: (data: LeaderboardData) =>
    api.post('/referral/leader_board', data),
};

export default api; 