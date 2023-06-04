import instance from './instance';

const getMypage = async () => {
  try {
    const { data } = await instance.get(`/api/mypage`);
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const getLikedPosts = async () => {
  try {
    const { data } = await instance.get('/api/mypage/mylikes');
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const getMyPosts = async () => {
  try {
    const { data } = await instance.get('/api/mypage/myposts');
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const getMyReservations = async () => {
  try {
    const { data } = await instance.get('/api/mypage/myreserves');
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteWithdrawal = async password => {
  try {
    const textBlob = new Blob([JSON.stringify(password)], {
      type: 'application/json',
    });
    const { status } = await instance.delete(`/api/members/signout`, {
      data: textBlob,
    });
    return status;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  getMypage,
  getMyReservations,
  getLikedPosts,
  getMyPosts,
  deleteWithdrawal,
};
