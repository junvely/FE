import axios from 'axios';
import { REACT_APP_SERVER } from '../../utils/constants/keys';
import { tokenRefresh } from '../auth/login';

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

  async error => {
    const { config, response } = error;
    const { message } = response.data;
    const errorCode = response.data;

    const onLogout = () => {
      delete axios.defaults.headers.common.Access_Token;
      localStorage.removeItem('isLoggedIn');
      alert('로그인 기간이 만료되어 로그인 페이지로 이동합니다.');
      window.location.href = '/login';
    };

    if (errorCode === 'TOKEN_ERROR') {
      // 액세스 토큰 만료 시 재발급
      const data = await tokenRefresh();
      if (data) axios.defaults.headers.common.Access_Token = data;

      // 다시 이전요청 보내는 로직
      const originalRequests = config;
      const accessToken = axios.defaults.headers.common.Access_Token;
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        originalRequests.headers.Access_Token = accessToken;
        await axios(originalRequests);
      }
    }

    // 리프레쉬 만료 시 로그아웃 처리
    if (
      errorCode === '엑세스토큰은 무효하고, 리프레쉬토큰이 없습니다.' ||
      message === '리프레쉬 토큰이 만료되어 로그인이 필요합니다.'
    ) {
      onLogout();
    }
    return Promise.reject(error);
  },
);

export default instance;
