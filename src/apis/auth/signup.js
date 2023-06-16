import instance from 'apis/instance/instance';

const verifyEmail = async validEmail => {
  try {
    const { data } = await instance.post('/api/email/auth', validEmail);
    console.log('이메일 전송 결과', data);
    return data;
  } catch (err) {
    alert('이메일 전송에 실패했습니다.');
    throw err.response.data;
  }
};

const verifyCode = async codeData => {
  try {
    const { data } = await instance.post('/api/email/check', codeData);
    console.log('코드 인증 결과', data);
    return data;
  } catch (err) {
    alert('유효하지 않은 코드입니다.');
    throw err.response.data;
  }
};

const addUser = async signupData => {
  try {
    const { data } = await instance.post('/api/members/signup', signupData);
    console.log('가입 결과', data);
    return data;
  } catch (err) {
    console.log('회원가입이 처리되지 않았습니다. 다시 시도해 주십시오.');
    throw err.response.data;
  }
};

export { verifyEmail, verifyCode, addUser };
