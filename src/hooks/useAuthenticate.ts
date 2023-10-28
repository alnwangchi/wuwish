'use client';
import { authorization } from '@/constance';
import { getCookie, setCookie } from 'cookies-next';

export const authenticationService = (account: string, password: string) => {
  if (account === authorization.account && password === authorization.password) {
    setCookie('account', authorization.account);
    setCookie('password', authorization.password);
    return true;
  }
  return false;
};

const useAuthenticate = () => {
  if (
    authenticationService(
      (getCookie('account') as string) || '',
      (getCookie('password') as string) || ''
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export default useAuthenticate;
