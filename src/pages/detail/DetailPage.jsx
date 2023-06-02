import React, { useState } from 'react';
import Slider from 'components/common/slider/Slider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteCancelReservation, getPostDetail } from 'apis/detail';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner';
import { postMainLike } from 'apis/posts';
import styles from './detail.module.scss';
import locationIcon from '../../assets/svg/mapSmall.svg';
import priceIcon from '../../assets/svg/price.svg';
import likeSmallIcon from '../../assets/svg/likeSmall.svg';
import profileSmallIcon from '../../assets/svg/profileSmall.svg';
import likeNullIcon from '../../assets/svg/likeNull.svg';
import likeFullIcon from '../../assets/svg/likefull.svg';
import chattingIcon from '../../assets/svg/chatting.svg';

function DetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  // 예약 취소
  const mutationDeleteReservation = useMutation(deleteCancelReservation, {
    onSuccess: result => {
      if (result.status === '200') {
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;

  const {
    id,
    title,
    location,
    price,
    capacity,
    content,
    operatingTime,
    contentDetails,
    amenities,
    likeStatus,
    likeCount,
    imageUrl,
    userStatus,
  } = data.data;

  console.log(userStatus);

  // 예약하기 클릭 시 이동
  const handleClickResBtn = () => {
    if (userStatus === 0) {
      navigate('/login');
    }
    if (userStatus === 1) {
      navigate('/reservation');
    }
    if (userStatus === 2) {
      mutationDeleteReservation.mutate(postId);
    }
  };

  // 좋아요 토글
  const handleClickLikeBtn = () => {
    mutationLikedPost.mutate(postId);
  };

  return (
    <div className={styles.container}>
      <Slider images={imageUrl} />
      <div className={styles.wrap}>
        <h2 className={styles.title}>{title}</h2>
        {userStatus === 3 ? null : (
          <div className={styles.buttonBox}>
            <button
              type='button'
              className={styles.likeButton}
              onClick={handleClickLikeBtn}
            >
              <img
                src={likeStatus ? likeFullIcon : likeNullIcon}
                alt='likeButton'
                className={styles.likeIcon}
              />
            </button>
            <button type='button' className={styles.chattingButton}>
              <img
                src={chattingIcon}
                alt='chattingButton'
                className={styles.chattingIcon}
              />
            </button>
            <button
              type='button'
              alt='reservationButton'
              className={styles.reservationButton}
              onClick={handleClickResBtn}
            >
              {userStatus === 2 ? '예약취소' : '예약하기'}
            </button>
          </div>
        )}
        <div className={styles.infobox}>
          <p className={styles.paragraph}>
            <img src={locationIcon} alt='location' />
            {location}
          </p>
          <p className={styles.paragraph}>
            <img src={priceIcon} alt='price' />
            <p>
              <span className={styles.price}>{price.toLocaleString()}</span>
              원/일
            </p>
          </p>
          <p className={styles.paragraph}>
            <span className={styles.paragraph}>
              <img src={likeSmallIcon} alt='likesCounter' />
              {likeCount}
            </span>
            <span className={`${styles.paragraph} ml-2.5`}>
              <img src={profileSmallIcon} alt='headcount' />
              최대 {capacity}명
            </span>
          </p>
        </div>
        <div>
          <h3 className={styles.subTitle}>오피스 소개</h3>
          <pre id='pre' className={styles.contentBox}>
            {content}
          </pre>
          <h3 className={styles.subTitle}>운영 시간</h3>
          <pre id='pre' className={styles.contentBox}>
            {operatingTime}
          </pre>
          <h3 className={styles.subTitle}>추가 안내</h3>
          <pre id='pre' className={styles.contentBox}>
            {contentDetails}
          </pre>
          <h3 className={styles.subTitle}>편의시설</h3>
          <pre id='pre' className={styles.contentBox}>
            {amenities}
          </pre>
          <h3 className={styles.subTitle}>오시는 길</h3>
          <div className={styles.map}>지도 영역</div>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
