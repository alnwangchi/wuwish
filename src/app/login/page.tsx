'use client';
import React from 'react';
import { DevTool } from '@hookform/devtools';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { authenticationService } from '@/hooks/useAuthenticate';
import InputField from '@/components/Input/Input';
import Button from '@/components/Button';

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
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // check whether pass authentication
    if (authenticationService(data.account, data.password)) {
      router.push('/dashboard/list');
    }
  };
  return (
    <div className='container flex justify-center	p-4 mx-auto'>
      {/* <DevTool control={control} placement='top-right' /> */}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
        <Controller
          control={control}
          name='account'
          render={(props) => <InputField required label='帳號' {...props} />}
        />

        <Controller
          control={control}
          name='password'
          render={(props) => <InputField required label='密碼' {...props} type="password"/>}
        />
        <Button text="提交" />
      </form>
    </div>
  );
};

export default Login;
