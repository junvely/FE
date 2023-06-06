import React from 'react';
import { useQuery } from 'react-query';
import { getReservationSuccess } from 'apis/reservation';
import { useLocation, useNavigate } from 'react-router';
import LoadingSpinner from 'components/LoadingSpinner';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './reservation.module.scss';
import calendarIcon from '../../assets/svg/calendar.svg';
import locationIcon from '../../assets/svg/location.svg';

function ReservationSuccessPage() {
  const navigate = useNavigate();
  // postId 가져오기
  const loc = useLocation();
  const { postId } = { ...loc.state };

  // 데이터 조회
  const { data, isLoading, isError } = useQuery('reservationSuccess', () =>
    getReservationSuccess(postId),
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>데이터 처리 중 ERROR가 발생하였습니다.</div>;

  // 날짜 포맷 변환
  const stDate = new Date(data.data.startDate);
  const formattedStDate =
    stDate && format(stDate, 'yyyy. MM. dd(E)', { locale: ko });

  const edDate = new Date(data.data.endDate);
  const formattedEdDate =
    edDate && format(edDate, 'yyyy. MM. dd(E)', { locale: ko });

  const handleClickResListBtn = () => {
    navigate('/myreservations');
  };

  return (
    <div>
      <div className={styles.resSuccessTextWrap}>
        <div className={styles.resSuccessTextBox}>
          <p className={styles.resSuccessText}>예약이 완료되었습니다.</p>
          <p>오피스 담당자가 24시간 내로 채팅을 보내드릴 예정입니다.</p>
        </div>
      </div>
      <div className={styles.resSuccessMapBox}>
        <h2 className={styles.resSuccessTitle}>{data.data.title}</h2>
        <div className={styles.resSuccessMap}>지도 영역</div>
      </div>
      <div className={styles.resSuccessInfoWrap}>
        <div className={styles.resSuccessInfoBox}>
          <p className={styles.resSuccessInfo}>
            <img src={calendarIcon} alt='달력 아이콘' />
            {formattedStDate} ~ {` ${formattedEdDate}`}
          </p>
          <p className={styles.resSuccessInfo}>
            <img src={locationIcon} alt='위치 아이콘' /> 서울 중락구 광나루로
            382 아스하임4차 3층
          </p>
        </div>
        <button
          type='button'
          className={styles.resListBtn}
          onClick={handleClickResListBtn}
        >
          예약현황 보기
        </button>
      </div>
    </div>
  );
}

export default ReservationSuccessPage;
