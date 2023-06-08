import React from 'react';
import PostList from 'components/PostList';
import styles from './chatting.module.scss';

function ChattingPage() {
  const post = { nickname: '테스트' };
  return (
    <div>
      <div className={styles.noData}>서비스 준비 중입니다.</div>
      {/* <PostList post={post} /> */}
    </div>
  );
}

export default ChattingPage;
