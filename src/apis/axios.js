import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'http://3.38.190.107:8080',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
  },
});

authInstance.interceptors.request.use(config => {
  if (config.headers === undefined) return;
  const token = localStorage.getItem('Token');
  config.headers.Authorization = `${token}`;
  // eslint-disable-next-line consistent-return
  return config;
});

export const instance = axios.create({
  baseURL: 'http://3.34.51.176:8080',
});
