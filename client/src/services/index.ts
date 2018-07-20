export const APIRoot = 'http://localhost:8000/api';

export const headers = (token: string) => {
  return {
    headers: { 'authorization': `Token ${token}` },
  };
};

export { default as auth } from './auth';
