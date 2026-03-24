import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'https://dogapi.dog/api/v2/',
  // baseURL: 'http://localhost:3006/api',

  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
