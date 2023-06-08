import { Link } from 'react-router-dom';
import styles from './intro.module.scss';
import Logoicon from '../../assets/svg/logoPurple.svg';
import PeoplesImage from '../../assets/svg/introPeoples.svg';
import IntroBannerSlide from './IntroBannerSlide';

function IntroPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.backgroundWrap}>
        <div className={styles.layoutCon}>
          <h1 className={styles.logo}>
            <img src={Logoicon} alt='logo' />
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
