import axios from 'axios';

// TEMPORARIO
const token = '10';
const api = axios.create({
  baseURL: `http://localhost:3333/api`,
  headers: {
    token,
  },
});

export default api;

export const getActivities = () => api.get('/activity/all');
export const clearActivities = () => api.delete('/activity');
export const resetActivities = () => api.put('/activity').then(res => res.data);
export const addActivity = (name, type) => api.post('/activity', { name, type });
