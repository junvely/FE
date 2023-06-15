import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './intro.module.scss';
import IntroStartIcon from '../../assets/svg/introStart.svg';
import LogoIcon from '../../assets/svg/logoPurple.svg';
import PeoplesImage from '../../assets/svg/introPeoples.svg';
import IntroBannerSlide from './IntroBannerSlide';

function IntroPage() {
  const [start, setStart] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.backgroundWrap}>
        <div className={styles.layoutCon}>
          <div
            className={`${styles.startBanner} ${start && styles.start}`}
            onClick={() => setStart(true)}
            role='presentation'
          >
            <img src={IntroStartIcon} alt='start' />
            <span>CLICK!</span>
          </div>
          <h1 className={styles.logo}>
            <img src={LogoIcon} alt='logo' />
          </h1>
          <IntroBannerSlide />
          <div className={styles.buttons}>
            <Link to='/login' className={styles.skipButton}>
              로그인
            </Link>
            <Link to='/main' className={styles.passButton}>
              둘러보기
            </Link>
          </div>
          <img
            className={styles.peoplesImage}
            src={PeoplesImage}
            alt='peoples'
          ></img>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
