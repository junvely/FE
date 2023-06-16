export const {
  REACT_APP_SERVER,
  REACT_APP_REST_API_KEY,
  REACT_APP_KAKA0_MAP_KEY,
  REACT_APP_REDIRECT_URL,
} = process.env;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code`;
