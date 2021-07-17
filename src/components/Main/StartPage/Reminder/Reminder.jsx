import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { AuthContext } from "../../../../context/authContext";
import EmptyContainer from "../../../common/EmptyContainer/EmptyContainer";
import {
  getTasksForCurrentDate,
  setTaskForCurrentDate,
} from "./../../../../store/reducers/calendarReminderReducer";
import Preloader from "./../../../common/Preloader";
import styles from "./Reminder.module.scss";

const useStyles = makeStyles({
  tableContainer: {
    overflowY: "auto",
    width: "100%",
    height: "100%",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#C5DEFB",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#60A9E0",
      borderRadius: "5px",
    },
  },
  cell: {
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  input: {
    width: "100%",
    fontSize: "4em",
  },
});

const Reminder = (props) => {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [inputError, setInputError] = useState(false);
  const { user } = useContext(AuthContext);
  const tasks = Object.values(props.tasks);
  const tasksIds = Object.keys(props.tasks);

  const onAddTaskHandler = () => {
    if (!task.trim().length) return;
    props.setTaskForCurrentDate({
      id: user.uid,
      task: task,
      date: props.date.toLocaleDateString("ru").replaceAll(".", "-"),
    });
    setTask("");
  };

  useEffect(() => {
    props.getTasksForCurrentDate({
      id: user.uid,
      date: props.date.toLocaleDateString("ru").replaceAll(".", "-"),
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableHeadingWrapper}>
        <div className={styles.tableHeading}>
          <h2 className={styles.heading}>Напоминания</h2>
          <p className={styles.date}>{props.date.toLocaleDateString("ru")}</p>
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
                if (e.code === "Enter") onAddTaskHandler();
              }}
              onChange={(e) => {
                setTask(e.target.value);
                if (e.target.value.length === 100) setInputError(true);
                else setInputError(false);
              }}
              helperText={inputError ? "Не более 100 символов" : null}
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
              {tasks.map((task, i) => {
                return (
                  <TableRow key={tasksIds[i]}>
                    <TableCell className={classes.cell}>{task}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <EmptyContainer text="Напоминания отсутствуют" />
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
