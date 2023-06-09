import { Link, useNavigate } from 'react-router-dom';
import SearchBar from 'components/common/header/SearchBar';
import { useContext } from 'react';
import styles from './header.module.scss';
import BackArrowIcon from '../../../assets/svg/backArrow.svg';
import SearchIcon from '../../../assets/svg/serach.svg';
import LogoIcon from '../../../assets/svg/logo.svg';
import LoginIcon from '../../../assets/svg/login.svg';
import { searchToggleContext } from '../../../contexts/SearchToggleContext';
import { SearchQueryContext } from '../../../contexts/SearchQueryContext';

function Header() {
  const navigate = useNavigate();
  const { searchToggleSwitch } = useContext(searchToggleContext);
  const { resetSearchQuery } = useContext(SearchQueryContext);

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
        <button
          type='button'
          className={styles.login}
          onClick={() => navigate('/login')}
        >
          <img src={LoginIcon} alt='goto-back'></img>
        </button>
      </div>
      <SearchBar />
    </header>
  );
}

export default Header;
