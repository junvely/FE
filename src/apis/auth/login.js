import instance from 'apis/instance/instance';

const authLogin = async payload => {
  try {
    const { data } = await instance.post('api/members/login', payload);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

const authLogout = async () => {
  try {
    await instance.post('api/members/logout');
  } catch (error) {
    throw error.response.data;
  }
};

const tokenRefresh = async () => {
  try {
    const { data } = await instance.post('api/reissue');
    return data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { authLogin, authLogout, tokenRefresh };
