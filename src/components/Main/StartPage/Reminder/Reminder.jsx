import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TextField,
  Paper,
} from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import styles from './Reminder.module.scss';
import { setTaskForCurrentDate } from './../../../../store/reducers/calendarReminderReducer';

const Reminder = (props) => {
  const [addTaskMode, setAddTaskMode] = useState(false);
  const [task, setTask] = useState('');
  return (
    <div className={styles.wrapper}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className={styles.heading}>
                  <h2>Напоминания</h2>
                  <button onClick={() => setAddTaskMode(!addTaskMode)}>
                    {addTaskMode ? '-' : '+'}
                  </button>
                  <p>{props.date.toLocaleDateString()}</p>
                </div>
                {addTaskMode ? (
                  <>
                    <TextField
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                    />
                    <button
                      onClick={() => {
                        console.log(props.currentUserId);
                        console.log(task);
                        props.setTaskForCurrentDate({
                          id: props.currentUserId,
                          task: task,
                        });
                      }}
                    >
                      +
                    </button>
                  </>
                ) : null}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Напоминание 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Напоминание 2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Напоминание 3</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapDispatchToProps = (state) => ({
  date: state.calendar.date,
  currentUserId: state.currentUser.id,
});

export default connect(mapDispatchToProps, { setTaskForCurrentDate })(Reminder);
