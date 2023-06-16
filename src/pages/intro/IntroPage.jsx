import { Link } from 'react-router-dom';
import styles from './intro.module.scss';
import IntroStartIcon from '../../assets/svg/introStart.svg';
import LogoIcon from '../../assets/svg/logoPurple.svg';
import IntroBannerSlide from './IntroBannerSlide';

function IntroPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.backgroundWrap}>
        <div className={styles.layoutCon}>
          <div className={styles.startBanner}>
            <img src={IntroStartIcon} alt='start' />
          </div>
          <h1 className={styles.logo}>
            <img src={LogoIcon} alt='logo' />
          </h1>
          <IntroBannerSlide />
          <Link to='/login' className={styles.skipButton}>
            회원가입 / 로그인
          </Link>
          <Link to='/main' className={styles.passButton}>
            둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
