import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './nav.module.scss';
import homeIcon from '../../../assets/svg/home.svg';
import chattingIcon from '../../../assets/svg/chatting.svg';
import mypageIcon from '../../../assets/svg/mypage.svg';
import postIcon from '../../../assets/svg/post.svg';

function Nav() {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <ul>
        <Link to='/main'>
          <li>
            <img src={homeIcon} alt='home' className={styles.homeIcon} />
          </li>
        </Link>
        <li>
          <img
            src={chattingIcon}
            alt='chatting'
            className={styles.chattingIcon}
          />
        </li>
        <li>
          <img src={mypageIcon} alt='mypage' className={styles.mypageIcon} />
        </li>
      </ul>
      <button
        type='button'
        className={styles.post}
        onClick={() => navigate('/posting')}
      >
        <img src={postIcon} alt='post' />
      </button>
    </nav>
  );
}

export default Nav;
