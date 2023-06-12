import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './nav.module.scss';
import homeIcon from '../../../assets/svg/home.svg';
import chattingIcon from '../../../assets/svg/chatting.svg';
import mypageIcon from '../../../assets/svg/mypage.svg';
import postIcon from '../../../assets/svg/post.svg';
import { SearchQueryContext } from '../../../contexts/SearchQueryContext';

function Nav() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { resetSearchQuery } = useContext(SearchQueryContext);

  const handleHomeClick = () => {
    resetSearchQuery();
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <Link to='/main' onClick={handleHomeClick}>
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
        <Link to='/chatting'>
          <li>
            <img src={chattingIcon} alt='chatting' className={styles.icon} />
          </li>
        </Link>
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
      </ul>
      {loc.pathname === '/main' || loc.pathname === '/detail' ? (
        <button
          type='button'
          className={styles.post}
          onClick={() => navigate('/posting')}
        >
          <img src={postIcon} alt='post' />
        </button>
      ) : null}
    </nav>
  );
}

export default Nav;
