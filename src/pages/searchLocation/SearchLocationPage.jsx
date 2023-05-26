import React, { useEffect, useRef } from 'react';
import Input from 'components/common/Input/Input';
import useInput from 'hooks/useInput';
import styles from './sarchLocation.module.scss';

function SearchLocationPage() {
  const [searchInput, handleInputChange, resetInput] = useInput('');
  const { naver } = window;
  const mapRef = useRef('');

  useEffect(() => {
    if (!mapRef.current || !naver) return;

    const location = new naver.maps.LatLng(37.3595704, 127.105399);
    const mapOptions = {
      center: location,
      zoom: 10,
    };

    //   const map = new naver.maps.Map(mapRef.current);
    const map = new naver.maps.Map(mapRef.current, mapOptions);

    const maker = new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);
  return (
    <>
      <Input
        type='text'
        placeholder='주소를 입력해 주세요'
        value={searchInput || ''}
        onChange={handleInputChange}
      ></Input>
      <button type='submit'>검색</button>
      <div className={styles.map} ref={mapRef}>
        ?
      </div>
    </>
  );
}

export default SearchLocationPage;
