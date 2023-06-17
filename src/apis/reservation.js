import instance from './instance/instance';

const postMakeReservation = async reservationData => {
  const { postId, startDate, endDate } = reservationData;
  const dates = { startDate, endDate };

  try {
    const { data } = await instance.post(`/api/posts/${postId}/reserve`, dates);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getReservationSuccess = async (postId, reservationId) => {
  try {
    const { data } = await instance.get(
      `/api/posts/${postId}/reserve/${reservationId}`,
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteCancelReservation = async ids => {
  try {
    const { data } = await instance.delete(
      `/api/posts/${ids.postId}/reserve/${ids.reservationId}`,
    );
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

// 이미 예약된 날짜 가져오기
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
