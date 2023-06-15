import React, { useState } from 'react';
import Calendar from 'components/Calendar';
import { useLocation, useNavigate } from 'react-router';
import { postMakeReservation } from 'apis/reservation';
import { useMutation } from 'react-query';
import { format } from 'date-fns';
import styles from './reservation.module.scss';

function ReservationPage() {
  const loc = useLocation();
  const { postId } = { ...loc.state };
  const navigate = useNavigate();

  // const [stDate, setStDate] = useState(new Date());
  const [stDate, setStDate] = useState(null);
  const [edDate, setEdDate] = useState(null);

  const propsDates = {
    stDate,
    edDate,
    setStDate,
    setEdDate,
  };

  const startDate = stDate && format(stDate, 'yyyy-MM-dd');
  const endDate = edDate && format(edDate, 'yyyy-MM-dd');
  const reservationData = { postId, startDate, endDate };

  const mutationReservation = useMutation(postMakeReservation, {
    onSuccess: result => {
      if (result.status === 'OK') {
        alert('예약이 완료되었습니다.');
        navigate(`/reservationSuccess/${postId}`);
      }
    },
    onError: error => {
      alert('예약이 완료되지 않았습니다. 다시 시도해주세요.');
    },
  });

  const handleClickResBtn = () => {
    mutationReservation.mutate(reservationData);
  };

  return (
    <div className={styles.calendarWrap}>
      <div>
        <div className={styles.titleBox}>
          <h2>* 일정을 선택하세요</h2>
        </div>
        <div className={styles.calendarBox}>
          <Calendar propsDates={propsDates} />
        </div>
        {/* <div>
          {stDate && <p>선택한 날짜 : {format(stDate, 'yyyy-MM-dd')}</p>}
          {edDate && <p>선택한 날짜 : {format(edDate, 'yyyy-MM-dd')}</p>}
        </div> */}
      </div>
      <button
        type='button'
        className={styles.reservationBtn}
        onClick={handleClickResBtn}
      >
        예약하기
      </button>
    </div>
  );
}
export default ReservationPage;
