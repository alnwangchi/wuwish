import * as yup from 'yup';

export type FormValues = {
  image: any;
  business_type: string;
  category: string;
  name: string;
  title: string;
  number?: string;
  content?: string;
  price?: number;
  status?: string;
};

export const createAndEditSchema = yup.object({
  image: yup
    .mixed()
    .required()
    .test('image', '請上傳圖片', (file: any) => {
      return file && file.length;
    }),
  business_type: yup.string().required(),
  category: yup.string().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  number: yup.string(),
  content: yup.string(),
  price: yup.number(),
  status: yup.string()
});
