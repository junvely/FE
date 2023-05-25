import instance from 'apis/instance';

const authLogin = async payload => {
  try {
    const { data } = await instance.post('api/members/login', payload);
    return data;
  } catch (error) {
    const errorMessage = error.response.data.msg;
    console.log(errorMessage);
    throw error;
  }
};

const refreshAccessToken = async () => {
  try {
    const { data } = await instance.post('api/members/newaccess');
    return data;
  } catch (error) {
    const errorMessage = error.response.data.msg;
    console.log(errorMessage);
    throw error;
  }
};

export { authLogin, refreshAccessToken };
