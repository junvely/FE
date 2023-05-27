import { useMutation } from 'react-query';
import useForm from 'hooks/useForm';
import { useState } from 'react';
import { verifyEmail, addUser, verifyCode } from 'apis/auth/signup';

function SignupPage() {
  const initialState = {
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    code: '',
  };

  const [form, handleFormChange] = useForm(initialState);
  const { email, nickname, password, passwordCheck, code } = form;
  const [isDisabled, setIsDisabled] = useState(false);

  // 이메일로 메일 전송
  const mutationEmailCheck = useMutation(verifyEmail, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('메일이 전송되었습니다.');
      }
    },
    onError: error => {
      const { errorCode } = error.response.data;
      if (errorCode === 'InvalidEmail') {
        alert('유효하지 않은 이메일 형식입니다.');
      }
    },
  });

  // 인증코드 체크
  const mutationCodeCheck = useMutation(verifyCode, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('이메일 인증이 완료되었습니다.');
        setIsDisabled(true);
      }
    },
    onError: error => {
      const { errorCode } = error.response.data;
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
      }
    },
    onError: error => {
      const { errorCode } = error.response.data;
      if (errorCode.errorCode === 'ExistEmail') {
        alert('이미 등록된 이메일입니다.');
      } else if (errorCode.errorCode === 'ExistNickname') {
        alert('이미 등록된 닉네임입니다.');
      } else if (errorCode.errorCode === 'InvalidNicknamePattern') {
        alert('닉네임은 최소 2~10글자여야 합니다.');
      } else if (errorCode.errorCode === 'NotSamePassword') {
        alert('비밀번호가 서로 일치하지 않습니다.');
      } else if (errorCode.errorCode === 'InvalidPasswordPattern') {
        alert(
          '비밀번호는 8-15자리, 최소 하나의 영어 대소문자, 숫자, 특수문자(@$!%*?&()_)를 포함해야 합니다.',
        );
      }
    },
  });

  // 이메일, 닉네임, 비밀번호 유효성 검사
  const handleEmailCheckBtnClick = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicknamePattern = /^[a-zA-Z0-9가-힣]{2,10}$/;
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&()_])[A-Za-z\d@$!%*?&()_]{8,15}$/;

    if (!nicknamePattern.test(nickname)) {
      alert('닉네임은 최소 2~10글자여야 합니다.');
    } else if (!passwordPattern.test(password)) {
      alert(
        '비밀번호는 8-15자리, 최소 하나의 영어 대소문자, 숫자, 특수문자(@$!%*?&()_)를 포함해야 합니다.',
      );
    } else if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (emailPattern.test(email)) {
      const validEmail = { email };
      mutationEmailCheck.mutate(validEmail);
    } else {
      alert('올바른 이메일 형식을 입력하세요.');
    }
  };

  // 코드 빈 칸 검사
  const handleCodeCheckBtnClick = () => {
    if (!code) {
      alert('코드를 입력해주세요.');
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
    <div>
      <input
        type='email'
        name='email'
        value={email}
        placeholder='이메일을 입력해주세요.'
        className='border border-black'
        onChange={handleFormChange}
      />
      <input
        type='text'
        name='nickname'
        value={nickname}
        placeholder='닉네임을 입력해주세요.'
        className='border border-black'
        onChange={handleFormChange}
      />
      <input
        type='password'
        name='password'
        value={password}
        placeholder='비밀번호 8-15자리 / 영문, 숫자, 특수문자 포함'
        className='border border-black'
        onChange={handleFormChange}
      />
      <input
        type='password'
        name='passwordCheck'
        value={passwordCheck}
        placeholder='비밀번호를 확인해주세요.'
        className='border border-black'
        onChange={handleFormChange}
      />
      <button
        type='button'
        className='border border-black'
        onClick={handleEmailCheckBtnClick}
      >
        이메일 인증
      </button>
      <input
        type='text'
        name='code'
        value={code}
        placeholder='인증코드를 입력해주세요.'
        className='border border-black'
        onChange={handleFormChange}
      />
      <button
        type='button'
        disabled={isDisabled}
        className='border border-black'
        onClick={handleCodeCheckBtnClick}
      >
        인증하기
      </button>
      <button
        type='submit'
        className='border border-black'
        onClick={handleSignupBtnClick}
      >
        가입하기
      </button>
    </div>
  );
}

export default SignupPage;
