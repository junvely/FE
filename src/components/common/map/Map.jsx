import React, { useEffect, useRef } from 'react';
import styles from './map.module.scss';

function Map({ location }) {
  const { kakao } = window;
  const mapRef = useRef(null);

  const kakaoMapDrawing = () => {
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        const marker = new kakao.maps.Marker({
          map,
          position: coords,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${location}</div>`,
        });
        infowindow.open(map, marker);
        map.setCenter(coords);
      }
    });
  };

  useEffect(() => {
    kakaoMapDrawing();
  }, [location]);
  return <div className={styles.map} ref={mapRef}></div>;
}

export default Map;
