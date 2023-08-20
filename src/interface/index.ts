import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form';

interface ReactFormProps {
  field: ControllerRenderProps<any, any>;
  formState: UseFormStateReturn<any>;
  fieldState: ControllerFieldState;
}

interface TableResponse {
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
  business_type: BusinessType;
  page_size: number;
  page_number: number;
  category?: string;
  title?: string;
  name?: string;
  number?: string;
}

export enum BusinessType {
  Rent = 'rent',
  Sell = 'sell'
}

export type { ReactFormProps, TableResponse, ProductInfo, QueryParams };
