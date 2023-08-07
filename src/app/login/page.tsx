'use client';
import React from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import './style.scss';
import { authenticationService } from '@/hooks/useAuthenticate';

const loginSchema = yup
  .object({
    account: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

type FormValues = {
  account: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // check whether pass authentication
    if (authenticationService(data.account, data.password)) {
      router.push('/dashboard/list');
    }
  };
  return (
    <div className='container flex justify-center	p-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex-1'>
        <div>
          <label>
            <span>*</span>帳號
          </label>
          <input {...register('account')} />
          {errors.account && <p>帳號是必填欄位</p>}
        </div>
        <div>
          <label>
            <span>*</span>密碼
          </label>
          <input {...register('password')} />
          {errors.password && <p>密碼是必填欄位</p>}
        </div>
        <input type='submit' />
      </form>
    </div>
  );
};

export default Login;
