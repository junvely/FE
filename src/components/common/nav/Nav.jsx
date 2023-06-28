import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.scss';
import homeIcon from '../../../assets/svg/home.svg';
import chattingIcon from '../../../assets/svg/chatting.svg';
import mypageIcon from '../../../assets/svg/mypage.svg';
import postIcon from '../../../assets/svg/postIcon.svg';
import useSearchQuery from '../../../hooks/useSearchQuery';

function Nav() {
  const location = useLocation();
  const { pathname } = location;
  const { resetSearchQuery } = useSearchQuery();

  const handleHomeClick = () => {
    resetSearchQuery();
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/main' onClick={handleHomeClick}>
            <img
              src={homeIcon}
              alt='home'
              className={
                pathname === '/main' ? styles.selectedIcon : styles.icon
              }
            />
          </Link>
        </li>
        <li>
          <Link to='/posting'>
            <img
              src={postIcon}
              alt='posting'
              className={
                pathname.startsWith('/posting')
                  ? styles.selectedIcon
                  : styles.icon
              }
            />
          </Link>
        </li>
        <li>
          <Link to='/chatting'>
            <img
              src={chattingIcon}
              alt='chatting'
              className={
                pathname.startsWith('/chatting')
                  ? styles.selectedIcon
                  : styles.icon
              }
            />
          </Link>
        </li>
        <li>
          <Link to='/mypage'>
            <img
              src={mypageIcon}
              alt='mypage'
              className={
                pathname === '/mypage' ||
                pathname === '/likedposts' ||
                pathname === '/myposts' ||
                pathname === '/myreservations'
                  ? styles.selectedIcon
                  : styles.icon
              }
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
