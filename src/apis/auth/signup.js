import instance from 'apis/instance/instance';

const verifyEmail = async validEmail => {
  try {
    const { data } = await instance.post('/api/email/auth', validEmail);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const verifyCode = async codeData => {
  try {
    const { data } = await instance.post('/api/email/check', codeData);
    return data;
  } catch (err) {
    alert('유효하지 않은 코드입니다.');
    throw err.response.data;
  }
};

const addUser = async signupData => {
  try {
    const { data } = await instance.post('/api/members/signup', signupData);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export { verifyEmail, verifyCode, addUser };
