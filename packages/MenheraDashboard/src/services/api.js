import axios from 'axios';

// TEMPORARIO
const token = '111';
const api = axios.create({
  baseURL: process.env.API_URL || `http://localhost:3333/api`,
  headers: {
    token,
  },
});


api.interceptors.request.use(config => {
  config.headers.username = localStorage.getItem('username')
  config.headers.password = localStorage.getItem('password');
  return config;
},
  error => Promise.reject(error)
);

export default api;

export const getActivities = () => {
  return api.get('/activity/all');
};

export const clearActivities = () => {
  return api.delete('/activity');
};

export const resetActivities = () => {
  return api.put('/activity').then(res => res.data);
};

export const addActivity = (name, type) => {
  return api.post('/activity', { name, type });
};

export const checkAuth = ({ username, password }) => {
  return api.post('/auth',null, { headers: { username, password } });
};
