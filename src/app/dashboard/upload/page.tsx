/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import { message } from 'antd';
import { tmpCategory } from '@/constance';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthenticate from '@/hooks/useAuthenticate';
import InputField from '@/components/Input/Input';
import InputNumberField from '@/components/InputNumber/InputNumber';
import AxiosInstance from '@/server';


const uploadSchema = yup.object({
  name: yup.string().required(),
  title: yup.string().required(),
  category: yup.string().required(),
  content: yup.string(),
  price: yup.number(),
  situation: yup.string(),
  status: yup.string(),
  image: yup.mixed().required(),
});

type FormValues = {
  category: string;
  name: string;
  title: string;
  content?: string;
  price?: number;
  situation?: string;
  status?: string;
  image: unknown;
};

const UploadPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(uploadSchema),
  });
  const [file, setFile] = useState('');
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();

  useEffect(() => {
    if (!isCanViewAdmin) {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  const handleUploadImage = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    clearErrors(['image']);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log('data', data.image);
    if (file === '') {
      setError('image', {
        type: 'custom',
        message: '請上傳圖片！',
      });
      return;
    } else {
      // send api
      AxiosInstance.post('/', {
        ...data,
        image: (data.image as any)['0'],
      })
        .then((result) => {
          message.success('上傳成功');
          router.push('/dashboard/list');
        })
        .catch((error) => {
          console.log(error);
          message.error('上傳失敗');
        });
    }
  };

  return (
    <div className='container grid grid-cols-2 gap-4 p-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='labelText-required labelText'>
            類別
          </label>
          <select {...register('category')} className='w-full py-2'>
            {tmpCategory.map((c) => (
              <option key={c.en} value={c.en}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <Controller
          control={control}
          name='name'
          render={(props) => <InputField label='劇名' {...props} />}
        />

        <Controller
          control={control}
          name='title'
          render={(props) => <InputField label='名稱' {...props} />}
        />

        <Controller
          control={control}
          name='content'
          render={(props) => (
            <InputField
              type='textarea'
              required={false}
              label='內容'
              {...props}
            />
          )}
        />

        <Controller
          control={control}
          name='price'
          render={(props) => (
            <InputNumberField required={false} label='價格' {...props} />
          )}
        />

        <Controller
          control={control}
          name='status'
          render={(props) => (
            <InputField required={false} label='狀態' {...props} />
          )}
        />

        <Controller
          control={control}
          name='situation'
          render={(props) => (
            <InputField
              required={false}
              type='textarea'
              label='情境'
              {...props}
            />
          )}
        />

        <div className='mb-4'>
          <label className='labelText-required labelText'>上傳圖片</label>
          <input
            type='file'
            accept='.jpg, .jpeg, .png, .gif, .webp, .svg, .bmp'
            {...register('image')}
            onChange={handleUploadImage}
          />
          {errors.image?.type === 'custom' && <p>{errors.image.message}</p>}
        </div>

        <input type='submit' className='submitInput' />
      </form>
      <div className='border border-indigo-600'>
        <label>預覽圖片</label>
        {file && <img src={file} className='' alt='image' />}
      </div>
    </div>
  );
};

export default UploadPage;
