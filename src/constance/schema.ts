import * as yup from 'yup';

export type CreateFormValues = {
  image: any;
  business_type: string;
  category: string[];
  name: string;
  title: string;
  number?: string;
  content?: string;
  price?: number;
  status?: string;
};
export type EditFormValues = {
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
  name: yup.string().required('名稱是必填欄位'),
  title: yup.string().required('劇名是必填欄位'),
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
    }),
  category: yup
    .array()
    .of(yup.string().required())
    .min(1, '類別是必填欄位')
    .max(3, '最多選擇三個類別') // restrict in UI
    .required('類別是必填欄位')
});

export const EditSchema = baseSchema.shape({
  image: yup.mixed(),
  category: yup.string().required()
});
