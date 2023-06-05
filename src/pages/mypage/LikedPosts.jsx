import React from 'react';
import { getLikedPosts } from 'apis/mypage';
import { useQuery } from 'react-query';
import LoadingSpinner from 'components/LoadingSpinner';
import PostList from 'components/PostList';
import styles from './mypage.module.scss';
import likeFullIcon from '../../assets/svg/likefull.svg';

function LikedPosts() {
  const { data, isLoading, isError } = useQuery('likedPosts', getLikedPosts);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;

  return (
    <div>
      {data.data.length === 0 ? (
        <div>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={likeFullIcon} alt='LikeIcon' />
              좋아요 <span>({data.data.length})</span>
            </h2>
          </div>
          <div className={styles.noData}>데이터가 없습니다.</div>
        </div>
      ) : (
        <div>
          <div className={styles.pageTitleBox}>
            <h2 className={styles.pageTitle}>
              <img src={likeFullIcon} alt='LikeIcon' />
              좋아요 <span>({data.data.length})</span>
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

export default LikedPosts;
