import { ROUTES } from '@/constants/Routes';
import axios from 'axios';

export const fetchClient = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   timeout: 8 * 60 * 60 * 1000,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

fetchClient.interceptors.request.use(
   config => {
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   error => Promise.reject(error)
);

fetchClient.interceptors.response.use(
   response => response,
   error => {
      if (error.response?.status === 401) {
         localStorage.clear();
         window.location.href = ROUTES.LOGIN;
      }
      return Promise.reject(error);
   }
);
