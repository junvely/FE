import instance from './instance';

const getPostDetail = async postId => {
  try {
    const { data } = await instance.get(`/api/posts/${postId}`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCancelReservation = async postId => {
  try {
    const { data } = await instance.delete(`/api/posts/${postId}/reserve`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export { getPostDetail, deleteCancelReservation };
