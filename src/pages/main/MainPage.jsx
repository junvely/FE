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
  const { searchQuery, updateSearchQuery, resetSearchQuery } =
    useContext(SearchQueryContext);
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

  const handleOpenToggleClick = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleChangeSortClick = e => {
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

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        <h2 className={styles.title}>오늘의 Pick!</h2>
        <button
          type='button'
          className={styles.toggleBtn}
          onClick={handleOpenToggleClick}
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
                onClick={handleChangeSortClick}
              >
                {sort}
              </button>
            ))}
          </div>
        </button>
      </div>
      {isLoading && <LoadingSpinner />}
      {posts.map(post => (
        <MainPost key={post.id} post={post} />
      ))}
      {data && data.content.length === 0 && (
        <div className={styles.notFound}>
          <p>검색 결과가 존재하지 않습니다.</p>
          <button type='button' onClick={resetSearchQuery}>
            홈으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
