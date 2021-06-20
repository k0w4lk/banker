import { useState } from 'react';
import Calendar from 'react-calendar';
import { TextField } from '@material-ui/core';
import styles from './MainCalendar.module.scss';

const MainCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onDateChangeHandler = (date) => {
    setDate(date);
    console.log(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date.getTime() >= currentDate.getTime()) {
      console.log('opppa');
    }
  };
  return (
    <div>
      <Calendar value={date} onClickDay={onDateChangeHandler} />
      <TextField
        className={styles.input}
        label={`Введите задачу на ${date.toLocaleDateString()}`}
      />
    </div>
  );
};

export default MainCalendar;
