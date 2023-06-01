import useInput from 'hooks/useInput';
import { useState } from 'react';
import styles from './header.module.scss';

function SearchBar({ isSearchOpen }) {
  const [input, handleInputChange] = useInput('');
  const [locationList, setLocationList] = useState([]);
  const locations = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충남',
    '대전',
    '충북',
    '세종',
    '부산',
    '울산',
    '대구',
    '경북',
    '경남',
    '전남',
    '광주',
    '전북',
    '제주',
    '전국',
  ];
  console.log(...locationList);

  const handleClickAddLocation = e => {
    const location = e.target.innerText;
    console.log(location);
    setLocationList([...locationList, location]);
  };

  return (
    <div
      className={`${styles.searchCon} ${isSearchOpen ? styles.visible : ''}`}
    >
      {isSearchOpen && (
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              type='text'
              name='location'
              value={input}
              onChange={handleInputChange}
              placeholder='지역을 선택해 주세요'
            ></input>
            <button className={styles.submitButton} type='submit'>
              검색
            </button>
          </form>
          <div className={styles.locationCon}>
            <p>지역을 선택해 보세요</p>
            <div className={styles.locationList}>
              {locations.map(location => {
                return (
                  <button type='button' onClick={handleClickAddLocation}>
                    {location}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchBar;
