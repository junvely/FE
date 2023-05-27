import React, { useState } from 'react';
import Input from 'components/common/Input/Input';
import Map from 'components/common/map/Map';
import styles from './sarchLocation.module.scss';

function SearchLocationPage() {
  const [searchInput, setSearchInput] = useState('');
  const [places, setPlaces] = useState([]);
  const [pages, setPages] = useState([]);
  const [currenPage, setCurrentPage] = useState('');

  const { kakao } = window;
  const ps = new kakao.maps.services.Places();

  const displayPagination = pagination => {
    const pagesArray = Array.from({ length: pagination.last }, (v, i) => i + 1);
    setPages([...pagesArray]);
    setCurrentPage(1);
  };

  const searchedResultStatusHandler = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces([...data]);
      console.log('초기 검색값 :', data);
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  };

  const updatePlaces = data => {
    setPlaces([...data]);
  };

  const searchPlaces = page => {
    if (!searchInput.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }
    const options = {
      page: page || 1,
      size: 7,
    };

    if (page) {
      ps.keywordSearch(searchInput, updatePlaces, options);
    } else {
      ps.keywordSearch(searchInput, searchedResultStatusHandler, options);
    }
    return true;
  };

  const handlePageNumClick = page => {
    setCurrentPage(page);
    searchPlaces(page);
  };

  const handlePlaceClick = e => {
    const { target } = e;
    if (target.getAttribute('name') === 'container') {
      setSearchInput(target.children[1].innerText);
    } else if (target.getAttribute('name') === 'placeName') {
      setSearchInput(target.nextSibling.innerText);
    } else if (target.getAttribute('name') === 'addressName') {
      setSearchInput(target.innerText);
    }
    searchPlaces();
  };

  const handleInputChange = e => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          searchPlaces();
        }}
      >
        <Input
          type='text'
          placeholder='도로명 주소를 입력해 주세요'
          value={searchInput || ''}
          onChange={handleInputChange}
        ></Input>
        <button type='submit'>검색</button>
      </form>
      <div>
        {places.map(place => (
          <div
            name='container'
            className={styles.searchList}
            onClick={handlePlaceClick}
            role='presentation'
          >
            <span name='placeName' role='presentation'>
              {place.place_name}
            </span>
            <p name='addressName'>{place.road_address_name}</p>
          </div>
        ))}
        <div className={styles.pagination}>
          <ul>
            {pages.map(page =>
              currenPage === page ? (
                <li
                  key={page}
                  className={styles.on}
                  onClick={() => handlePageNumClick(page)}
                  role='presentation'
                >
                  {page}
                </li>
              ) : (
                <li
                  key={page}
                  onClick={() => handlePageNumClick(page)}
                  role='presentation'
                >
                  {page}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <Map location={searchInput}></Map>
    </>
  );
}
export default SearchLocationPage;
