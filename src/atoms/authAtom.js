import axios from 'axios';
import { atom } from 'recoil';

const isToken = !!axios.defaults.headers.common.Access_Token;
const isLoginState = atom({
  key: 'isLoginState',
  default: isToken,
});

export default isLoginState;
