import useInput from 'hooks/useInput';
import { useContext, useState } from 'react';
import styles from './header.module.scss';
import SearchPostsContext from '../../../contexts/PostsContext';

function SearchBar({ isSearchOpen, handleClickSearchOpen }) {
  const { searchPayload, updateSearchPayload } = useContext(SearchPostsContext);
  const [input, handleInputChange, resetInput] = useInput('');
  const [location, setLocation] = useState('서울');
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

  const handleClickSelectLocation = e => {
    setLocation(e.target.value);
  };

  const handleSubmitSearchPost = () => {
    updateSearchPayload({
      ...searchPayload,
      keyword: input,
      district: location,
    });
    resetInput();
    setLocation('서울');
    handleClickSearchOpen();
  };

  return (
    <div className={`${styles.searchCon} ${isSearchOpen && styles.visible}`}>
      {isSearchOpen && (
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmitSearchPost();
            }}
          >
            <input
              type='text'
              name='location'
              value={input || ''}
              onChange={handleInputChange}
              placeholder='검색어를 입력해 주세요'
            ></input>
            <button className={styles.submitButton} type='submit'>
              검색
            </button>
          </form>
          <div className={styles.locationCon}>
            <p>지역을 선택해 주세요</p>
            <div className={styles.locationList}>
              {locations.map(val => {
                return (
                  <label
                    htmlFor={val}
                    className={location === val && styles.selected}
                  >
                    {val}
                    <input
                      type='radio'
                      id={val}
                      name='location'
                      value={val}
                      defaultChecked={location === '서울'}
                      onClick={handleClickSelectLocation}
                    />
                  </label>
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
