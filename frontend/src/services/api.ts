import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (data: { name: string; email: string; password: string }) =>
    api.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Palette API
export const paletteAPI = {
  create: (data: { name: string; colors: string[]; isPublic?: boolean; tags?: string[] }) =>
    api.post('/palettes', data),
  getUserPalettes: () => api.get('/palettes/user'),
  getPublicPalettes: () => api.get('/palettes/public'),
  update: (id: string, data: any) => api.put(`/palettes/${id}`, data),
  delete: (id: string) => api.delete(`/palettes/${id}`),
};

export default api;
