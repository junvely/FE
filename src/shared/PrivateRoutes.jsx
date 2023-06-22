import { Navigate, Outlet } from 'react-router';
import useAuth from '../hooks/useAuth';

function PrivateRoutes() {
  const { isLogin } = useAuth();
  console.log('isLogin', isLogin);

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
