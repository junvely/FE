import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(config => {
  if (config.headers === undefined) return config;
  const accessToken = sessionStorage.getItem('access_token');
  const refreshToken = sessionStorage.getItem('refresh_token');

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
      sessionStorage.setItem('access_token', accessToken);
    }
    if (refreshToken) {
      sessionStorage.setItem('refresh_token', refreshToken);
    }
    return response;
  },

  error => {
    const { errorCode } = error.response.data;
    // 리프레쉬 토큰 만료시 토큰 삭제 및 로그아웃 처리
    // if (errorCode === '') {
    //   sessionStorage.removeItem('access_token');
    //   sessionStorage.removeItem('refresh_token');
    //   window.location.href = '/login';
    // }
    // return Promise.reject(error);
  },
);

export default instance;
