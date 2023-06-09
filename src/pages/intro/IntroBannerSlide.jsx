import { useEffect, useState } from 'react';
import styles from './intro.module.scss';
import arrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import arrowRightIcon from '../../assets/svg/arrowRight.svg';
import PostIcon from '../../assets/svg/bigPost.svg';
import LocationsImage from '../../assets/svg/locationList.svg';
import ChatImage from '../../assets/svg/chat.svg';
import introBannerOutCon from '../../assets/img/introBannerOutCon.png';

function IntroBannerSlide() {
  const [currentPage, setCurrentPage] = useState(0);
  const slideLength = 4;
  const [colorChange, setColorChange] = useState(styles.colorBlue);

  const handleClickSetCurrentPage = e => {
    setCurrentPage(Number(e.target.id));
  };

  const handleClickNextSlide = () => {
    if (currentPage < slideLength - 1) {
      setCurrentPage(current => current + 1);
    }
  };

  const handleClickPrevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(current => current - 1);
    }
  };

  useEffect(() => {
    if (currentPage === 0) {
      setColorChange(styles.colorGreen);
    } else if (currentPage === 1) {
      setColorChange(styles.colorPurple);
    } else if (currentPage === 2) {
      setColorChange(styles.colorYellow);
    } else if (currentPage === 3) {
      setColorChange(styles.colorBlue);
    }
  }, [currentPage]);

  return (
    <div className={styles.sliderWrap}>
      <div className={`${styles.colorBox} ${colorChange}`} />
      <div className={styles.sliderCon}>
        <img
          src={introBannerOutCon}
          alt='banner-out-con'
          className={styles.bannerCon}
        ></img>
        <ul
          className={styles.slides}
          style={{
            width: `${slideLength}00%`,
            transform: `translateX(-${currentPage * (100 / slideLength)}%)`,
          }}
        >
          <li className={`${styles.slide} ${styles.slide1}`}>
            <h3>
              나만의 <br />
              <span className='text-[#0047FF]'>오피스 공간</span>이
              <br /> 필요하신가요?
            </h3>
            <p>
              오픽에서 손쉽게 <br />
              예약해 보세요!
            </p>
          </li>
          <li className={`${styles.slide} ${styles.slide2}`}>
            <h3>
              공유 오피스부터
              <br /> 독립 오피스까지 <br />
              <span className='text-[#0047FF] text-1xl'>
                지역별로 다양하게!
              </span>
            </h3>
            <img src={LocationsImage} alt='locations'></img>
          </li>
          <li className={`${styles.slide} ${styles.slide3}`}>
            <h3>
              호스트에게 문의는
              <br />
              채팅으로 간편하게
            </h3>
            <img src={ChatImage} alt='chat' />
            <p>
              일정 예약부터 <br />
              채팅까지 한번에!
            </p>
          </li>
          <li className={`${styles.slide} ${styles.slide4}`}>
            <h3>
              내 오피스도 <br /> 쉽고 간편하게
              <br /> 올릴 수 있으니까
            </h3>
            <span type='button' className={styles.post}>
              <img src={PostIcon} alt='post' />
            </span>
          </li>
        </ul>
        <div className={styles.sliderButtons}>
          <div>
            {Array.from({ length: slideLength }, (_, idx) => (
              <button
                key={idx}
                type='button'
                className={currentPage === idx ? styles.active : ''}
                id={idx}
                aria-label='goto-page'
                onClick={handleClickSetCurrentPage}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.arrowButtons}>
        <button type='button' onClick={handleClickPrevSlide}>
          <img src={arrowLeftIcon} alt='prev-button' />
        </button>
        <button type='button' onClick={handleClickNextSlide}>
          <img src={arrowRightIcon} alt='next-button' />
        </button>
      </div>
    </div>
  );
}

export default IntroBannerSlide;
