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
import { postProductApi } from '@/server';
import { BusinessType } from '@/interface';
import Button from '@/components/Button';

const uploadSchema = yup.object({
  image: yup.mixed().required(),
  business_type: yup.string().required(),
  category: yup.string().required(),
  name: yup.string().required(),
  title: yup.string().required(),
  number: yup.string(),
  content: yup.string(),
  price: yup.number(),
  status: yup.string()
});

type FormValues = {
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

const UploadPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(uploadSchema),
    defaultValues: {
      business_type: BusinessType.Rent
    }
  });
  const [file, setFile] = useState('');
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();
  const business_value = watch('business_type', BusinessType.Rent);
  const image_value = watch('image');

  console.log('image_value', image_value)


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
    console.log({ data });
    if (file === '') {
      setError('image', {
        type: 'custom',
        message: '請上傳圖片！'
      });
      return;
    } else {
      const postData = {
        ...data,
        image: (data.image as any)['0']
      };
      const formData = new FormData();
      Object.entries(postData).forEach((item) => formData.append(item[0], item[1]));
      // send api
      postProductApi(formData).then((result) => {
        if (result !== 'fail') {
          setFile('');
       }
     })
    }
  };

  return (
    <div className='container grid grid-cols-2 gap-4 p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <div className='mb-4 flex flex-col text-white'>
          <p className='labelText-required labelText'>商業類型（business type）</p>
          <div className='flex gap-4 py-2'>
            <label>
              <input type='radio' value={BusinessType.Rent} {...register('business_type')} />
              <span className='pl-2'>租借</span>
            </label>
            <label>
              <input type='radio' value={BusinessType.Sell} {...register('business_type')} />
              <span className='pl-2'>販售</span>
            </label>
          </div>
        </div>
        <div className='mb-4'>
          <label className='labelText-required labelText'>類別</label>
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
          name='title'
          render={(props) => <InputField label='劇名' {...props} placeholder='七龍珠' />}
        />

        <Controller
          control={control}
          name='name'
          render={(props) => <InputField label='名稱' {...props} placeholder='孫悟空' />}
        />

        {business_value === BusinessType.Sell && (
          <Controller
            control={control}
            name='content'
            render={(props) => (
              <InputField required={false} label='內容' {...props} placeholder='上衣、下身' />
            )}
          />
        )}

        {business_value === BusinessType.Sell && (
          <Controller
            control={control}
            name='price'
            render={(props) => (
              <InputNumberField required={false} label='價格' {...props} placeholder='2000' />
            )}
          />
        )}

        {business_value === BusinessType.Sell && (
          <Controller
            control={control}
            name='status'
            render={(props) => (
              <InputField required={false} label='狀態' {...props} placeholder='八成新' />
            )}
          />
        )}

        <Controller
          control={control}
          name='number'
          render={(props) => (
            <InputField required={false} label='編號' {...props} placeholder='B2201' />
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
          {errors.image?.type === 'custom' && <p className='errorInput'>{errors.image.message}</p>}
        </div>
        <Button text='提交' customClass='self-end' />
      </form>
      <div className='flex flex-col'>
        <label className='labelText mb-4'>預覽圖片</label>
        <div className='border border-white flex-1'>
          {file && <img src={file} className='' alt='image' />}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
