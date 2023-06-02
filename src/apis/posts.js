const { default: instance } = require('./instance');

const getMainPosts = async payload => {
  try {
    const { data } = await instance.get('api/posts', {
      params: payload,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const postMainLike = async id => {
  try {
    await instance.post(`api/posts/${id}/likes`);
  } catch (error) {
    throw new Error(error);
  }
};

const postAddPost = async payload => {
  console.log(payload);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const formData = new FormData();
  const blob = new Blob([JSON.stringify(payload)], {
    type: 'application/json',
  });
  const imageBlob = new Blob([payload.image], { type: 'image/jpg' });

  formData.append('postRequestDto', blob);
  formData.append('imageFile', imageBlob);

  try {
    const { data } = await instance.post(`api/posts`, formData, config);
    return data.message;
  } catch (error) {
    throw new Error(error);
  }
};

export { getMainPosts, postMainLike, postAddPost };
