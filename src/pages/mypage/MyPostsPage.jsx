import React from 'react';
import { getMyPosts } from 'apis/mypage';
import { useQuery } from 'react-query';
import LoadingSpinner from 'components/LoadingSpinner';
import PostList from 'components/PostList';
import styles from './mypage.module.scss';
import officeIcon from '../../assets/svg/office.svg';

function MyPostsPage() {
  const { data, isLoading, isError } = useQuery('myPosts', getMyPosts);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;
  return (
    <div className={styles.pageContainer}>
      {data.data.length === 0 ? (
        <div className={styles.pageWrap}>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={officeIcon} alt='LikeIcon' />
              나의 오피스 <span>({data.data.length})</span>
            </h2>
          </div>
          <div className={styles.noData}>데이터가 없습니다.</div>
        </div>
      ) : (
        <div className={styles.pageWrap}>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={officeIcon} alt='LikeIcon' />
              나의 오피스 <span>({data.data.length})</span>
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

export default MyPostsPage;
