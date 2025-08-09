/* eslint-disable @next/next/no-img-element */
'use client';
import { ListType } from '@/app/(cms)/dashboard/list/page';
import InputField from '@/components/Input/Input';
import InputNumberField from '@/components/InputNumber/InputNumber';
import { categoryOptions } from '@/constance';
import { EditFormValues, EditSchema } from '@/constance/schema';
import { BusinessType } from '@/interface';
import { putProductApi } from '@/server';
import { yupResolver } from '@hookform/resolvers/yup';
import { message, Modal } from 'antd';
import clsx from 'clsx';
import Image from 'next/image';
import React, { FC, useEffect, useId, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface EditModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ListType;
  filterParams: any;
  onSearch: any;
  setKey: React.Dispatch<React.SetStateAction<any>>;
}

const EditModal: FC<EditModalProps> = ({ open, setOpen, data, filterParams, onSearch, setKey }) => {
  const randomKey = useId();
  const [localPreviewImg, setLocalPreviewImg] = useState(data?.image);
  const [file, setFile] = useState('');
  const [hasImageChanged, setHasImageChanged] = useState(false);

  const { register, handleSubmit, reset, control, formState } = useForm({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      business_type: BusinessType.Rent,
      category: data?.category,
      name: data?.name,
      number: data?.number,
      title: data?.title
    }
  });

  const isFormDirty = formState.isDirty || hasImageChanged;

  const handleUploadImage = (e: any) => {
    if (e.target?.files?.[0]) {
      setLocalPreviewImg(URL.createObjectURL(e.target.files[0]));
      // 檔案另存 為了解決在用拖曳的時候會使 image 變 undefined 可能跟 RHF 有關
      setFile(e.target.files[0]);
      setHasImageChanged(true); // 標記圖片已變更
    } else {
      message.error('預覽圖片失敗!');
    }
  };

  const onSubmit: SubmitHandler<EditFormValues> = async (d) => {
    try {
      const formData = new FormData();
      Object.entries(d).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (file) {
        formData.append('image', file);
      }

      if (!data?.image_id) {
        throw new Error('Image ID is missing');
      }

      const result = await putProductApi(data.image_id, formData);

      if (result === 'success') {
        setLocalPreviewImg('');
        setFile('');
        setHasImageChanged(false); // 重置圖片變更狀態
        setOpen(false);
        onSearch(filterParams.searchValue);
        setKey(randomKey);
        message.success('產品更新成功');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('提交表單時發生錯誤:', error);
      message.error('更新產品失敗，請重試');
    }
  };

  // reset 用來帶入預設
  useEffect(() => {
    reset({
      business_type: data?.business_type,
      category: data?.category,
      name: data?.name,
      number: data?.number,
      title: data?.title
    });
    setHasImageChanged(false); // 重置圖片變更狀態
    // 清除未 submit 的預覽圖
    return () => {
      setLocalPreviewImg('');
      setHasImageChanged(false);
    };
  }, [data, reset]);

  return (
    <Modal
      onOk={handleSubmit(onSubmit)}
      onCancel={() => setOpen(false)}
      open={open}
      okButtonProps={{ className: clsx({ 'bg-blue-900': isFormDirty }), disabled: !isFormDirty }}
      okText={isFormDirty ? '更新' : '沒有變更'}
    >
      <div className="flex gap-3">
        <form className="flex w-3/6 flex-col">
          <div className="mb-4 flex flex-col">
            <p className="labelText-required labelText">商業類型（business type）</p>
            <div className="flex gap-4 py-2">
              <label>
                <input
                  disabled
                  type="radio"
                  value={BusinessType.Rent}
                  {...register('business_type')}
                />
                <span className="pl-2">租借</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="labelText-required labelText">類別</label>
            <select
              {...register('category')}
              className="w-full rounded-md border border-[#d9d9d9] py-2 pl-[11px]"
            >
              {categoryOptions.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
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
              className="text-white"
            />
          </div>
        </form>
        <div className="f-center grow">
          {localPreviewImg ? (
            <img src={localPreviewImg} alt="image" />
          ) : (
            <Image
              width={500}
              height={500}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.image}?key=${randomKey}`}
              alt="imageUrl"
            />
          )}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        表單狀態：{isFormDirty ? '已變更' : '未變更'}
        {formState.isDirty && <span> | 表單欄位已變更</span>}
        {hasImageChanged && <span> | 圖片已變更</span>}
      </div>
    </Modal>
  );
};

export default EditModal;
