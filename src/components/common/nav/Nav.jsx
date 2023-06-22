import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styles from './nav.module.scss';
import homeIcon from '../../../assets/svg/home.svg';
import chattingIcon from '../../../assets/svg/chatting.svg';
import mypageIcon from '../../../assets/svg/mypage.svg';
import postIcon from '../../../assets/svg/postIcon.svg';
import useSearchQuery from '../../../hooks/useSearchQuery';
import {
  isScrollTopState,
  scrollTopClikedState,
} from '../../../atoms/scrollTopAtom';

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
        <Link to='/main' onClick={handleHomeClick}>
          <li>
            <img
              src={homeIcon}
              alt='home'
              className={
                pathname === '/main' ? styles.selectedIcon : styles.icon
              }
            />
          </li>
        </Link>
        <Link to='/posting'>
          <li>
            <img
              src={postIcon}
              alt='posting'
              className={
                pathname.startsWith('/posting')
                  ? styles.selectedIcon
                  : styles.icon
              }
            />
          </li>
        </Link>
        <Link to='/chatting'>
          <li>
            <img
              src={chattingIcon}
              alt='chatting'
              className={
                pathname.startsWith('/chatting')
                  ? styles.selectedIcon
                  : styles.icon
              }
            />
          </li>
        </Link>
        <Link to='/mypage'>
          <li>
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
          </li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
