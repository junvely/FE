import useForm from 'hooks/useForm';
import { useMutation } from 'react-query';
import { authLogin } from 'apis/auth/login';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './login.module.scss';
import KakaoButton from '../../assets/img/kakaoButton.png';
import Input from '../../components/common/input/Input';
import FormLabel from '../../components/FormLabel';
import AirBox from '../../components/common/airBox/AirBox';
import { KAKAO_AUTH_URL } from '../../utils/constants/keys';
import useAuth from '../../hooks/useAuth';

function LoginPage() {
  const navigate = useNavigate();
  const { isLogin, updateLoginStatus } = useAuth();
  const initialState = {
    email: '',
    password: '',
  };

  const [form, handleFormChange, resetForm] = useForm(initialState);
  const [isActiveLogin, setIsActiveLogin] = useState(false);
  const { email, password } = form;

  const mutation = useMutation(authLogin, {
    onSuccess: () => {
      updateLoginStatus();
      navigate('/main');
      resetForm();
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'NotExistEmail') {
        alert('등록되지 않은 이메일입니다.');
      } else if (errorCode === 'WrongPassword') {
        alert('비밀번호를 확인해주세요.');
      }
    },
  });

  const handleLoginBtnClick = () => {
    if (!email || !password) {
      alert('입력란을 모두 입력해주세요.');
      return;
    }
    mutation.mutate(form);
  };

  const handleKakaoLogin = () => {
    if (isLogin) {
      alert('이미 로그인된 회원입니다');
      navigate('/main');
    } else {
      window.location.href = `${KAKAO_AUTH_URL}`;
    }
  };

  useEffect(() => {
    if (email && password) {
      setIsActiveLogin(true);
    } else {
      setIsActiveLogin(false);
    }
  }, [email, password]);

  return (
    <div className={styles.wrap}>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleLoginBtnClick();
        }}
      >
        <FormLabel>간편 로그인</FormLabel>
        <button
          type='button'
          onClick={handleKakaoLogin}
          className={styles.kakaoButton}
        >
          <img src={KakaoButton} alt='kakao-button' />
        </button>
        <AirBox height='2.25rem' />
        <FormLabel>이메일 로그인</FormLabel>
        <Input
          type='text'
          name='email'
          value={email}
          placeholder='이메일을 입력해 주세요'
          onChange={handleFormChange}
        ></Input>
        <Input
          type='password'
          name='password'
          value={password}
          placeholder='비밀번호를 입력해 주세요'
          onChange={handleFormChange}
        ></Input>
        <button
          type='submit'
          className={`${styles.loginButton} ${isActiveLogin && styles.active}`}
        >
          로그인
        </button>
        <p className={styles.signup}>
          아직 회원이 아니신가요?<Link to='/signup'>회원가입</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
