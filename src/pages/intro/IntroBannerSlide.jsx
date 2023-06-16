import { useState } from 'react';
import uuid from 'react-uuid';
import styles from './intro.module.scss';
import arrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import arrowRightIcon from '../../assets/svg/arrowRight.svg';
import SlideImage1 from '../../assets/svg/introSlide1.svg';
import SlideImage2 from '../../assets/svg/introSlide2.svg';
import SlideImage3 from '../../assets/svg/introSlide3.svg';
import SlideImage4 from '../../assets/svg/introSlide4.svg';

function IntroBannerSlide() {
  const [currentPage, setCurrentPage] = useState(0);
  const slideLength = 4;

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

  return (
    <div className={styles.sliderWrap}>
      <div className={styles.sliderCon}>
        <ul
          className={styles.slides}
          style={{
            width: `${slideLength}00%`,
            transform: `translateX(-${currentPage * (100 / slideLength)}%)`,
          }}
        >
          <li className={`${styles.slide} ${styles.slide1}`}>
            <img src={SlideImage1} alt='slide1' />
            <h3>
              나만의 <br />
              {['오', '피', '스', '공', '간'].map(string => (
                <span key={uuid()}>{string}</span>
              ))}
              이
              <br /> 필요하신가요?
            </h3>
            <p>
              오픽에서 손쉽게 <br />
              예약해 보세요!
            </p>
          </li>
          <li className={`${styles.slide} ${styles.slide2}`}>
            <img src={SlideImage2} alt='slide2' />
            <h3>
              공유 오피스부터
              <br /> 독립 오피스까지 <br />
              {['지', '역', '별', '로 ', ' 다', '양', '하', '게'].map(
                string => (
                  <span key={uuid()}>{string}</span>
                ),
              )}
            </h3>
          </li>
          <li className={`${styles.slide} ${styles.slide3}`}>
            <img src={SlideImage3} alt='slide3' />
            <h3>
              호스트에게 문의는
              <br />
              {['채', '팅', '으', '로', '간', '편', '하', '게'].map(string => (
                <span key={uuid()}>{string}</span>
              ))}
            </h3>
            <p>
              일정 예약부터 <br />
              채팅까지 한번에!
            </p>
          </li>
          <li className={`${styles.slide} ${styles.slide4}`}>
            <img src={SlideImage4} alt='slide4' />
            <h3>
              {['내', '오', '피', '스'].map(string => (
                <span key={uuid()}>{string}</span>
              ))}
              도
              <br /> 쉽고 간편하게
              <br /> 올릴 수 있어요!
            </h3>
            <p>지금 사용해 보세요</p>
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
