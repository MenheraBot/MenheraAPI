import axios from 'axios';
import config from '../config.json';

const token = config.TOKEN;
const api = axios.create({
  baseURL: config.API_URL || `http://localhost:25156/api`,
  headers: {
    token,
  },
});

export const checkAuth = ({ username, password }) => {
  return api.post('/auth', null, { headers: { username, password } });
};

const getAuth = () => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  return { username, password };
};

export const getActivities = () => {
  return api.get('/activity/all', null, getAuth());
};

export const clearActivities = () => {
  return api.delete('/activity', null, getAuth());
};

export const resetActivities = () => {
  return api.put('/activity', null, getAuth()).then(res => res.data);
};

export const addActivity = (name, type) => {
  return api.post('/activity', { name, type }, getAuth());
};
