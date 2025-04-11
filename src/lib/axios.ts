// import { useAuthStore } from '@/stores/auth/auth.store';

import axios from 'axios';

// const getTokenStore = () => {
//   const tokenStore = useAuthStore.getState().token; // Accede directamente al estado
//   return tokenStore;
// };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  // const tokenStore = useAuthStore((state) => state.token);

  // const allTokens: string[] = [];

  // for (let i = 0; i < localStorage.length; i++) {
  //   const key = localStorage.key(i);
  //   if (key && key.includes('AUTH_TOKEN')) {
  //     const token = localStorage.getItem(key);
  //     if (token) {
  //       allTokens.push(token);
  //     }
  //   }
  // }

  // const foundToken = allTokens.find((item) => item === tokenStore);

  // console.log(foundToken);

  // const part = foundToken?.slice(-3);

  // const newToken = localStorage.getItem(`AUTH_TOKEN${part}`);

  const token = sessionStorage.getItem('AUTH_TOKEN');

  // const tokenStore = getTokenStore();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
