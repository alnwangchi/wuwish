'use client';
import useAuthenticate from '@/hooks/useAuthenticate';
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

  return <></>;
};

export default Dashboard;
