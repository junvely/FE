import axios from 'axios';
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
  const accessToken = axios.defaults.headers.common.Access_Token;
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Access_Token = accessToken;
  }
  return config;
});

instance.interceptors.response.use(
  response => {
    if (!response.data.data) return response;
    const { accessToken } = response.data.data;
    if (accessToken) {
      axios.defaults.headers.common.Access_Token = `${accessToken}`;
      localStorage.setItem('isLoggedIn', true);
    }

    return response;
  },

  error => {
    const message = error.response.data;
    // if (
    //   message === '리프레쉬 토큰이 만료되어 로그인이 필요합니다.' ||
    //   message ===
    //     '리프레쉬토큰을 확인해주세요. 엑세스토큰을 갱신할 수 없습니다.'
    // ) {
    //   removeCookie();
    //   alert('로그인 기간이 만료되어 로그인 페이지로 이동합니다.');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  },
);

export default instance;
