import {
  getTasksForCurrentDate,
  setPickedDate,
  setAddTaskModeForCurrentDate,
} from "./../../../../store/reducers/calendarReminderReducer";
import Calendar from "react-calendar";
import styles from "./MainCalendar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";
import { getDate } from "./../../../../selectors/calendarSelectors";

const MainCalendar = (props) => {
  const dispatch = useDispatch();
  const date = useSelector(getDate);
  const { user } = useContext(AuthContext);
  const onDateChangeHandler = (date) => {
    dispatch(setPickedDate(date));
    dispatch(
      getTasksForCurrentDate({
        id: user.uid,
        date: date.toLocaleDateString("ru").replaceAll(".", "-"),
      })
    );
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    if (date.getTime() >= currentDate.getTime()) {
      dispatch(setAddTaskModeForCurrentDate({ mode: true }));
    } else {
      dispatch(setAddTaskModeForCurrentDate({ mode: false }));
    }
  };
  return (
    <div className={styles.calendarWrapper}>
      <Calendar
        className={styles.calendar}
        value={date}
        onClickDay={onDateChangeHandler}
      />
    </div>
  );
};

export default MainCalendar;
