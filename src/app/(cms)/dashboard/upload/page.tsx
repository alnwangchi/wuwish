/* eslint-disable @next/next/no-img-element */
'use client';
import InputField from '@/components/Input/Input';
import InputNumberField from '@/components/InputNumber/InputNumber';
import { categoryOptions } from '@/constance';
import { createSchema, CreateFormValues } from '@/constance/schema';
import useAuthenticate from '@/hooks/useAuthenticate';
import { BusinessType } from '@/interface';
import { postProductApi } from '@/server';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, message, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
      business_type: BusinessType.Rent,
      category: []
    }
  });
  const [previewImg, setPreviewImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isCanViewAdmin = useAuthenticate();
  const router = useRouter();

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

  const onSubmit: SubmitHandler<CreateFormValues> = async (data) => {
    const { category, image } = data;

    const uploadPromises = () => {
      const postData = {
        ...data,
        business_type: BusinessType.Rent,
        category: category.join(),
        image: (image as any)['0']
      };
      const formData = new FormData();
      Object.entries(postData).forEach((item) => formData.append(item[0], item[1]));
      return postProductApi(formData);
    };

    setIsLoading(true);

    try {
      const results = await uploadPromises();

      setPreviewImg('');
      resetField('image');
    } catch (error) {
      console.error('Upload process failed:', error);
      message.error('上傳過程中發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container grid grid-cols-2 gap-4 p-4">
      <Card bordered={false} className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* 1131006 需要一圖多類 */}
          <div className="mb-4">
            <label className="labelText-required labelText">類別</label>
            <Controller
              name="category"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  className="w-full"
                  mode="multiple"
                  allowClear
                  placeholder="Please select"
                  maxCount={3}
                  options={categoryOptions}
                  value={value as string[]}
                  onChange={(newValue: string[]) => {
                    onChange(newValue);
                  }}
                />
              )}
            />
            {errors.category && <p className="errorInput">{errors.category.message}</p>}
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

          <Controller
            control={control}
            name="number"
            render={(props) => (
              <InputField required={false} label="編號" {...props} placeholder="B2201" />
            )}
          />

          <Controller
            control={control}
            name="depot"
            render={(props) => (
              <InputField required={false} label="倉庫" {...props} placeholder="主倉庫" />
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
          <Button
            htmlType="submit"
            className="self-end bg-blue-900"
            type="primary"
            loading={isLoading}
          >
            {isLoading ? '上傳中' : '提交'}
          </Button>
        </form>
      </Card>
      <div className="flex flex-col gap-4">
        <label className="text-white">預覽圖片</label>
        <div className="flex-1 border border-white">
          {previewImg && <img src={previewImg} alt="image" />}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
