import axios from 'axios';
import { getUserInfoFromCookies } from '@/lib/cookies';
/**
 * axios instance
 */
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_BASE_URL,
});
// request header
api.interceptors.request.use(
  async (config) => {
    const user = getUserInfoFromCookies();
    if (user) {
      config.headers.Authorization = `Bearer ${user.key}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// response parse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  },
);
