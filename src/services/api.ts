import axios from 'axios';
import { API_BASE } from '../app/constants';
import { refreshToken } from './auth.service';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => { if (error) prom.reject(error); else prom.resolve(token); });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return axios(originalRequest);
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      return new Promise(async (resolve, reject) => {
        try {
          const res = await refreshToken();
          const newToken = res.data.token;
          localStorage.setItem('access_token', newToken);
          api.defaults.headers.common.Authorization = 'Bearer ' + newToken;
          processQueue(null, newToken);
          resolve(api(originalRequest));
        } catch (e) {
          processQueue(e, null);
          reject(e);
        } finally { isRefreshing = false; }
      });
    }
    const normalized = { message: err.response?.data?.message || err.message, code: err.response?.data?.code || 'UNKNOWN', status: err.response?.status || 500 };
    return Promise.reject(normalized);
  }
);
export default api;
