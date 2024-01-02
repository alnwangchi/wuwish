/* eslint-disable @next/next/no-img-element */
'use client';
import { ListType } from '@/app/(cms)/dashboard/list/page';
import Button from '@/components/Button';
import InputField from '@/components/Input/Input';
import InputNumberField from '@/components/InputNumber/InputNumber';
import { categoryList } from '@/constance';
import { EditSchema, FormValues } from '@/constance/schema';
import { BusinessType } from '@/interface';
import { putProductApi } from '@/server';
import { yupResolver } from '@hookform/resolvers/yup';
import { message, Modal } from 'antd';
import Image from 'next/image';
import React, { FC, useEffect, useId, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import slugify from 'slugify';

interface EditModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: ListType;
  filterParams: any;
  onSearch: any;
  setKey: React.Dispatch<React.SetStateAction<any>>;
}

const EditModal: FC<EditModalProps> = ({ open, setOpen, data, filterParams, onSearch, setKey }) => {
  const randonKey = useId();
  const [localPreviewImg, setLocalPreviewImg] = useState(data?.image);
  const [file, setFile] = useState('');
  const { register, handleSubmit, watch, reset, control, setValue } = useForm({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      business_type: BusinessType.Rent,
      category: data?.category,
      name: data?.name,
      number: data?.number,
      title: data?.title
    }
  });
  const business_value = watch('business_type', BusinessType.Rent);

  const handleUploadImage = (e: any) => {
    if (e.target?.files?.[0]) {
      setLocalPreviewImg(URL.createObjectURL(e.target.files[0]));
      // 檔案另存 為了解決在用拖曳的時候會使 image 變 undefined 可能跟 RHF 有關
      setFile(e.target.files[0]);
    } else {
      message.error('預覽圖片失敗!');
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (d) => {
    console.log(d);
    const postData = {
      ...d,
      image: file
    };
    const formData = new FormData();
    Object.entries(postData).forEach((item) => formData.append(item[0], item[1]));
    // send api
    putProductApi(data?.image_id, formData).then((result) => {
      if (result === 'success') {
        setLocalPreviewImg('');
        setOpen(false);
        onSearch(filterParams.searchValue);
        setKey(randonKey);
      }
    });
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
    // 清除未 submit 的預覽圖
    return () => setLocalPreviewImg('');
  }, [data]);

  return (
    <Modal onOk={handleSubmit(onSubmit)} onCancel={() => setOpen(false)} open={open}>
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
              <label>
                <input
                  disabled
                  type="radio"
                  value={BusinessType.Sell}
                  {...register('business_type')}
                />
                <span className="pl-2">販售</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="labelText-required labelText">類別</label>
            <select
              {...register('category')}
              className="w-full rounded-md border border-[#d9d9d9] py-2 pl-[11px]"
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
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.image}?key=${randonKey}`}
              alt="imageUrl"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
