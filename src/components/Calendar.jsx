import React, { useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styles from '../pages/reservation/reservation.module.scss';

function Calendar({ propsDates }) {
  const { stDate, setStDate, edDate, setEdDate } = propsDates;

  const onChange = dates => {
    const [start, end] = dates;
    setStDate(start);
    setEdDate(end);
  };

  return (
    <div>
      <DatePicker
        selected={stDate}
        onChange={onChange}
        startDate={stDate}
        endDate={edDate}
        locale={ko}
        // dateFormat='yyyy-MM-dd'
        selectsRange
        selectsDisabledDaysInRange
        inline
      />
    </div>
  );
}

export default Calendar;
