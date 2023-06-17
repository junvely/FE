import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMutation, useQueryClient } from 'react-query';
import { deleteCancelReservation } from 'apis/reservation';
import styles from '../pages/mypage/mypage.module.scss';
import locationIcon from '../assets/svg/location.svg';
import priceIcon from '../assets/svg/price2.svg';
import likeNullIcon from '../assets/svg/likeBlack.svg';
import profileIcon from '../assets/svg/profileSmall.svg';

function PostList({ post }) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  let formattedStDate = null;
  let formattedEdDate = null;

  // 날짜 포맷 변경
  if (location.pathname === '/myreservations') {
    const stDate = new Date(post.startDate);
    formattedStDate =
      stDate && format(stDate, 'yyyy. MM. dd(E)', { locale: ko });

    const edDate = new Date(post.endDate);
    formattedEdDate =
      edDate && format(edDate, 'yyyy. MM. dd(E)', { locale: ko });
  }

  // 예약 취소
  const mutationDeleteReservation = useMutation(deleteCancelReservation, {
    onSuccess: result => {
      if (result.status === 'OK') {
        queryClient.invalidateQueries('myReservations');
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

  const handleClickCancel = e => {
    e.preventDefault();
    const ids = { postId: post.postId, reservationId: post.reservationId };
    mutationDeleteReservation.mutate(ids);
  };

  const handleClickConfirm = e => {
    e.preventDefault();
    navigate(`/reservationSuccess/${post.postId}/${post.reservationId}`);
  };

  return (
    <Link to={`/detail/${post.postId}`}>
      {location.pathname === '/myreservations' && (
        <div className={styles.listWrap}>
          <div className={styles.resListPhotoFrame}>
            <img src={post.imageUrl} alt='오피스이미지' />
          </div>
          <div className={styles.listTextWrap}>
            <p className={styles.resListTitle}>{post.title}</p>
            <p className={styles.resListText}>{post.location}</p>
            <p className={styles.resListDate}>
              {formattedStDate} ~ {` ${formattedEdDate}`}
            </p>
            <div>
              <button
                type='button'
                className={styles.resBtn}
                onClick={e => handleClickCancel(e)}
              >
                예약취소
              </button>
              <button
                type='button'
                className={styles.resBtn}
                onClick={e => handleClickConfirm(e)}
              >
                예약확인
              </button>
            </div>
          </div>
        </div>
      )}
      {(location.pathname === '/likedposts' ||
        location.pathname === '/myposts') && (
        <div className={styles.listWrap}>
          <div className={styles.listPhotoFrame}>
            <img src={post.imageUrl[0]} alt='오피스이미지' />
          </div>
          <div className={styles.listTextWrap}>
            <p className={styles.listTitle}>{post.title}</p>
            <p className={styles.listText}>
              <img src={locationIcon} alt='위치 아이콘' /> {post.location}
            </p>
            <p className={styles.listText}>
              <img src={priceIcon} alt='금액 아이콘' />
              <span className={styles.priceText}>
                {post.price.toLocaleString()}
              </span>
              &nbsp;원/일
            </p>
            <div className={styles.listFlexWrap}>
              <p className={styles.listText}>
                <img src={likeNullIcon} alt='좋아요 아이콘' />
                {post.likeCount}
              </p>
              <p className={styles.capaText}>
                <img src={profileIcon} alt='인원수 아이콘' />
                최대 {post.capacity}명
              </p>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default PostList;
