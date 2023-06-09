import { useEffect, useRef } from 'react';
import './map.scss';

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

        const position = coords;
        const content = `<div class="customoverlay"  title="클릭하면 큰 지도로 이동해요!">
                          <a href="https://map.kakao.com/link/map/${location},${position.Ma},${position.La}" target="_blank"> 
                          <span class="title">${location}</span>
                          </a>
                        </div>;`;

        const customOverlay = new kakao.maps.CustomOverlay({
          position,
          content,
          xAnchor: 0.5,
          yAnchor: 0.2,
        });

        map.setCenter(coords);
        customOverlay.setMap(map);
      }
    });
  };

  useEffect(() => {
    kakaoMapDrawing();
  }, [location]);
  return <div className='map' ref={mapRef}></div>;
}

export default Map;
