import useForm from 'hooks/useForm';
import { useMutation } from 'react-query';
import authLogin from 'apis/auth/login';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import KakaoButton from '../../assets/img/kakaoButton.png';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&response_type=code`;

function LoginPage() {
  const navigate = useNavigate();
  const initialState = {
    email: '',
    password: '',
  };

  const [form, handleFormChange, resetForm] = useForm(initialState);
  const { email, password } = form;

  const mutation = useMutation(authLogin, {
    onSuccess: result => {
      alert(result.message);
      navigate('/main');
      resetForm();
    },
    onError: error => {
      const { errorCode } = error.response.data;
      if (errorCode === 'NotExistEmail') {
        alert('등록되지 않은 이메일입니다.');
      } else if (errorCode === 'NotSamePassword') {
        alert('비밀번호가 일치하지 않습니다.');
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

  return (
    <div>
      <input
        type='text'
        name='email'
        value={email}
        placeholder='아이디를 입력해주세요.'
        onChange={handleFormChange}
      ></input>
      <input
        type='password'
        name='password'
        value={password}
        placeholder='비밀번호를 입력해주세요.'
        onChange={handleFormChange}
      ></input>
      <button type='submit' onClick={handleLoginBtnClick}>
        LOGIN
      </button>
      <Link to={KAKAO_AUTH_URL} className={styles.kakaoButton}>
        <img src={KakaoButton} alt='kakao-button'></img>
      </Link>
    </div>
  );
}

export default LoginPage;
