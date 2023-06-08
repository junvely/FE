import useInput from 'hooks/useInput';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './header.module.scss';
import { SearchQueryContext } from '../../../contexts/SearchQueryContext';

function SearchBar({ isSearchOpen, handleClickSearchOpen }) {
  const navigate = useNavigate();
  const { searchQuery, updateSearchQuery } = useContext(SearchQueryContext);

  const [input, handleInputChange, resetInput] = useInput('');
  const [location, setLocation] = useState('전체');
  const locations = [
    '전체',
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
  ];

  const handleClickSelectLocation = e => {
    setLocation(e.target.value);
  };

  const handleSubmitSearchPost = () => {
    navigate('/main');
    updateSearchQuery({
      ...searchQuery,
      keyword: input,
      district: location === '전체' ? null : location,
    });
    resetInput();
    setLocation('전체');
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
