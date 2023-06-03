import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from '../utils/cookies';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(config => {
  if (config.headers === undefined) return config;
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

  if (!accessToken || !refreshToken) return config;
  // eslint-disable-next-line no-param-reassign
  config.headers.Access_Token = accessToken;
  // eslint-disable-next-line no-param-reassign
  config.headers.Refresh_Token = refreshToken;

  return config;
});

instance.interceptors.response.use(
  response => {
    const accessToken = response.headers.access_token;
    const refreshToken = response.headers.refresh_token;
    if (accessToken) {
      setCookie('access_token', accessToken);
    }
    if (refreshToken) {
      setCookie('refresh_token', refreshToken);
    }
    return response;
  },

  error => {
    const { errorCode } = error.response.data;
    // 리프레쉬 토큰 만료시 토큰 삭제 및 로그아웃 처리
    if (errorCode === 'refresh') {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      alert('로그인 기간이 만료되어 로그인 페이지로 이동합니다');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
