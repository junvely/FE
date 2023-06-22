import axios from 'axios';
import {
  getCookie,
  removeCookie,
  setCookie,
} from '../../utils/helpers/cookies';
import { REACT_APP_SERVER } from '../../utils/constants/keys';

const instance = axios.create({
  baseURL: REACT_APP_SERVER,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(config => {
  if (config.headers === undefined) return config;
  const accessToken = getCookie('access_token');

  if (!accessToken) return config;
  // eslint-disable-next-line no-param-reassign
  config.headers.Access_Token = accessToken;

  return config;
});

instance.interceptors.response.use(
  response => {
    const accessToken = response.headers.access_token;

    if (accessToken) {
      setCookie('access_token', accessToken, {
        path: '/',
        expires: new Date(Date.now() + 86400000),
      });
    }
    // axios.defaults.headers.common.access_token = `${accessToken}`;

    return response;
  },

  error => {
    const message = error.response.data;
    if (
      message === '리프레쉬 토큰이 만료되어 로그인이 필요합니다.' ||
      message ===
        '리프레쉬토큰을 확인해주세요. 엑세스토큰을 갱신할 수 없습니다.'
    ) {
      removeCookie();
      alert('로그인 기간이 만료되어 로그인 페이지로 이동합니다.');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default instance;
