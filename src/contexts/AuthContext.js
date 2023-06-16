import { createContext, useEffect, useMemo, useState } from 'react';
import { getCookie } from '../utils/helpers/cookies';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const isToken = !!getCookie('access_token');
  const [isLogin, setIsLogin] = useState(isToken);

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

  const isLoginValue = useMemo(
    () => ({
      isLogin,
      updateLoginStatus,
      checkingLogin,
    }),
    [isLogin, updateLoginStatus],
  );

  // 웹이 로드되면 바로 로그인 상태 업데이트
  useEffect(() => {
    updateLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={isLoginValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
