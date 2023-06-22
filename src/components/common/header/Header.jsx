import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from 'components/common/header/SearchBar';
import { useMutation } from 'react-query';
import styles from './header.module.scss';
import BackArrowIcon from '../../../assets/svg/backArrow.svg';
import SearchIcon from '../../../assets/svg/serach.svg';
import LogoIcon from '../../../assets/svg/logo.svg';
import LoginIcon from '../../../assets/svg/login.svg';
import LogoutIcon from '../../../assets/svg/headerLogout.svg';
import { authLogout } from '../../../apis/auth/login';
import AirBox from '../airBox/AirBox';
import useAuth from '../../../hooks/useAuth';
import useSearchToggle from '../../../hooks/useSearchToggle';
import useSearchQuery from '../../../hooks/useSearchQuery';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { isLogin, logout } = useAuth();
  const { isSearchOpen, searchToggleSwitch } = useSearchToggle();
  const { resetSearchQuery } = useSearchQuery();

  const mutationLogout = useMutation(authLogout, {
    onSuccess: () => {
      logout();
      navigate('/main');
    },
  });

  const handleLogoutClick = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      mutationLogout.mutate();
    }
  };

  const handleLogoClick = () => {
    resetSearchQuery();
    if (isSearchOpen) {
      searchToggleSwitch();
    }
  };

  return (
    <header className={styles.header}>
      <button
        type='button'
        className={styles.backArrow}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src={BackArrowIcon} alt='goto-back'></img>
      </button>
      {!pathname.includes('room') && <AirBox width='2rem' />}
      <Link to='/main' onClick={handleLogoClick}>
        <h1 className={styles.logo}>
          <img src={LogoIcon} alt='goto-back'></img>
        </h1>
      </Link>
      <div className={styles.flexCon}>
        <button
          type='button'
          className={styles.search}
          onClick={searchToggleSwitch}
        >
          <img src={SearchIcon} alt='goto-back'></img>
        </button>
        {isLogin ? (
          !pathname.includes('room') && (
            <button
              type='button'
              className={styles.login}
              onClick={handleLogoutClick}
            >
              <img src={LogoutIcon} alt='goto-logout' />
            </button>
          )
        ) : (
          <button
            type='button'
            className={styles.login}
            onClick={() => navigate('/login')}
          >
            <img src={LoginIcon} alt='goto-login' />
          </button>
        )}
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
