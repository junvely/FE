import { Navigate, Outlet } from 'react-router';

function PrivateRoutes() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <>
      {alert('로그인시 이용가능한 서비스 입니다')}
      <Navigate to='/login' />
    </>
  );
}

export default PrivateRoutes;
