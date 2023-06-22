import { useMutation } from 'react-query';
import { useState } from 'react';
import { verifyEmail, addUser, verifyCode } from 'apis/auth/signup';
import { useNavigate } from 'react-router';
import FormLabel from 'components/FormLabel';
import Input from 'components/common/input/Input';
import styles from './signup.module.scss';

function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [code, setCode] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState('');
  const [codeMessage, setCodeMessage] = useState('');

  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [isCodeDisabled, setIsCodeDisabled] = useState(false);

  // 이메일로 메일 전송
  const mutationEmailCheck = useMutation(verifyEmail, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('메일이 전송되었습니다.');
        setIsEmailDisabled(true);
      }
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'ExistEmail') {
        alert('이미 등록된 이메일입니다.');
      }
      if (errorCode === 'InvalidEmailPattern') {
        alert('유효하지 않은 이메일 형식입니다.');
      }
      if (errorCode === 'EmailSendFailed') {
        alert('이메일 전송에 실패하였습니다.');
      }
      if (errorCode === 'AlreadyUsingEmail(Kakao)') {
        alert('이미 카카오 계정으로 가입된 아이디입니다.');
      }
    },
  });

  // 인증코드 체크
  const mutationCodeCheck = useMutation(verifyCode, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('이메일 인증이 완료되었습니다.');
        setIsCodeDisabled(true);
      }
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'WrongEmailCode') {
        alert('유효하지 않은 코드 입니다.');
      }
    },
  });

  // 회원가입
  const mutationAddUser = useMutation(addUser, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      }
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'ExistEmail') {
        alert('이미 등록된 이메일입니다.');
      } else if (errorCode === 'ExistNickname') {
        alert('이미 등록된 닉네임입니다.');
      } else if (errorCode === 'WrongEmail') {
        alert('인증을 요청한 이메일이 아닙니다.');
      } else if (errorCode === 'InvalidNicknamePattern') {
        alert('닉네임은 2~10글자로 설정해주세요.');
      } else if (errorCode === 'NotSamePassword') {
        alert('비밀번호가 서로 일치하지 않습니다.');
      } else if (errorCode === 'InvalidPasswordPattern') {
        alert(
          '비밀번호는 8-15자리, 최소 하나의 영어 대소문자, 숫자, 특수문자(@$!%*?&()_)를 포함해야 합니다.',
        );
      }
    },
  });

  // 이메일 유효성 검사
  const handleEmailChange = e => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmail(e.target.value);
    if (e.target.value.length === 0 || e.target.value.length === undefined) {
      setEmailMessage('');
    } else if (emailPattern.test(email)) {
      setEmailMessage('');
    } else {
      setEmailMessage('유효하지 않은 이메일 형식입니다.');
    }
  };

  const handleCodeChange = e => {
    setCode(e.target.value);
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = e => {
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&()_])[A-Za-z\d@$!%*?&()_]{8,15}$/;
    setPassword(e.target.value);
    if (e.target.value.length === 0 || e.target.value.length === undefined) {
      setPasswordMessage('');
    } else if (passwordPattern.test(e.target.value)) {
      setPasswordMessage('');
    } else {
      setPasswordMessage(
        '비밀번호는 8-15자리, 최소 하나의 영어 대소문자, 숫자, 특수문자(@$!%*?&()_)를 포함해야 합니다.',
      );
    }
  };

  // 비밀번호 확인 유효성검사
  const handlePasswordCheckChange = e => {
    setPasswordCheck(e.target.value);
    if (e.target.value.length === 0 || e.target.value.length === undefined) {
      setPasswordCheckMessage('');
    } else if (password === e.target.value) {
      setPasswordCheckMessage('');
    } else {
      setPasswordCheckMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  // 닉네임 유효성 검사
  const handleNicknameChange = e => {
    const nicknamePattern = /^.{2,10}$/;
    setNickname(e.target.value);
    if (e.target.value.length === 0 || e.target.value.length === undefined) {
      setNicknameMessage('');
    } else if (nicknamePattern.test(e.target.value)) {
      setNicknameMessage('');
    } else {
      setNicknameMessage('닉네임은 최소 2~10글자여야 합니다.');
    }
  };

  const handleEmailCheckBtnClick = () => {
    const validEmail = { email };
    mutationEmailCheck.mutate(validEmail);
  };

  const handleEmailReCheckBtn = () => {
    const validEmail = { email };
    mutationEmailCheck.mutate(validEmail);
    setIsCodeDisabled(false);
  };

  // 코드 유효성 검사
  const handleCodeCheckBtnClick = () => {
    if (!code) {
      setCodeMessage('코드를 입력해주세요.');
      return;
    }
    const codeData = { email, code };
    mutationCodeCheck.mutate(codeData);
  };

  // 가입하기
  const handleSignupBtnClick = () => {
    const signupData = { email, nickname, password, passwordCheck };
    mutationAddUser.mutate(signupData);
  };

  return (
    <div className={styles.container}>
      <FormLabel>회원가입</FormLabel>
      <div className={styles.inputBox}>
        <div className={styles.standard}>
          <Input
            type='email'
            name='email'
            value={email}
            readOnly={isEmailDisabled}
            placeholder='이메일을 입력해주세요.'
            className={styles.emailInput}
            onChange={handleEmailChange}
          />
          <p className={styles.message}>{emailMessage}</p>
        </div>
        <button
          type='button'
          disabled={isEmailDisabled}
          className={
            isEmailDisabled ? styles.disabledButton : styles.sendButton
          }
          onClick={handleEmailCheckBtnClick}
        >
          인증코드 발송
        </button>
        <p className={styles.reRequest}>
          인증 코드가 안 오셨나요?
          <button type='button' onClick={handleEmailReCheckBtn}>
            다시 보내기
          </button>
        </p>
        <div className={styles.standard}>
          <Input
            type='text'
            name='code'
            value={code}
            readOnly={isCodeDisabled}
            placeholder='인증코드를 입력해주세요.'
            className={styles.sendInput}
            onChange={handleCodeChange}
          />
          <p className={styles.message}>{codeMessage}</p>
        </div>
        <button
          type='button'
          disabled={isCodeDisabled}
          className={isCodeDisabled ? styles.disabledButton : styles.buttons}
          onClick={handleCodeCheckBtnClick}
        >
          확인
        </button>
        <div className={passwordMessage ? styles.pwStandard : styles.standard}>
          <Input
            type='password'
            name='password'
            value={password}
            placeholder='비밀번호 8-15자리 / 영문, 숫자, 특수문자 포함'
            className={styles.input}
            onChange={handlePasswordChange}
          />
          <p className={styles.pwMessage}>{passwordMessage}</p>
        </div>
        <div className={styles.standard}>
          <Input
            type='password'
            name='passwordCheck'
            value={passwordCheck}
            placeholder='비밀번호를 확인해주세요.'
            className={styles.input}
            onChange={handlePasswordCheckChange}
          />
          <p className={styles.message}>{passwordCheckMessage}</p>
        </div>
        <div className={styles.standard}>
          <Input
            type='text'
            name='nickname'
            value={nickname}
            placeholder='닉네임을 입력해주세요.'
            className={styles.input}
            onChange={handleNicknameChange}
          />
          <p className={styles.message}>{nicknameMessage}</p>
        </div>
        <button
          type='submit'
          className={`${styles.buttons} ${styles.btn}`}
          onClick={handleSignupBtnClick}
        >
          완료
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
