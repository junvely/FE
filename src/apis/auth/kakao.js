import instance from 'apis/instance/instance';

const authKakaoLogin = async code => {
  try {
    const { data } = await instance.get(`/oauth/kakao?code=${code}`);
    return data.message;
  } catch (error) {
    alert(`카카오 로그인 에러 발생 : ${error.response.data.status}`);
    throw error.response.data;
  }
};

export default authKakaoLogin;
