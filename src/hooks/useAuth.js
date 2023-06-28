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

  // 액세스 토큰 재발급 mutation, 성공 시 로그인 상태 업데이트
  const authMutation = useMutation(tokenRefresh, {
    onSuccess: data => {
      axios.defaults.headers.common.Access_Token = data;
    },
    onError: error => {
      if (error.message !== '리프레쉬 토큰이 만료되어 로그인이 필요합니다.') {
        logout('서버 에러로 인하여 로그아웃');
      }
    },
  });

  // 새로고침시 액세스 토큰 재발급
  const reloadTokenRefresh = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLogin && isLoggedIn) {
      authMutation.mutate();
    }
  };

  useEffect(() => {
    updateLoginStatus();
  }, [axios.defaults.headers.common.Access_Token]);

  return {
    isLogin,
    updateLoginStatus,
    checkingLogin,
    logout,
    reloadTokenRefresh,
  };
};

export default useAuth;
