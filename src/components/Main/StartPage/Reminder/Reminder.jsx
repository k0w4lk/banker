import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  makeStyles,
} from '@material-ui/core';
import { useContext, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Reminder.module.scss';
import {
  getTasksForCurrentDate,
  setTaskForCurrentDate,
} from './../../../../store/reducers/calendarReminderReducer';
import { useEffect } from 'react';
import { AuthContext } from '../../../../context/authContext';
import emptyBox from './../../../../assets/images/empty-box.svg';
import Preloader from './../../../Main/common/Preloader';

const useStyles = makeStyles({
  tableContainer: {
    overflowY: 'auto',
    width: '100%',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#C5DEFB',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#60A9E0',
      borderRadius: '5px',
    },
  },
  cell: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
  input: {
    width: '100%',
    fontSize: '4em',
  },
});

const Reminder = (props) => {
  const classes = useStyles();
  const [task, setTask] = useState('');
  const [inputError, setInputError] = useState(false);
  const { user } = useContext(AuthContext);
  const tasks = [];
  for (let task in props.tasks) {
    tasks.push({ task: props.tasks[task], id: task });
  }

  useEffect(() => {
    props.getTasksForCurrentDate({
      id: user.uid,
      date: props.date.toLocaleDateString('ru').replaceAll('.', '-'),
    });
  }, []);

  const onAddTaskHandler = () => {
    if (!task.trim().length) return;
    props.setTaskForCurrentDate({
      id: user.uid,
      task: task,
      date: props.date.toLocaleDateString('ru').replaceAll('.', '-'),
    });
    setTask('');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableHeadingWrapper}>
        <div className={styles.tableHeading}>
          <h2 className={styles.heading}>Напоминания</h2>
          <p className={styles.date}>{props.date.toLocaleDateString('ru')}</p>
        </div>
        {props.addTaskMode ? (
          <div className={styles.addTaskWrapper}>
            <TextField
              size="small"
              error={inputError}
              inputProps={{ maxLength: 100 }}
              className={classes.input}
              value={task}
              placeholder="Добавить напоминание"
              onKeyPress={(e) => {
                if (e.code === 'Enter') onAddTaskHandler();
              }}
              onChange={(e) => {
                setTask(e.target.value);
                if (e.target.value.length === 100) setInputError(true);
                else setInputError(false);
              }}
              helperText={inputError ? 'Не более 100 символов' : null}
            />
            <button
              className={styles.addTaskButton}
              onClick={onAddTaskHandler}
            ></button>
          </div>
        ) : null}
      </div>
      {props.isDataLoading ? (
        <Preloader />
      ) : tasks.length ? (
        <TableContainer className={classes.tableContainer}>
          <Table size="small" stickyHeader>
            <TableBody>
              {tasks.map((task) => {
                return (
                  <TableRow key={task.id}>
                    <TableCell className={classes.cell}>{task.task}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className={styles.noTasksWrapper}>
          <img src={emptyBox} className={styles.noTasksImg} alt="empty icon" />
          <p className={styles.noTasksText}>Напоминаний нет</p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  date: state.calendar.date,
  currentUserId: state.currentUser.id,
  tasks: state.calendar.tasks,
  addTaskMode: state.calendar.addTaskMode,
  isDataLoading: state.calendar.isDataLoading,
});

export default connect(mapStateToProps, {
  setTaskForCurrentDate,
  getTasksForCurrentDate,
})(Reminder);
