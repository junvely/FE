import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router';
import uuid from 'react-uuid';
import styles from './slider.module.scss';
import arrowLeft from '../../../assets/svg/arrowLeft.svg';
import arrowRight from '../../../assets/svg/arrowRight.svg';
import { postMainLike } from '../../../apis/posts';
import LikeNullIcon from '../../../assets/svg/likeNull.svg';
import LikeFullIcon from '../../../assets/svg/likefull.svg';
import useAuth from '../../../hooks/useAuth';

function Slider({ post }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const { checkingLogin } = useAuth();
  const { id, likeStatus, userStatus, likeCount } = post;
  const isMain = pathname.includes('main');
  const isMyPost = userStatus === 3;

  const [currentPage, setCurrentPage] = useState(0);
  const images = post && (post.postImages || post.imageUrl);
  const slideLength = images && images.length;

  const queryClient = useQueryClient();
  const mutation = useMutation(postMainLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('mainPosts');
    },
  });

  console.log(post.likeCount);
  const handleLikeClick = () => {
    if (checkingLogin()) {
      mutation.mutate(id);
    }
  };

  const handleClickSetCurrentPage = e => {
    const { page } = e.target.dataset;
    setCurrentPage(Number(page));
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
      <div
        className={styles.slides}
        style={{
          width: `${slideLength}00%`,
          transform: `translateX(-${currentPage * (100 / slideLength)}%)`,
        }}
      >
        {images &&
          images.map((image, idx) => (
            <div
              key={uuid()}
              className={styles.slide}
              onClick={() => isMain && navigate(`/detail/${post.id}`)}
              role='presentation'
            >
              <img
                src={image}
                alt={`share-office${idx}`}
                loading={idx === 0 ? null : 'lazy'}
              />
            </div>
          ))}
      </div>
      {isMain && !isMyPost && (
        <button
          type='button'
          className={styles.like}
          onClick={e => {
            e.stopPropagation();
            handleLikeClick();
          }}
        >
          {likeStatus ? (
            <img src={LikeFullIcon} alt='like-full-icon'></img>
          ) : (
            <img src={LikeNullIcon} alt='like-null-icon'></img>
          )}
        </button>
      )}
      <div
        className={styles.arrowButtons}
        onClick={() => isMain && navigate(`/detail/${post.id}`)}
        role='presentation'
      >
        <button
          type='button'
          onClick={e => {
            e.stopPropagation();
            handleClickPrevSlide();
          }}
        >
          <img src={arrowLeft} alt='prev-button' />
        </button>
        <button
          type='button'
          onClick={e => {
            e.stopPropagation();
            handleClickNextSlide();
          }}
        >
          <img src={arrowRight} alt='next-button' />
        </button>
      </div>
      <div className={styles.sliderButtons}>
        <div>
          {images &&
            images.map((image, idx) => (
              <button
                key={uuid()}
                type='button'
                className={currentPage === idx ? styles.active : ''}
                data-page={idx}
                aria-label='goto-page'
                onClick={e => {
                  e.stopPropagation();
                  handleClickSetCurrentPage(e);
                }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
