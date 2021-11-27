import axios from 'axios';

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN as string,
  },
});

export default apiRequest;
