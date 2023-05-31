import { postMainLike } from 'apis/posts';
import { useMutation, useQueryClient } from 'react-query';
import styles from '../pages/main/main.module.scss';
import LikeNullIcon from '../assets/svg/likeNull.svg';
import LikeFullIcon from '../assets/svg/likefull.svg';
import LikeSmallIcon from '../assets/svg/likeSmall.svg';
import LocationIcon from '../assets/svg/mapSmall.svg';
import ProfileIcon from '../assets/svg/profileSmall.svg';
import PriceIcon from '../assets/svg/price.svg';
import Slider from './common/slider/Slider';

function MainPost({ post }) {
  const { id, title, location, price, likeCount, likeStatus } = post;
  const queryClient = useQueryClient();
  const mutation = useMutation(postMainLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('mainPosts');
    },
  });

  const handleLikeClick = () => {
    mutation.mutate(id);
  };

  return (
    <div className={styles.post}>
      <Slider images={post.postImage}></Slider>
      <div className={styles.postContents}>
        <h3>{title}</h3>
        <p>
          <img src={LocationIcon} alt='post-location' />
          {location}
        </p>
        <p>
          <img src={PriceIcon} alt='post-price' />
          <span className={styles.price}>{Number(price).toLocaleString()}</span>
          원/일
        </p>
        <div className={styles.flexCon}>
          <p>
            <img src={LikeSmallIcon} alt='post-like' />
            {likeCount}
          </p>
          <p className={styles.profile}>
            <img src={ProfileIcon} alt='post-profile' />
            최대 3명
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button type='button' className={styles.like} onClick={handleLikeClick}>
          {likeStatus ? (
            <img src={LikeFullIcon} alt='like-full-icon'></img>
          ) : (
            <img src={LikeNullIcon} alt='like-null-icon'></img>
          )}
        </button>
        <button type='button' className={styles.button}>
          예약하기
        </button>
      </div>
    </div>
  );
}

export default MainPost;
