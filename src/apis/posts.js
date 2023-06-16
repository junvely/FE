const { default: instance } = require('./instance/instance');

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

  const formData = new FormData();
  const sendData = { ...payload };
  delete sendData.imageList;

  const postBlob = new Blob([JSON.stringify(sendData)], {
    type: 'application/json',
  });

  // 멀티 이미지 Blob
  formData.append('postRequestDto', postBlob);
  payload.imageList.forEach(image => {
    const imageBlob = new Blob([image], {
      type: image.type,
    });
    formData.append('imageFile', imageBlob);
  });

  try {
    const { data } = await instance.post(`api/posts`, formData, config);
    return data.message;
  } catch (error) {
    throw new Error(error);
  }
};

const deletePost = async id => {
  try {
    const { data } = await instance.delete(`/api/posts/${id}`);
    return data.message;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export { getMainPosts, postMainLike, postAddPost, deletePost };
