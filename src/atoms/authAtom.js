import { atom } from 'recoil';
import { getCookie } from '../utils/helpers/cookies';

const isToken = !!getCookie('access_token');

const isLoginState = atom({
  key: 'isLoginState',
  default: isToken,
});

export default isLoginState;
