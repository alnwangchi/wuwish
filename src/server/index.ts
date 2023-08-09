import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;
