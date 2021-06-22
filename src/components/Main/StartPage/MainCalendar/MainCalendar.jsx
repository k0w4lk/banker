import { setPickedDate } from './../../../../store/reducers/calendarReminderReducer';
import Calendar from 'react-calendar';
// import styles from './MainCalendar.module.scss';
import { connect } from 'react-redux';

const MainCalendar = (props) => {
  const onDateChangeHandler = (date) => {
    props.setPickedDate(date);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date.getTime() >= currentDate.getTime()) {
      console.log('You can set a reminder');
    }
  };
  return (
    <div>
      <Calendar value={props.date} onClickDay={onDateChangeHandler} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  date: state.calendar.date,
});

export default connect(mapStateToProps, { setPickedDate })(MainCalendar);
