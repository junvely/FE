import { useNavigate } from 'react-router-dom';
import styles from '../pages/main/main.module.scss';
import LikeSmallIcon from '../assets/svg/likeSmall.svg';
import LocationIcon from '../assets/svg/mapSmall.svg';
import ProfileIcon from '../assets/svg/profileSmall.svg';
import PriceIcon from '../assets/svg/price.svg';
import Slider from './common/slider/Slider';

function MainPost({ post }) {
  const navigate = useNavigate();
  const { id, title, location, price, likeCount, capacity } = post;

  return (
    <div className={styles.post}>
      <Slider post={post}></Slider>
      <div
        className={styles.postContents}
        onClick={() => navigate(`/detail/${id}`)}
        role='presentation'
      >
        <h3>{title}</h3>
        <p>
          <img src={LocationIcon} alt='post-location' loading='lazy' />
          {location}
        </p>
        <p>
          <img src={PriceIcon} alt='post-price' loading='lazy' />
          <span className={styles.price}>{Number(price).toLocaleString()}</span>
          원/일
        </p>
        <div className={styles.flexCon}>
          <p>
            <img src={LikeSmallIcon} alt='post-like' loading='lazy' />
            {likeCount}
          </p>
          <p className={styles.profile}>
            <img src={ProfileIcon} alt='post-profile' loading='lazy' />
            최대 {capacity}명
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPost;
