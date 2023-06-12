import instance from 'apis/instance/instance';

const authLogin = async payload => {
  try {
    const { data } = await instance.post('api/members/login', payload);
    return data;
  } catch (error) {
    console.log('error', error);
    throw error.response.data;
  }
};

const authLogout = async () => {
  try {
    await instance.post('api/members/logout');
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export { authLogin, authLogout };
