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
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log(payload.image);
  const formData = new FormData();
  // const imageBlob = new Blob([payload.imageUrl], { type: 'image/png' });
  formData.append('imageFile', payload.image);

  const sendData = { ...payload };
  delete sendData.image;

  console.log(sendData);

  const blob = new Blob([JSON.stringify(sendData)], {
    type: 'application/json',
  });

  formData.append('postRequestDto', blob);

  try {
    const { data } = await instance.post(`api/posts`, formData, config);
    return data.message;
  } catch (error) {
    throw new Error(error);
  }
};

export { getMainPosts, postMainLike, postAddPost };
