import { useState } from 'react';
import Calendar from 'components/Calendar';
import { useNavigate, useParams } from 'react-router';
import { getReservationList, postMakeReservation } from 'apis/reservation';
import { useMutation, useQuery } from 'react-query';
import { format } from 'date-fns';
import LoadingSpinner from 'components/LoadingSpinner';
import { ko } from 'date-fns/locale';
import styles from './reservation.module.scss';

function ReservationPage() {
  const param = useParams();
  const { postId } = param;
  const navigate = useNavigate();

  // const [stDate, setStDate] = useState(new Date());
  const [stDate, setStDate] = useState(null);
  const [edDate, setEdDate] = useState(null);

  // 데이터 조회
  const { data, isLoading, isError } = useQuery('reservedDate', () =>
    getReservationList(postId),
  );

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
        const reservationId = result.data;
        alert('예약이 완료되었습니다.');
        navigate(`/reservationSuccess/${postId}/${reservationId}`);
      }
    },
    onError: error => {
      const { errorCode } = error;
      if (errorCode === 'InvalidDate') {
        alert('예약할 수 없는 날짜입니다.');
      }
      if (errorCode === 'ExistReserveDate') {
        alert('이미 예약이 된 날짜입니다.');
      }
      if (errorCode === 'NotExistPost') {
        alert('존재하지 않는 게시글입니다.');
      }
    },
  });

  const handleClickResBtn = () => {
    mutationReservation.mutate(reservationData);
  };

  return (
    <div className={styles.calendarContainer}>
      {isLoading && <LoadingSpinner />}
      {isError && <div>데이터 처리 중 ERROR가 발생하였습니다.</div>}
      <div className={styles.calendarWrap}>
        <div className={styles.titleBox}>
          <h2>* 일정을 선택하세요</h2>
        </div>
        <div className={styles.calendarBox}>
          <Calendar propsDates={propsDates} />
        </div>
        <div className={styles.selectedDateBox}>
          <div>
            <p>시작</p>
            <div className={styles.selectedDate}>
              {stDate ? (
                format(stDate, 'yyyy.MM.dd')
              ) : (
                <span className={styles.date}>달력 날짜 선택</span>
              )}
            </div>
          </div>
          <span>~</span>
          <div>
            <p>종료</p>
            <div className={styles.selectedDate}>
              {edDate ? (
                format(edDate, 'yyyy.MM.dd')
              ) : (
                <span className={styles.date}>달력 날짜 선택</span>
              )}
            </div>
          </div>
        </div>
        <div className={styles.resWrap}>
          <p className={styles.resTitle}>
            * 예약 불가
            <span className={styles.resInfo}>
              이미 예약자가 있는 일정입니다.
            </span>
          </p>
          <div className={styles.resBox}>
            {data &&
              data.data.map(date => {
                return (
                  <div>
                    <span>
                      {format(new Date(date.startDate), 'yyyy. MM. dd(E)', {
                        locale: ko,
                      })}
                    </span>
                    <span className={styles.betweenMark}>~</span>
                    <span>
                      {' '}
                      {format(new Date(date.endDate), 'yyyy. MM. dd(E)', {
                        locale: ko,
                      })}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
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
