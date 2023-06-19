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
  const observRef = useRef(null); // 옵저버 ref
  const preventRef = useRef(true); // 중복 방지 옵션
  const endRef = useRef(false); // 마지막 페이지면 옵저버 끄는 옵션
  const [displayObserv, setDisplayObserv] = useState(false); // 옵저버 display

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
        const { first, last, content } = postsData;
        preventRef.current = true; // 데이터 성공 시 다시 옵저버 실행 조건 true

        if (first) {
          setDisplayObserv(true); // 첫 페이지면 옵저버 버튼 생성(첫 로드 시 옵저버 실행 방지 위해 데이터 받은 후 보이게 설정)
          setCurrPage(0);
          setPosts(content);
          endRef.current = false;
        } else if (!first && last) {
          setDisplayObserv(false); // 마지막 페이지 시 옵저버 버튼 숨김
          endRef.current = true; // 마지막 페이지면 옵저버 실행 옵션 끄기
        } else {
          setDisplayObserv(true);
          setPosts(prev => [...prev, ...content]);
        }
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

  // 옵저버 실행
  const handleObserver = entries => {
    const target = entries[0];
    // 옵저버 중복 실행 방지 위해 한번 실행 후 데이터 성공시 까지 preventRef.current 옵션 false설정
    if (!endRef.current && target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setCurrPage(curr => curr + 1);
    }
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

  useEffect(() => {
    // 옵저버 생성, 연결
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: '100px',
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
      {posts.map((post, index) =>
        index === posts.length - 1 && displayObserv ? (
          <div key={post.id} ref={observRef} style={{ height: '2rem' }}>
            <LoadingSpinner />
          </div>
        ) : (
          <MainPost key={uuid()} post={post} />
        ),
      )}
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
