import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../pages/mypage/mypage.module.scss';

function PostList({ post }) {
  return (
    <Link to={`/detail/${post.id}`}>
      <div className={styles.listWrap}>
        <div className={styles.listPhotoFrame}>
          <img src={post.imageUrl} alt='오피스이미지' />
        </div>
        <div className={styles.listTextWrap}>
          <p className={styles.listTitle}>{post.title}</p>
          <p className={styles.listText}>{post.location}</p>
          {/* <p className={styles.listText}>{post.title}</p> */}
        </div>
      </div>
    </Link>
  );
}

export default PostList;
