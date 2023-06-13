import axios from 'axios';
import { getCookie, removeCookie, setCookie } from '../../utils/cookies';
import { REACT_APP_SERVER } from '../../utils/keys';

const instance = axios.create({
  baseURL: REACT_APP_SERVER,
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
      setCookie('access_token', accessToken, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
    if (refreshToken) {
      setCookie('refresh_token', refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
    }
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
