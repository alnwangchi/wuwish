import { QueryTableParams, TableResponse, ProductInfo } from '@/interface';
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:9527/',
  timeout: 3000
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

export const queryApi = async (params: QueryTableParams) => {
  try {
    const res: AxiosResponse<TableResponse> = await AxiosInstance.get('/images/search', { params });
    const { data } = res;
    return data;
  }
  catch {
    message.error('讀取資料失敗！');
    return null
  }
};

export const deleteProductApi = async (image_id: string) => {
  try {
    await AxiosInstance.delete(`/images/${image_id}`);
    message.success('刪除成功！');
    return 'success';
  }
  catch {
    message.error('刪除失敗！');
    return 'fail';
  }
};

export const postProductApi = async (formData: any) => {
  try {
    const res: AxiosResponse<any> = await AxiosInstance.post('images/upload', formData);
    const {data} = res;
    message.success('上傳成功');
    return 'success';
  }
  catch {
    message.error('上傳失敗');
    return 'fail';
  }
};

export default AxiosInstance;
