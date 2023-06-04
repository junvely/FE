import { useContext, useEffect, useState } from 'react';
import MainPost from 'components/MainPost';
import { useQuery } from 'react-query';
import { getMainPosts } from 'apis/posts';
import LoadingSpinner from 'components/LoadingSpinner';
import styles from './main.module.scss';
import DropDownIcon from '../../assets/svg/toggleDropDown.svg';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';

function MainPage() {
  const [posts, setPosts] = useState([]);
  const { searchQuery, updateSearchQuery } = useContext(SearchQueryContext);
  const { sorting } = searchQuery;

  const { data, isLoading, isError, refetch } = useQuery('mainPosts', () => {
    const result = getMainPosts({
      ...searchQuery,
      sorting: sorting === '최신 순' ? '최근 게시물 순' : sorting,
    });
    return result;
  });

  const [isSortingToggleOpen, setIsSortingToggleOpen] = useState(false);
  const sortingList = ['인기순', '최신 순', '낮은 가격 순', '높은 가격 순'];

  const handleClickOpenToggle = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleClickChangeSort = e => {
    updateSearchQuery({ ...searchQuery, sorting: e.target.innerText });
  };

  const updatePostData = () => {
    if (data) {
      setPosts(data.content);
    }
  };

  useEffect(() => {
    updatePostData();
  }, [data]);

  useEffect(() => {
    refetch();
    updatePostData();
  }, [searchQuery]);

  useEffect(() => {
    console.log('refetch');
  }, [refetch]);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        <h2 className={styles.title}>오늘의 Pick!</h2>
        <button
          type='button'
          className={styles.toggleBtn}
          onClick={handleClickOpenToggle}
        >
          {sorting}
          <img
            src={DropDownIcon}
            className={`${styles.toggleIcon} ${
              isSortingToggleOpen && styles.reverse
            }`}
            alt='toggle-drop-down'
          ></img>
          <div
            className={`${styles.sortingList} ${
              !isSortingToggleOpen && styles.hidden
            }
            `}
          >
            {sortingList.map(sort => (
              <button
                type='button'
                className={sorting === sort && styles.active}
                onClick={handleClickChangeSort}
              >
                {sort}
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
