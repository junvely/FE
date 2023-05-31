import { useEffect, useState } from 'react';
import Map from 'components/common/map/Map';
import useInput from 'hooks/useInput';
import styles from './sarchLocation.module.scss';

function SearchLocationPage({ locationOpen, locationSave }) {
  const [searchInput, handleInputValueChange, inputValueChange] = useInput();
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [places, setPlaces] = useState([]);
  const [pageNums, setPageNums] = useState([]);
  const [currenPage, setCurrentPage] = useState('');

  const { kakao } = window;
  const ps = new kakao.maps.services.Places();

  const displayPagination = pagination => {
    const pageNumsArray = Array.from(
      { length: pagination.last },
      (v, i) => i + 1,
    );
    setPageNums([...pageNumsArray]);
    setCurrentPage(1);
  };

  const getFirstPageData = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces([...data]);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const updatePageData = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces([...data]);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const requestCurrentPageData = (newSearchKeyword, page) => {
    if (!searchedKeyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    const options = {
      page: page || 1,
      size: 5,
    };

    if (newSearchKeyword) {
      // Pagination 번호 클릭 시
      ps.keywordSearch(newSearchKeyword, getFirstPageData, options);
    } else if (page) {
      // 새로운 장소 클릭 시
      ps.keywordSearch(searchedKeyword, updatePageData, options);
    } else {
      // 검색 시
      ps.keywordSearch(searchedKeyword, getFirstPageData, options);
    }
    return true;
  };

  const handlePageNumClickUpdateData = page => {
    setCurrentPage(page);
    requestCurrentPageData('', page);
  };

  const handlePlaceClickUpdateData = e => {
    const { target } = e;
    let newSearchKeyword = '';
    if (target.getAttribute('name') === 'container') {
      inputValueChange(target.children[1].innerText);
      newSearchKeyword = target.children[1].innerText;
    } else if (target.getAttribute('name') === 'placeName') {
      inputValueChange(target.nextSibling.innerText);
      newSearchKeyword = target.nextSibling.innerText;
    } else if (target.getAttribute('name') === 'addressName') {
      inputValueChange(target.innerText);
      newSearchKeyword = target.innerText;
    }
    requestCurrentPageData(newSearchKeyword);
  };

  const handleSearchBtnClick = () => {
    setSearchedKeyword(searchInput);
  };

  useEffect(() => {
    setSearchedKeyword(searchInput);
  }, [inputValueChange]);

  useEffect(() => {
    if (searchedKeyword) {
      locationSave(searchedKeyword);
    }
  }, [searchedKeyword]);

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestCurrentPageData();
        }}
      >
        <input
          type='text'
          placeholder='도로명 주소를 입력해 주세요'
          name='location'
          value={searchInput || ''}
          onChange={handleInputValueChange}
        ></input>
        <button
          className={styles.submitButton}
          type='submit'
          onClick={handleSearchBtnClick}
        >
          검색
        </button>
      </form>
      <div className={styles.listCon}>
        {places.map(place => (
          <div
            name='container'
            className={styles.searchList}
            onClick={handlePlaceClickUpdateData}
            role='presentation'
          >
            <span name='placeName' role='presentation'>
              {place.place_name}
            </span>
            <p name='addressName'>{place.address_name}</p>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <ul>
          {pageNums.map(page =>
            currenPage === page ? (
              <li
                className={styles.on}
                onClick={() => handlePageNumClickUpdateData(page)}
                role='presentation'
              >
                {page}
              </li>
            ) : (
              <li
                key={page}
                onClick={() => handlePageNumClickUpdateData(page)}
                role='presentation'
              >
                {page}
              </li>
            ),
          )}
        </ul>
      </div>
      <div className={styles.mapCon}>
        <Map location={searchedKeyword}></Map>
        <button type='button' className={styles.button} onClick={locationOpen}>
          선택 완료
        </button>
      </div>
    </>
  );
}
export default SearchLocationPage;
