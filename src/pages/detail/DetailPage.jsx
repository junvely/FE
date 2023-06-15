import React, { useContext, useEffect } from 'react';
import Slider from 'components/common/slider/Slider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteCancelReservation, getPostDetail } from 'apis/detail';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { deletePost, postMainLike } from 'apis/posts';
import { postMakeChattingRoom } from 'apis/chatting';
import { useRecoilState } from 'recoil';
import editingState from 'recoil/atom';
import styles from './detail.module.scss';
import locationIcon from '../../assets/svg/mapSmall.svg';
import priceIcon from '../../assets/svg/price.svg';
import likeSmallIcon from '../../assets/svg/likeSmall.svg';
import profileSmallIcon from '../../assets/svg/profileSmall.svg';
import likeNullIcon from '../../assets/svg/likeBlack.svg';
import likeFullIcon from '../../assets/svg/likefull.svg';
import chattingIcon from '../../assets/svg/chatting.svg';
import profileImage from '../../assets/img/profileDefault.png';
import Map from '../../components/common/map/Map';
import { AuthContext } from '../../contexts/AuthContext';

function DetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const { checkingLogin } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useRecoilState(editingState);

  // 데이터 가져오기
  const { data, isLoading, isError } = useQuery('postDetail', () =>
    getPostDetail(postId),
  );

  // 좋아요 토글
  const mutationLikedPost = useMutation(postMainLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('postDetail');
    },
  });

  // 포스트 삭제
  const mutationDeletePost = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('mainPosts');
      alert('게시글이 삭제되었습니다.');
      navigate('/main');
    },
  });

  // 예약 취소
  const mutationDeleteReservation = useMutation(deleteCancelReservation, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('예약이 취소되었습니다.');
      }
    },
    onError: error => {
      const { errorCode } = error.response.data;
      if (errorCode === 'NotReserved') {
        alert('예약 취소는 예약자만 가능합니다.');
      }
      if (errorCode === 'NotExistPost') {
        alert('존재하지 않는 게시글 입니다.');
      }
    },
  });

  // 채팅 방 생성
  const mutationChatting = useMutation(postMakeChattingRoom, {
    onSuccess: result => {
      const { userStatus } = data.data;
      console.log('방 생성한 유저 상태', userStatus);
      console.log('방 생성 결과', result);
      if (result.status === 'OK') {
        if (userStatus === 1 || userStatus === 2) {
          navigate(`/chatting/room/${result.data}`);
        } else if (userStatus === 3) {
          navigate('/chatting');
        }
      }
    },
    onError: error => {
      alert('채팅 방이 생성되지 않았습니다. 다시 시도해주세요.');
    },
  });

  // 예약하기 클릭 시 이동
  const handleClickResBtn = () => {
    if (data.data.userStatus === 0) {
      alert('로그인이 필요한 기능입니다.');
      navigate('/login');
    }
    if (data.data.userStatus === 1) {
      navigate('/reservation', { state: { postId } });
    }
    if (data.data.userStatus === 2) {
      mutationDeleteReservation.mutate(postId);
    }
  };

  // 좋아요 토글
  const handleClickLikeBtn = () => {
    if (checkingLogin()) {
      mutationLikedPost.mutate(postId);
    }
  };

  const handleDeleteClick = () => {
    mutationDeletePost.mutate(postId);
  };

  const handleClickChattingBtn = () => {
    mutationChatting.mutate(postId);
  };

  const handleUpdateClick = () => {
    setIsEditing(true);
    navigate('/posting', { state: { postId } });
  };

  console.log(data && data.data.userStatus);
  console.log(data && data.data);

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {isError && <div>데이터 처리 중 ERROR가 발생하였습니다.</div>}
      {data && (
        <div>
          <Slider post={data.data} />
          <div className={styles.wrap}>
            <h2 className={styles.title}>{data.data.title}</h2>
            <div className={styles.buttonBox}>
              <div className={styles.profileBox}>
                <img src={profileImage} alt='프로필 이미지' />
                <div>
                  <p className={styles.host}>호스트</p>
                  <p>{data.data.nickname}</p>
                </div>
              </div>
              <div>
                <button
                  type='button'
                  className={styles.likeButton}
                  onClick={handleClickLikeBtn}
                >
                  <img
                    src={data.data.likeStatus ? likeFullIcon : likeNullIcon}
                    alt='likeButton'
                    className={styles.likeIcon}
                  />
                </button>
                <button
                  type='button'
                  className={styles.chattingButton}
                  onClick={handleClickChattingBtn}
                >
                  <img
                    src={chattingIcon}
                    alt='chattingButton'
                    className={styles.chattingIcon}
                  />
                </button>
              </div>
            </div>
            <button
              type='button'
              alt='reservationButton'
              className={styles.reservationButton}
              onClick={handleClickResBtn}
            >
              예약하기
            </button>
            <div className={styles.infobox}>
              <p className={styles.paragraph}>
                <img src={locationIcon} alt='location' />
                {data.data.location}
              </p>
              <p className={styles.paragraph}>
                <img src={priceIcon} alt='price' />
                <p>
                  <span className={styles.price}>
                    {data.data.price.toLocaleString()}
                  </span>
                  원/일
                </p>
              </p>
              <p className={styles.paragraph}>
                <span className={styles.paragraph}>
                  <img src={likeSmallIcon} alt='likesCounter' />
                  {data.data.likeCount}
                </span>
                <span className={`${styles.paragraph} ml-2.5`}>
                  <img src={profileSmallIcon} alt='headcount' />
                  최대 {data.data.capacity}명
                </span>
              </p>
            </div>
            <div>
              <h3 className={styles.subTitle}>오피스 소개</h3>
              <div className={styles.contentBox}>{data.data.content}</div>
              <h3 className={styles.subTitle}>운영 시간</h3>
              <div className={styles.contentBox}>{data.data.operatingTime}</div>
              <h3 className={styles.subTitle}>추가 안내</h3>
              <div className={styles.contentBox}>
                {data.data.contentDetails}
              </div>
              <h3 className={styles.subTitle}>편의시설</h3>
              <div className={styles.contentBox}>{data.data.amenities}</div>
              <h3 className={styles.subTitle}>오시는 길</h3>
              <Map location={data.data.location} />
              <div className={styles.buttonWrap}>
                {data.data.userStatus === 3 && (
                  <div>
                    <button
                      type='button'
                      className={styles.deleteButton}
                      onClick={handleDeleteClick}
                    >
                      삭제
                    </button>
                    <button
                      type='button'
                      className={styles.updateButton}
                      onClick={handleUpdateClick}
                    >
                      수정
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
