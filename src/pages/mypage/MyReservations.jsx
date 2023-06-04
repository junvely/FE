import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import PostList from 'components/PostList';
import { useQuery } from 'react-query';
import { getMyReservations } from 'apis/mypage';
import styles from './mypage.module.scss';
import reservationIcon from '../../assets/svg/reservation.svg';

function MyReservations() {
  const { data, isLoading, isError } = useQuery(
    'myReservations',
    getMyReservations,
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;

  // console.log(data.data);

  return (
    <div>
      {data.data.length === 0 ? (
        <div>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={reservationIcon} alt='LikeIcon' />
              예약현황 <span>({data.data.length})</span>
            </h2>
          </div>
          <div className={styles.noData}>데이터가 없습니다.</div>
        </div>
      ) : (
        <div>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={reservationIcon} alt='LikeIcon' />
              예약현황 <span>({data.data.length})</span>
            </h2>
          </div>
          <div className={styles.pageDataWrap}>
            {data.data &&
              data.data.map(post => <PostList key={post.id} post={post} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyReservations;
