import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation } from 'react-router';
import styles from './slider.module.scss';
import arrowLeft from '../../../assets/svg/arrowLeft.svg';
import arrowRight from '../../../assets/svg/arrowRight.svg';
import { postMainLike } from '../../../apis/posts';
import LikeNullIcon from '../../../assets/svg/likeNull.svg';
import LikeFullIcon from '../../../assets/svg/likefull.svg';
import { AuthContext } from '../../../contexts/AuthContext';

function Slider({ post }) {
  const location = useLocation();
  const { pathname } = location;

  const images = post.postImage || post.imageUrl;
  const imageList = Array.isArray(images) ? images : [images, images, images];

  const [currentPage, setCurrentPage] = useState(0);
  const slideLength = imageList.length;

  const { checkingLogin } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const mutation = useMutation(postMainLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('mainPosts');
    },
  });

  const { id, likeStatus } = post;

  const handleLikeClick = () => {
    if (checkingLogin()) {
      mutation.mutate(id);
    }
  };

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
    <div
      className={styles.sliderCon}
      onClick={e => e.stopPropagation()}
      role='presentation'
    >
      <ul
        className={styles.slides}
        style={{
          width: `${slideLength}00%`,
          transform: `translateX(-${currentPage * (100 / slideLength)}%)`,
        }}
      >
        {imageList.map((image, idx) => (
          <li className={styles.slide}>
            <img src={image} alt={`share-office${idx}`}></img>
          </li>
        ))}
      </ul>
      {!pathname.includes('detail') && (
        <button type='button' className={styles.like} onClick={handleLikeClick}>
          {likeStatus ? (
            <img src={LikeFullIcon} alt='like-full-icon'></img>
          ) : (
            <img src={LikeNullIcon} alt='like-null-icon'></img>
          )}
        </button>
      )}
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
          {imageList.map((image, idx) => (
            <button
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
  );
}

export default Slider;
