'use client';
import useAuthenticate from '@/hooks/useAuthenticate';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const isCanViewAdmin = useAuthenticate();
  useEffect(() => {
    if (isCanViewAdmin) {
      router.push('/dashboard/list');
    } else {
      router.push('/login');
    }
  }, [isCanViewAdmin, router]);

  return (
    <div className='flex flex-col gap-4 items-center'>
      <Spin size='large'></Spin>
      <p className='text-white'>身份驗證中....</p>
    </div>
  );
};

export default Dashboard;
