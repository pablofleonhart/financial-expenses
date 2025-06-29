import axios, { AxiosInstance } from 'axios';
import { SERVER_URL } from '../components/common/config';
import { getToken } from '../services';

let _authApi: AxiosInstance | undefined = undefined;

let api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Set-Cookie',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getResetApi(getToken()).patch('token/refresh');
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export function updateAuthorizationHeader() {
  api = axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Set-Cookie',
      Authorization: getToken(),
    },
  });
}

export function getAuthApi() {
  if (_authApi) {
    return _authApi;
  }
  _authApi = axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Headers': 'Set-Cookie',
      Authorization: getToken(),
    },
  });

  _authApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const res = await getResetApi(getToken()).patch('token/refresh');
        if (res.status === 200) {
          localStorage.setItem('accessToken', res.data.accessToken);
          api.defaults.headers.common.Authorization = `Bearer ${res.data.accessToken}`;
          return api(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );

  return _authApi;
}

export function getResetApi(cookies: any) {
  return axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      cookies: `refreshToken=${cookies};`,
    },
  });
}

export default api;
