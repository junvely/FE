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
  const [page, setPage] = useState(1);
  const [displayObserv, setDisplayObserv] = useState(false);
  const observRef = useRef(null);
  const preventRef = useRef(true);
  const endRef = useRef(false);

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
        setDisplayObserv(true);
        if (page === 1) {
          console.log('page=1');
          setPosts(postsData.content);
        } else if (postsData.last) {
          setDisplayObserv(false);
          endRef.current = true;
        } else {
          console.log('page=2,3 postsData');
          preventRef.current = true;
          setPosts(prev => [...prev, ...postsData.content]);
        }
      },
    },
  );
  console.log(searchQuery);
  const [isSortingToggleOpen, setIsSortingToggleOpen] = useState(false);

  const handleOpenToggleClick = () => {
    setIsSortingToggleOpen(!isSortingToggleOpen);
  };

  const handleChangeSortClick = e => {
    setPage(1);
    updateSearchQuery({
      ...searchQuery,
      page,
      sorting:
        e.target.innerText === '최신 순'
          ? '최근 게시물 순'
          : e.target.innerText,
    });
  };

  const handleObserver = entries => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      console.log('일어남');
      setPage(curr => curr + 1);
    }
  };

  useEffect(() => {
    updateSearchQuery({
      ...searchQuery,
      page,
    });
  }, [page]);

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (observRef.current) observer.observe(observRef.current);
    return () => {
      observer.disconnect();
    };
  }, [handleObserver, observRef.current]);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleCon}>
        {isSearched ? (
          <h2 className={styles.searchResult}>
            {district || '전체'} <span>{keyword && `'${keyword}'`}</span>{' '}
            검색결과 {(data && data.numberOfElements) || 0}건
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
            {sortingList.map(sort => (
              <div
                key={uuid()}
                type='button'
                className={sorting === sort ? styles.active : undefined}
                onClick={handleChangeSortClick}
                role='presentation'
              >
                {sort}
              </div>
            ))}
          </div>
        </button>
      </div>
      {posts.map((post, index) =>
        index === posts.length - 1 && displayObserv ? (
          <div ref={observRef} style={{ height: '1rem' }}>
            {/* <LoadingSpinner /> */}
          </div>
        ) : (
          <MainPost key={uuid()} post={post} />
        ),
      )}
      {isLoading && <LoadingSpinner />}
      {data && data.content.length === 0 && (
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
