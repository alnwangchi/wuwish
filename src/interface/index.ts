import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';
export enum BusinessType {
  Rent = 'rent',
  Sell = 'sell'
}
interface ReactFormProps {
  field: ControllerRenderProps<any, any>;
  formState: UseFormStateReturn<any>;
  fieldState: ControllerFieldState;
}

// 服裝搜尋 API
interface ProductSearchResponse {
  results: ProductInfo[];
  total_count: number;
}
interface ProductInfo {
  image_id: string;
  image_path: string;
  info: ProductDetail;
}
interface ProductDetail {
  business_type: BusinessType;
  category: string;
  content: string;
  name: string;
  number: Number;
  price: string;
  status: string;
  title: string;
}

interface QueryParams {
  page_size: number;
  page_number: number;
  business_type?: BusinessType;
  category?: string;
  title?: string;
  name?: string;
  number?: string;
  is_random?: boolean;
}

export type { ReactFormProps, ProductSearchResponse, ProductInfo, QueryParams, ProductDetail };
