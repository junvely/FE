import React from 'react';
import PostList from 'components/PostList';
import { Link } from 'react-router-dom';
import styles from './chatting.module.scss';

function ChattingListPage() {
  const post = { nickname: '테스트' };
  return (
    <div>
      <Link to='/chatting/room/1'>채팅룸1</Link>
      <div className={styles.noData}>서비스 준비 중입니다.</div>
      {/* <PostList post={post} /> */}
    </div>
  );
}

export default ChattingListPage;
