import { Link, useNavigate } from 'react-router-dom';
import SearchBar from 'components/common/header/SearchBar';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import styles from './header.module.scss';
import BackArrowIcon from '../../../assets/svg/backArrow.svg';
import SearchIcon from '../../../assets/svg/serach.svg';
import LogoIcon from '../../../assets/svg/logo.svg';
import LoginIcon from '../../../assets/svg/login.svg';
import LogoutIcon from '../../../assets/svg/headerLogout.svg';
import { searchToggleContext } from '../../../contexts/SearchToggleContext';
import { SearchQueryContext } from '../../../contexts/SearchQueryContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { authLogout } from '../../../apis/auth/login';
import { removeCookie } from '../../../utils/cookies';

function Header() {
  const navigate = useNavigate();
  const { searchToggleSwitch } = useContext(searchToggleContext);
  const { resetSearchQuery } = useContext(SearchQueryContext);
  const { isLogin, updateLoginStatus } = useContext(AuthContext);

  const mutationLogout = useMutation(authLogout, {
    onSuccess: () => {
      removeCookie();
      updateLoginStatus();
      alert('로그아웃 처리 되었습니다');
      navigate('/main');
    },
  });

  const handleLogoutClick = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      mutationLogout.mutate();
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
      <Link to='/main' onClick={resetSearchQuery}>
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
          <button
            type='button'
            className={styles.login}
            onClick={handleLogoutClick}
          >
            <img src={LogoutIcon} alt='goto-logout' />
          </button>
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
