import axios, { InternalAxiosRequestConfig } from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('jwt');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized
      localStorage.removeItem('jwt');
    }
    return Promise.reject(error);
  }
);

export default api; 