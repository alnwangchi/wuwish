import { QueryParams, ProductSearchResponse, ProductInfo } from '@/interface';
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

const AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9527',
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

export const queryApi = async (params: QueryParams) => {
  console.log('🚀 ~ param1s:', params);
  try {
    const res: AxiosResponse<ProductSearchResponse> = await AxiosInstance.get('/images/search', {
      params
    });
    const { data } = res;
    return data;
  } catch {
    message.error('讀取資料失敗！');
    return null;
  }
};

export const keywordSearch = async (keyword: string) => {
  // console.log('🚀 ~ params:', params);
  const params = {
    page_size: 10,
    page_number: 1,
    name: keyword,
    title: keyword
  };
  try {
    const res: AxiosResponse<ProductSearchResponse> = await AxiosInstance.get('/images/search', {
      params
    });
    const { data } = res;
    return data;
  } catch {
    message.error('讀取資料失敗！');
    return null;
  }
};

export const getClothDetail = async (id: string) => {
  try {
    const res: AxiosResponse<any> = await AxiosInstance.get(`/images/${id}.jpg?details=true`);
    const { data } = res;
    return data;
  } catch {
    message.error('讀取資料失敗！');
    return null;
  }
};

export const deleteProductApi = async (image_id: string) => {
  try {
    await AxiosInstance.delete(`/images/${image_id}`);
    message.success('刪除成功！');
    return 'success';
  } catch {
    message.error('刪除失敗！');
    return 'fail';
  }
};

export const postProductApi = async (formData: any) => {
  try {
    const res: AxiosResponse<any> = await AxiosInstance.post('images/upload', formData);
    const { data } = res;
    message.success('上傳成功');
    return 'success';
  } catch {
    message.error('上傳失敗');
    return 'fail';
  }
};

export default AxiosInstance;
