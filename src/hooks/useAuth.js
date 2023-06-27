import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import isLoginState from '../atoms/authAtom';
import { tokenRefresh } from '../apis/auth/login';

const useAuth = () => {
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);

  const updateLoginStatus = () => {
    const isToken = axios.defaults.headers.common.Access_Token;
    setIsLogin(!!isToken);
  };

  // 액세스 토큰 재발급 mutation, 성공 시 로그인 상태 업데이트
  const authMutation = useMutation(tokenRefresh, {
    onSuccess: data => {
      axios.defaults.headers.common.Access_Token = data;
    },
  });

  const checkingLogin = () => {
    if (isLogin) return true;
    alert('로그인시 이용 가능한 서비스입니다');
    return false;
  };

  const logout = (message = '로그아웃') => {
    delete axios.defaults.headers.common.Access_Token;
    localStorage.removeItem('isLoggedIn');
    alert(`${message} 처리 되었습니다`);
  };

  // 새로고침시 액세스 토큰 재발급
  const reloadTokenRefresh = async () => {
    authMutation.mutate();
  };

  useEffect(() => {
    console.log('isLogin', isLogin);
  }, [isLogin]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLogin && isLoggedIn) {
      reloadTokenRefresh();
    }
  }, []);

  useEffect(() => {
    updateLoginStatus();
  }, [axios.defaults.headers.common.Access_Token]);

  return { isLogin, updateLoginStatus, checkingLogin, logout };
};

export default useAuth;
