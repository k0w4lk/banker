import {
  getTasksForCurrentDate,
  setPickedDate,
  setAddTaskModeForCurrentDate,
} from './../../../../store/reducers/calendarReminderReducer';
import Calendar from 'react-calendar';
import styles from './MainCalendar.module.scss';
import { connect } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/authContext';

const MainCalendar = (props) => {
  const { user } = useContext(AuthContext);
  const onDateChangeHandler = (date) => {
    props.setPickedDate(date);
    props.getTasksForCurrentDate({
      id: user.uid,
      date: date.toLocaleDateString().replaceAll('.', '-'),
    });
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date.getTime() >= currentDate.getTime()) {
      props.setAddTaskModeForCurrentDate({ mode: true });
    } else {
      props.setAddTaskModeForCurrentDate({ mode: false });
    }
  };
  return (
    <div className={styles.calendarWrapper}>
      <Calendar value={props.date} onClickDay={onDateChangeHandler} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  date: state.calendar.date,
});

export default connect(mapStateToProps, {
  setPickedDate,
  getTasksForCurrentDate,
  setAddTaskModeForCurrentDate,
})(MainCalendar);
