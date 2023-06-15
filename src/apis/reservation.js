import instance from './instance/instance';

const postMakeReservation = async reservationData => {
  const { postId, startDate, endDate } = reservationData;
  const dates = { startDate, endDate };

  // console.log('잘왔나보쟝', postId, startDate, endDate);

  try {
    const { data } = await instance.post(`/api/posts/${postId}/reserve`, dates);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getReservationSuccess = async postId => {
  try {
    const { data } = await instance.get(`/api/posts/${postId}/reserve`);
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

const getReservationList = async postId => {
  try {
    const { data } = await instance.get(`/api/posts/${postId}/reserved`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  postMakeReservation,
  getReservationSuccess,
  getReservationList,
  deleteCancelReservation,
};
