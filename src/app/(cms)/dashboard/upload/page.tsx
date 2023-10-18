/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import { Card, message } from 'antd';
import { categoryList } from '@/constance';
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
import slugify from 'slugify';
import { createSchema, FormValues } from '@/constance/schema';

const UploadPage = () => {
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    control
  } = useForm({
    resolver: yupResolver(createSchema),
    defaultValues: {
      business_type: BusinessType.Rent
    }
  });
  const [previewImg, setPreviewImg] = useState('');
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();
  const business_value = watch('business_type', BusinessType.Rent);

  useEffect(() => {
    if (!isCanViewAdmin) {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  const handleUploadImage = (e: any) => {
    if (e.target?.files?.[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      // clear image error
      clearErrors('image');
    } else {
      message.error('預覽圖片失敗!');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const postData = {
      ...data,
      image: (data.image as any)['0']
    };
    const formData = new FormData();
    Object.entries(postData).forEach((item) => formData.append(item[0], item[1]));
    // send api
    postProductApi(formData).then((result) => {
      if (result === 'success') {
        // clear previewImage
        setPreviewImg('');
        // reset image value
        resetField('image');
      }
    });
  };

  return (
    <div className="container grid grid-cols-2 gap-4 p-4">
      <Card bordered={false} className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-4 flex flex-col">
            <p className="labelText-required labelText">商業類型（business type）</p>
            <div className="flex gap-4 py-2">
              <label>
                <input type="radio" value={BusinessType.Rent} {...register('business_type')} />
                <span className="pl-2">租借</span>
              </label>
              <label>
                <input type="radio" value={BusinessType.Sell} {...register('business_type')} />
                <span className="pl-2">販售</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="labelText-required labelText">類別</label>
            <select
              {...register('category')}
              className="w-full py-2 pl-[11px] rounded-md border border-[#d9d9d9]"
            >
              {categoryList.map((c) => (
                <option key={c.en} value={slugify(c.en, { lower: true })}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Controller
            control={control}
            name="title"
            render={(props) => <InputField label="劇名" {...props} placeholder="七龍珠" />}
          />

          <Controller
            control={control}
            name="name"
            render={(props) => <InputField label="名稱" {...props} placeholder="孫悟空" />}
          />

          {business_value === BusinessType.Sell && (
            <>
              <Controller
                control={control}
                name="content"
                render={(props) => (
                  <InputField required={false} label="內容" {...props} placeholder="上衣、下身" />
                )}
              />
              <Controller
                control={control}
                name="price"
                render={(props) => (
                  <InputNumberField required={false} label="價格" {...props} placeholder="2000" />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={(props) => (
                  <InputField required={false} label="狀態" {...props} placeholder="八成新" />
                )}
              />
            </>
          )}

          <Controller
            control={control}
            name="number"
            render={(props) => (
              <InputField required={false} label="編號" {...props} placeholder="B2201" />
            )}
          />

          <div className="mb-4">
            <label className="labelText-required labelText">上傳圖片</label>
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .webp, .svg, .bmp"
              {...register('image')}
              onChange={handleUploadImage}
            />
            {errors.image && <p className="errorInput">{errors.image.message}</p>}
          </div>
          <Button text="提交" customClass="self-end" />
        </form>
      </Card>
      <div className="flex flex-col gap-4">
        <label className="text-white">預覽圖片</label>
        <div className="border border-white flex-1">
          {previewImg && <img src={previewImg} alt="image" />}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
