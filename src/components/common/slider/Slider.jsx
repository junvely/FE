import { useState } from 'react';
import styles from './slider.module.scss';
import arrowLeft from '../../../assets/svg/arrowLeft.svg';
import arrowRight from '../../../assets/svg/arrowRight.svg';

function Slider({ images }) {
  const [currentPage, setCurrentPage] = useState(0);
  const slideLength = images.length;

  const handleClickSetCurrentPage = e => {
    setCurrentPage(Number(e.target.id));
    console.log('target', e.target.id, 'current', currentPage);
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
    <div className={styles.sliderCon}>
      <ul
        className={styles.slides}
        style={{
          width: `${slideLength}00%`,
          transform: `translateX(-${currentPage * (100 / slideLength)}%)`,
        }}
      >
        {images.map((image, idx) => (
          <li className={styles.slide}>
            <img src={image} alt={`share-office${idx}`}></img>
          </li>
        ))}
      </ul>
      <div className={styles.arrowButtons}>
        <button type='button' onClick={handleClickPrevSlide}>
          <img src={arrowLeft} alt='prev-button' />
        </button>
        <button type='button' onClick={handleClickNextSlide}>
          <img src={arrowRight} alt='next-button' />
        </button>
      </div>
      <div className={styles.sliderButtons}>
        <div>
          {images.map((image, idx) => (
            <button
              className={currentPage === idx ? styles.active : ''}
              type='button'
              id={idx}
              aria-label='goto-page'
              onClick={handleClickSetCurrentPage}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
