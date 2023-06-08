import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from '../pages/mypage/mypage.module.scss';
import locationIcon from '../assets/svg/location.svg';
import priceIcon from '../assets/svg/price2.svg';
import likeNullIcon from '../assets/svg/likeBlack.svg';
import profileIcon from '../assets/svg/profileSmall.svg';

function PostList({ post }) {
  const loc = useLocation();
  let formattedStDate = null;
  let formattedEdDate = null;

  // 날짜 포맷 변경
  if (loc.pathname === '/myreservations') {
    const stDate = new Date(post.startDate);
    formattedStDate =
      stDate && format(stDate, 'yyyy. MM. dd(E)', { locale: ko });

    const edDate = new Date(post.endDate);
    formattedEdDate =
      edDate && format(edDate, 'yyyy. MM. dd(E)', { locale: ko });
  }

  return (
    <Link to={`/detail/${post.id}`}>
      <div className={styles.listWrap}>
        <div className={styles.listPhotoFrame}>
          <img src={post.imageUrl} alt='오피스이미지' />
        </div>
        <div className={styles.listTextWrap}>
          {loc.pathname === '/myreservations' && (
            <div>
              <p className={styles.listTitle}>{post.title}</p>
              <p className={styles.resListText}>{post.location}</p>
              <p className={styles.resListText}>
                {formattedStDate} ~ {` ${formattedEdDate}`}
              </p>
            </div>
          )}
          {(loc.pathname === '/likedposts' || loc.pathname === '/myposts') && (
            <div>
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
          )}
          {loc.pathname === '/chattings' && (
            <div>
              <p className={styles.listTitle}>{post.nickname}</p>
              <div>테스트 중입니다.</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default PostList;
