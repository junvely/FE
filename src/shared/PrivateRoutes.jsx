import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoutes() {
  const { isLogin, updateLoginStatus } = useContext(AuthContext);

  // useEffect(() => {
  //   updateLoginStatus();
  // }, []);

  return isLogin ? (
    <Outlet />
  ) : (
    <>
      {alert('로그인시 이용가능한 서비스 입니다')}
      <Navigate to='/login' />
    </>
  );
}

export default PrivateRoutes;
