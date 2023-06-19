import { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { getMainPosts } from 'apis/posts';
import MainPost from 'components/MainPost';
import LoadingSpinner from 'components/LoadingSpinner';
import uuid from 'react-uuid';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';
import { sortingList } from '../../utils/constants/constants';
import styles from './main.module.scss';
import DropDownIcon from '../../assets/svg/toggleDropDown.svg';

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('인기순');
  const [currPage, setCurrPage] = useState(0);


  const { searchQuery, isSearched, updateSearchQuery, resetSearchQuery } =
    useContext(SearchQueryContext);
  const { sorting, district, keyword } = searchQuery;

  const { data, isLoading, isError, refetch } = useQuery(
    'mainPosts',
    () => {
      const result = getMainPosts(searchQuery);
      return result;
    },
    {
      onSuccess: postsData => {
        setPosts(postsData.content);
      },
    },
  );

  const [isSortingToggleOpen, setIsSortingToggleOpen] = useState(false);

  const handleOpenToggleClick = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleChangeSortClick = e => {
    const getSort =
      e.target.innerText === '최신 순' ? '최근 게시물 순' : e.target.innerText;
    setCurrPage(0);
    setSort(getSort);
  };

  useEffect(() => {
    updateSearchQuery({
      ...searchQuery,
      page: currPage,
      sorting: sort,
    });
  }, [currPage, sort]);

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        {isSearched ? (
          <h2 className={styles.searchResult}>
            {district || '전체'} <span>{keyword && `'${keyword}'`}</span>{' '}
            검색결과 {(data && data.totalElements) || 0}건
          </h2>
        ) : (
          <h2 className={styles.title}>오늘의 Pick!</h2>
        )}

        <button
          type='button'
          className={styles.toggleBtn}
          onClick={handleOpenToggleClick}
        >
          {sorting === '최근 게시물 순' ? '최신 순' : sorting}
          <img
            src={DropDownIcon}
            className={`${styles.toggleIcon} ${
              isSortingToggleOpen ? styles.reverse : undefined
            }`}
            alt='toggle-drop-down'
          ></img>
          <div
            className={`${styles.sortingList} ${
              !isSortingToggleOpen ? styles.hidden : undefined
            }
            `}
          >
            {sortingList.map(sortList => (
              <div
                key={uuid()}
                type='button'
                className={sorting === sortList ? styles.active : undefined}
                onClick={handleChangeSortClick}
                role='presentation'
              >
                {sortList}
              </div>
            ))}
          </div>
        </button>
      </div>
      {posts.map(post => (
        <MainPost key={post.id} post={post} />
      ))}
      {isLoading && <LoadingSpinner />}
      {data && posts.length === 0 && (
        <div className={styles.notFound}>
          <p>검색 결과가 존재하지 않습니다.</p>
          <button type='button' onClick={resetSearchQuery}>
            홈으로 돌아가기
          </button>
        </div>
      )}
      {isError && (
        <div className={styles.notFound}>
          <p>페이지를 찾을 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default MainPage;
