import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoutes() {
  const { isLogin } = useContext(AuthContext);

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
