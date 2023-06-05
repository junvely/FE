import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './nav.module.scss';
import homeIcon from '../../../assets/svg/home.svg';
import chattingIcon from '../../../assets/svg/chatting.svg';
import mypageIcon from '../../../assets/svg/mypage.svg';
import postIcon from '../../../assets/svg/post.svg';
import logoutIcon from '../../../assets/svg/logout.svg';

function Nav() {
  const navigate = useNavigate();
  const loc = useLocation();

  return (
    <nav className={styles.nav}>
      <ul>
        <Link to='/main'>
          <li>
            <img
              src={homeIcon}
              alt='home'
              className={
                loc.pathname === '/main' ? styles.selectedIcon : styles.icon
              }
            />
          </li>
        </Link>
        <li>
          <img src={chattingIcon} alt='chatting' className={styles.icon} />
        </li>
        <Link to='/mypage'>
          <li>
            <img
              src={mypageIcon}
              alt='mypage'
              className={
                loc.pathname === '/mypage' ? styles.selectedIcon : styles.icon
              }
            />
          </li>
        </Link>
        <Link to='/login'>
          <li>
            <img src={logoutIcon} alt='logout' className={styles.logoutIcon} />
          </li>
        </Link>
      </ul>
      {loc.pathname === '/login' ||
      loc.pathname === '/signup' ||
      loc.pathname === '/reservation' ||
      loc.pathname === '/posting' ? null : (
        <button
          type='button'
          className={styles.post}
          onClick={() => navigate('/posting')}
        >
          <img src={postIcon} alt='post' />
        </button>
      )}
    </nav>
  );
}

export default Nav;
