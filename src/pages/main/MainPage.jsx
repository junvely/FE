import { useEffect, useState } from 'react';
import MainPost from 'components/MainPost';
import { useQuery } from 'react-query';
import { getMainPosts } from 'apis/posts';
import LoadingSpinner from 'components/LoadingSpinner';
import styles from './main.module.scss';
import DropDownIcon from '../../assets/svg/toggleDropDown.svg';

function MainPage() {
  const [isSortingToggleOpen, setIsSortingToggleOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState('인기순');
  const sortingList = [
    '인기순',
    '최근 게시물 순',
    '낮은 가격 순',
    '높은 가격 순',
  ];
  const [posts, setPosts] = useState([]);

  const { data, isLoading, isError, refetch } = useQuery('mainPosts', () => {
    const result = getMainPosts({
      page: '',
      size: '',
      keyword: '',
      sorting: currentSort === '최신순' ? '최근 게시물 순' : currentSort,
      district: '',
    });
    return result;
  });

  const updatePosts = () => {
    if (data) {
      setPosts(data.content);
    }
  };

  const handleClickOpenToggle = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleClickChangeSort = e => {
    setCurrentSort(e.target.innerText);
  };

  useEffect(() => {
    updatePosts();
  }, [data]);

  useEffect(() => {
    refetch();
    updatePosts();
  }, [currentSort]);

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
          <img
            src={DropDownIcon}
            className={`${styles.toggleIcon} ${
              isSortingToggleOpen ? styles.reverse : ''
            }`}
            alt='toggle-drop-down'
          ></img>
          <div
            className={`${styles.sortingList} ${
              isSortingToggleOpen ? '' : styles.hidden
            }
            `}
          >
            {sortingList.map(sort => (
              <button
                type='button'
                className={currentSort === sort && styles.active}
                onClick={handleClickChangeSort}
              >
                {sort === '최근 게시물 순' ? '최신순' : sort}
              </button>
            ))}
          </div>
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {posts && posts.map(post => <MainPost key={post.id} post={post} />)}
    </div>
  );
}

export default MainPage;
