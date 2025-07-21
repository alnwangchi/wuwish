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

  const onSubmit: SubmitHandler<CreateFormValues> = async (data) => {
    // console.log('🚀 ~ data:', data);
    const { category, image } = data;

    const uploadPromises = category.map((c) => {
      const postData = {
        ...data,
        category: c,
        image: (image as any)['0']
      };
      const formData = new FormData();
      Object.entries(postData).forEach((item) => formData.append(item[0], item[1]));
      return postProductApi(formData);
    });

    setIsLoading(true);

    try {
      const results = await Promise.allSettled(uploadPromises);

      const successCount = results.filter((result) => result.status === 'fulfilled').length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        message.success(`成功上傳 ${successCount} 個類別`);
      }

      if (failCount > 0) {
        message.error(`${failCount} 個類別上傳失敗`);
      }

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
          <div className="mb-4 flex flex-col">
            <p className="labelText-required labelText">商業類型（business type）</p>
            <div className="flex gap-4 py-2">
              <label>
                <input type="radio" value={BusinessType.Rent} {...register('business_type')} />
                <span className="pl-2">租借</span>
              </label>
              {/* <label>
                <input type="radio" value={BusinessType.Sell} {...register('business_type')} />
                <span className="pl-2">販售</span>
              </label> */}
            </div>
          </div>
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
          <Button htmlType="submit" className="self-end" type="primary" loading={isLoading}>
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
