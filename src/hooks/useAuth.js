import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import axios from 'axios';
import isLoginState from '../atoms/authAtom';

const useAuth = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const updateLoginStatus = () => {
    const isToken = axios.defaults.headers.common.Access_Token;
    setIsLogin(!!isToken);
  };

  const checkingLogin = () => {
    if (isLogin) return true;
    alert('로그인시 이용 가능한 서비스입니다');
    return false;
  };

  const logout = (message = '로그아웃') => {
    delete axios.defaults.headers.common.Access_Token;
    localStorage.removeItem('isLoggedIn');
    updateLoginStatus();
    alert(`${message} 처리 되었습니다`);
    // 리프레쉬 로그아웃 처리 api 요청
  };

  useEffect(() => {
    console.log('isLogin', isLogin);
  }, [isLogin]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLogin && isLoggedIn) {
      console.log('새로고침');
      // 새로고침, 브라우저 리로드로 상태 잃을 시 마다 리프레쉬 유효 확인, 액세스 토큰 재요청API
    }
  }, []);

  return { isLogin, updateLoginStatus, checkingLogin, logout };
};

export default useAuth;
