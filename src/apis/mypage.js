import instance from './instance/instance';

const getMypage = async () => {
  try {
    const { data } = await instance.get(`/api/mypage`);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const getLikedPosts = async () => {
  try {
    const { data } = await instance.get('/api/mypage/mylikes');
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const getMyPosts = async () => {
  try {
    const { data } = await instance.get('/api/mypage/myposts');
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const getMyReservations = async () => {
  try {
    const { data } = await instance.get('/api/mypage/myreserves');
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

const deleteMembership = async password => {
  try {
    const textBlob = new Blob([JSON.stringify(password)], {
      type: 'application/json',
    });
    const { status } = await instance.delete(`/api/members/signout`, {
      data: textBlob,
    });
    return status;
  } catch (err) {
    throw err.response.data;
  }
};

const putEditProfile = async payload => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const formData = new FormData();

  const profileBlob = new Blob([JSON.stringify(payload.profileDto)], {
    type: 'application/json',
  });

  const imageType = payload.imageFile.type.split('/')[1];
  const imageNameWithType = `${payload.imageFile}.${imageType}`;
  formData.append('profileDto', profileBlob);
  formData.append('imageFile', payload.imageFile, imageNameWithType);

  try {
    const { data } = await instance.put('/api/mypage/modify', formData, config);
    return data;
  } catch (err) {
    throw err.response.data;
  }
};

export {
  getMypage,
  getMyReservations,
  getLikedPosts,
  getMyPosts,
  deleteMembership,
  putEditProfile,
};
