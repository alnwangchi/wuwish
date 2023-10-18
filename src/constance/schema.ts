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

const baseSchema = yup.object({
  business_type: yup.string().required(),
  category: yup.string().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  number: yup.string(),
  content: yup.string(),
  price: yup.number(),
  status: yup.string()
});

export const createSchema = baseSchema.shape({
  image: yup
    .mixed()
    .required()
    .test('image', '請上傳圖片', (file: any) => {
      return file && file.length;
    })
});

export const EditSchema = baseSchema.shape({
  image: yup.mixed()
});
