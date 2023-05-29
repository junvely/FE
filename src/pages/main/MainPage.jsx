import { useState } from 'react';
import MainPost from 'components/MainPost';
import styles from './main.module.scss';
import DropDownIcon from '../../assets/svg/toggleDropDown.svg';
import DropUpIcon from '../../assets/svg/toggleDropUp.svg';
import SampleSlide from '../../assets/svg/sampleSlide.jpg';

function MainPage() {
  const [isSortingToggleOpen, setIsSortingToggleOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('최신순');
  const sortingList = ['최신순', '인기순', '낮은 가격순', '높은 가격순'];

  const data = [
    {
      id: 0,
      title: 'BIXPACE [3인 독립룸]',
      content: '서울 중랑구 광나루로 382 아스하임4차 3층',
      price: '10000',
      username: 'username',
      image: [SampleSlide, SampleSlide, SampleSlide, SampleSlide, SampleSlide],
      category: 'category',
      location: '서울 중랑구 광나루로 382 아스하임4차 3층',
      startDate: '2023-05-28',
      endDate: '2023-05-30',
      likeCount: 26,
      likeStatus: true,
      CreatedAt: '2023-05-20',
      ModifiedAt: '2023-05-20',
    },
    {
      id: 1,
      title: 'BIXPACE [3인 독립룸]',
      content: '서울 중랑구 광나루로 382 아스하임4차 3층',
      price: '10000',
      username: 'username',
      image: [SampleSlide, SampleSlide, SampleSlide],
      category: 'category',
      location: '서울 중랑구 광나루로 382 아스하임4차 3층',
      startDate: '2023-05-28',
      endDate: '2023-05-30',
      likeCount: 26,
      likeStatus: false,
      CreatedAt: '2023-05-20',
      ModifiedAt: '2023-05-20',
    },
  ];

  const handleClickOpenToggle = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleClickChangeSort = e => {
    setCurrentSort(e.target.innerText);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        <h2 className={styles.title}>오늘의 Pick!</h2>
        <button
          type='button'
          className={styles.toggleBtn}
          onClick={handleClickOpenToggle}
        >
          {currentSort}
          {isSortingToggleOpen ? (
            <img
              src={DropUpIcon}
              className={styles.toggleIcon}
              alt='toggle-drop-up'
            ></img>
          ) : (
            <img
              src={DropDownIcon}
              className={styles.toggleIcon}
              alt='toggle-drop-down'
            ></img>
          )}
          {isSortingToggleOpen && (
            <div className={styles.sortingList}>
              {sortingList.map(sort => (
                <button
                  type='button'
                  key={data.id}
                  className={currentSort === sort ? styles.active : ''}
                  onClick={handleClickChangeSort}
                >
                  {sort}
                </button>
              ))}
            </div>
          )}
        </button>
      </div>
      {data.map(post => (
        <MainPost key={data.id} post={post} />
      ))}
    </div>
  );
}

export default MainPage;
