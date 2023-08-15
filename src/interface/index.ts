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

interface QueryTableParams{
  title?: string;
  name?: string;
  page_number: number;
  page_size: number;
  number?: string;
  business_type: BusinessType
}

export enum BusinessType {
  Rent = 'rent',
  Sell = 'sell'
}

export type { ReactFormProps, TableResponse, ProductInfo,QueryTableParams };
