'use client';
import { QueryParams, ProductSearchResponse, ProductInfo } from '@/interface';
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

const AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 3000
});
AxiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
AxiosInstance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
AxiosInstance.defaults.headers.put['Content-Type'] = 'multipart/form-data';

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

export const keywordSearch = async ({
  keyword,
  currentPage
}: {
  keyword: string;
  currentPage: number;
}) => {
  const params = {
    page_size: 25,
    page_number: currentPage,
    name: keyword,
    title: keyword,
    is_search_bar: true
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
    const res: AxiosResponse<any> = await AxiosInstance.get(`/images/${id}?details=true`);
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

export const deleteMultipleProductApi = async (image_ids: string[]) => {
  try {
    await AxiosInstance.delete(`/images`, {
      data: {
        image_ids
      }
    });
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
export const putProductApi = async (image_id: string | undefined, formData: any) => {
  try {
    const res: AxiosResponse<any> = await AxiosInstance.put(`images/${image_id}`, formData);
    message.success('更新成功');
    return 'success';
  } catch {
    message.error('更新失敗');
    return 'fail';
  }
};

export default AxiosInstance;
