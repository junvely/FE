import instance from './instance/instance';

const postMakeReservation = async reservationData => {
  const { postId, startDate, endDate } = reservationData;
  const dates = { startDate, endDate };

  try {
    const { data } = await instance.post(`/api/posts/${postId}/reserve`, dates);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const getReservationSuccess = async (postId, reservationId) => {
  try {
    const { data } = await instance.get(
      `/api/posts/${postId}/reserve/${reservationId}`,
    );
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const deleteCancelReservation = async ids => {
  try {
    const { data } = await instance.delete(
      `/api/posts/${ids.postId}/reserve/${ids.reservationId}`,
    );
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

// 이미 예약된 날짜 가져오기
const getReservationList = async postId => {
  try {
    const { data } = await instance.get(`/api/posts/${postId}/reserved`);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export {
  postMakeReservation,
  getReservationSuccess,
  getReservationList,
  deleteCancelReservation,
};
