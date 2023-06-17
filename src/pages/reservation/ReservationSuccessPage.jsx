import React from 'react';
import { useQuery } from 'react-query';
import { getReservationSuccess } from 'apis/reservation';
import { useLocation, useNavigate, useParams } from 'react-router';
import LoadingSpinner from 'components/LoadingSpinner';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './reservation.module.scss';
import calendarIcon from '../../assets/svg/calendar.svg';
import locationIcon from '../../assets/svg/location.svg';
import Map from '../../components/common/map/Map';

function ReservationSuccessPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { reservationId } = useParams();

  // 데이터 조회
  const { data, isLoading, isError } = useQuery('reservationSuccess', () =>
    getReservationSuccess(postId, reservationId),
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

  console.log(data.data);
  return (
    <div>
      <div className={styles.resSuccessTextWrap}>
        <div className={styles.resSuccessTextBox}>
          <p className={styles.resSuccessText}>예약이 완료되었습니다.</p>
          <p>오피스 담당자가 결제 정보를 채팅으로 보내드릴 예정입니다.</p>
        </div>
      </div>
      <div className={styles.resSuccessMapBox}>
        <h2 className={styles.resSuccessTitle}>{data.data.title}</h2>
        <Map location={data.data.location} />
      </div>
      <div className={styles.resSuccessInfoWrap}>
        <div className={styles.resSuccessInfoBox}>
          <p className={styles.resSuccessInfo}>
            <img src={calendarIcon} alt='달력 아이콘' />
            {formattedStDate} ~ {` ${formattedEdDate}`}
          </p>
          <p className={styles.resSuccessInfo}>
            <img src={locationIcon} alt='위치 아이콘' />
            {data.data.location}
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
