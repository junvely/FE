import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(config => {
  if (config.headers === undefined) return config;
  const accessToken = sessionStorage.getItem('Access_Token');
  const refreshToken = sessionStorage.getItem('Refresh_Token');

  if (!accessToken || !refreshToken) return config;
  // eslint-disable-next-line no-param-reassign
  config.headers.Access_Token = accessToken;
  // eslint-disable-next-line no-param-reassign
  config.headers.Refresh_Token = refreshToken;
  // 2. 매개변수를 변경하지 않고 새 객체를 생성해 서버에 config 전달하는 방법
  // const setTokenConfig = {
  //   ...config,
  //   headers: {
  //     ...config.headers,
  //     Access_Token: accessToken,
  //     Refresh_Token: accessToken,
  //   },
  // };
  // return setTokenConfig;
  return config;
});

instance.interceptors.response.use(
  response => {
    const accessToken = response.data.Access_Token;
    const refreshToken = response.data.Refresh_Token;
    if (accessToken) {
      sessionStorage.setItem('Access_Token');
    }
    if (refreshToken) {
      sessionStorage.setItem('Refresh_Token');
    }
    return response;
  },

  error => {
    const { errorCode } = error.response.data;
    // 토큰 만료시의 에러코드를 받으면 액세스 토큰 재발급 요청 API
    // if(errorCode ==="")
    return Promise.reject(error);
  },
);

export default instance;
