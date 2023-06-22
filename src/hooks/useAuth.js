import { useRecoilState } from 'recoil';
import isLoginState from '../atoms/authAtom';
import { getCookie, removeCookie } from '../utils/helpers/cookies';

const useAuth = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const updateLoginStatus = () => {
    const token = getCookie('access_token');
    setIsLogin(!!token);
  };

  const checkingLogin = () => {
    if (isLogin) {
      return true;
    }
    alert('로그인시 이용 가능한 서비스입니다');
    return false;
  };

  const logout = () => {
    removeCookie();
    updateLoginStatus();
    alert('로그아웃 처리 되었습니다');
  };

  return { isLogin, updateLoginStatus, checkingLogin, logout };
};

export default useAuth;
