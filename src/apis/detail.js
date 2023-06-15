import instance from './instance/instance';

const getPostDetail = async postId => {
  try {
    const { data } = await instance.get(`/api/posts/${postId}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export default getPostDetail;
