import authKakaoLogin from 'apis/auth/kakao';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../assets/img/loadingSpinner.gif';

function RedirectKakaoPage() {
  const navigate = useNavigate();
  const redirectCode = new URL(window.location.href).searchParams.get('code');
  const { data, isError } = useQuery('kakaoAuth', async () => {
    const result = await authKakaoLogin(redirectCode);
    return result;
  });

  const redirectHandler = () => {
    if (data) {
      alert('로그인 성공');
      navigate('/main');
    } else if (isError) {
      alert('로그인 실패');
      navigate('/login');
    }
    return false;
  };

  useEffect(() => {
    redirectHandler();
  }, [data]);

  return (
    <div className='h-screen flex justify-center items-center'>
      <img src={LoadingSpinner} alt='loading-spinner'></img>
    </div>
  );
}

export default RedirectKakaoPage;
