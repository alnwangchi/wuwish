/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";

import { tmpCategory } from "@/constance";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style.scss";
import { useState } from "react";

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
  } = useForm({
    resolver: yupResolver(uploadSchema)
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    setError("image", {
      type: "custom",
      message: "請上傳圖片！",
    })
  },[setError])

  const handleUploadImage = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    clearErrors(["image"]);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('1', data);
    // send api
  };

  return (
    <div className="container grid grid-cols-2 gap-4 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            <span>*</span>類別
          </label>
          <select {...register("category")}>
            {tmpCategory.map((c) => (
              <option key={c.en} value={c.en}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <span>*</span>劇名
          </label>
          <input {...register("name")} />
          {errors.name && <p>劇名是必填欄位</p>}
        </div>

        <div>
          <label>
            <span>*</span>名稱
          </label>
          <input {...register("title")} />
          {errors.title && <p>名稱是必填欄位</p>}
        </div>

        <div>
          <label>內容</label>
          <textarea {...register("content")} />
          {errors.content && <p>{errors.content.message}</p>}
        </div>

        <div>
          <label>價格</label>
          <input type="number" {...register("price")}  defaultValue={0} />
          {errors.price && <p>價格只能輸入數字</p>}
        </div>

        <div>
          <label>狀態</label>
          <input {...register("status")} />
          {errors.status && <p>{errors.status.message}</p>}
        </div>

        <div>
          <label>情境</label>
          <textarea {...register("situation")} />
          {errors.situation && <p>{errors.situation.message}</p>}
        </div>

        <div>
          <label>
            <span>*</span>上傳圖片
          </label>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .gif, .webp, .svg, .bmp"
            {...register("image")}
            onChange={handleUploadImage}
          />
          {errors.image?.type === "custom" && <p>{errors.image.message}</p>}
        </div>

        <input type="submit" />
      </form>
      <div className="border border-indigo-600">
        <label>預覽圖片</label>
        {file && <img src={file} className="" alt="image" />}
      </div>
    </div>
  );
};

export default UploadPage;
