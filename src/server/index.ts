import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:9527/',
  timeout: 3000,
});
AxiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
AxiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';


// Add a request interceptor to set up retry configuration
AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle retries
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
