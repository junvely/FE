import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { getMainPosts } from 'apis/posts';
import MainPost from 'components/MainPost';
import LoadingSpinner from 'components/LoadingSpinner';
import uuid from 'react-uuid';
import { SearchQueryContext } from '../../contexts/SearchQueryContext';
import { sortingList } from '../../utils/constants/constants';
import styles from './main.module.scss';
import DropDownIcon from '../../assets/svg/toggleDropDown.svg';

function MainPage() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState('인기순');
  const observRef = useRef(null); // 옵저버 ref

  const { searchQuery, isSearched, updateSearchQuery, resetSearchQuery } =
    useContext(SearchQueryContext);
  const { sorting, district, keyword } = searchQuery;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    'mainPosts',
    async ({ pageParam = 0 }) => {
      const res = await getMainPosts({ ...searchQuery, page: pageParam });
      return res;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // lastPage: 직전에 반환된 리턴값, pages: 지금까지 받아온 전체 페이지
        const totalPages = lastPage.totalPages || 0;
        const nextPage = allPages.length;
        return nextPage < totalPages ? nextPage : undefined;
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
    setSort(getSort);
  };

  // 옵저버 실행
  const handleObserver = useCallback(
    entries => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, isFetching],
  );

  useEffect(() => {
    updateSearchQuery({
      ...searchQuery,
      page: 0,
      sorting: sort,
    });
  }, [sort]);

  useEffect(() => {
    queryClient.removeQueries('mainPosts');
    refetch();
  }, [searchQuery]);

  useEffect(() => {
    // 옵저버 생성, 연결
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    if (observRef.current) observer.observe(observRef.current);
    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        {isSearched ? (
          <h2 className={styles.searchResult}>
            {district || '전체'} <span>{keyword && `'${keyword}'`}</span>{' '}
            검색결과 {(data && data.pages[0].totalElements) || 0}건
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
      {data &&
        data.pages.map(page =>
          page.content.map((post, index) => (
            <MainPost key={uuid()} post={post} />
          )),
        )}
      {hasNextPage && !isFetching && (
        <div ref={observRef} style={{ height: '2rem' }}>
          <LoadingSpinner />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {data && data.pages[0].content.length === 0 && (
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
