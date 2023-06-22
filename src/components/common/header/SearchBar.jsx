import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useInput from 'hooks/useInput';
import uuid from 'react-uuid';
import { locations } from '../../../utils/constants/constants';
import useSearchToggle from '../../../hooks/useSearchToggle';
import styles from './header.module.scss';
import useSearchQuery from '../../../hooks/useSearchQuery';

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const { searchQuery, updateSearchQuery } = useSearchQuery();
  const { isSearchOpen, searchToggleSwitch } = useSearchToggle();

  const [input, handleInputChange, resetInput] = useInput('');
  const [district, setDistrict] = useState('전체');

  const handleClickSelectLocation = e => {
    setDistrict(e.target.value);
  };

  const handleSubmitSearchPost = () => {
    navigate('/main');
    updateSearchQuery({
      ...searchQuery,
      page: 0,
      keyword: input,
      district: district === '전체' ? null : district,
    });

    // 검색 후 초기화
    resetInput();
    setDistrict('전체');
    searchToggleSwitch();
  };

  useEffect(() => {
    if (isSearchOpen) {
      searchToggleSwitch();
    }
  }, [pathname]);

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
                    key={uuid()}
                    htmlFor={val}
                    className={district === val && styles.selected}
                  >
                    {val}
                    <input
                      type='radio'
                      id={val}
                      name='location'
                      value={val}
                      defaultChecked={district === '서울'}
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
