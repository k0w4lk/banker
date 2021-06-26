import { firebase } from './../../firebase';

const SET_DATE = 'SET_DATE';
const SET_TASK = 'SET_TASK';
const GET_TASKS = 'GET_TASKS';
const SET_ADD_TASK_MODE = 'SET_ADD_TASK_MODE';
const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

const initialState = {
  date: new Date(),
  tasks: {},
  addTaskMode: true,
  isDataLoading: true,
};

const setDate = (data) => ({
  type: SET_DATE,
  payload: {
    date: data,
  },
});

const setAddTaskMode = (addTaskMode) => ({
  type: SET_ADD_TASK_MODE,
  payload: {
    addTaskMode,
  },
});

export const setPickedDate = (data) => (dispatch) => {
  dispatch(setDate(data));
};

const setTask = (data) => ({
  type: SET_TASK,
  payload: {
    task: data.task,
    id: data.id,
  },
});

const getTasks = (data) => ({
  type: GET_TASKS,
  payload: {
    tasks: data,
  },
});

const setLoadingStatus = (status) => ({
  type: SET_LOADING_STATUS,
  payload: {
    status,
  },
});

export const getTasksForCurrentDate = (data) => (dispatch) => {
  dispatch(setLoadingStatus(true));
  firebase
    .database()
    .ref(`/users/${data.id}/tasks/${data.date}`)
    .once('value', (val) => {
      dispatch(getTasks({ ...val.val() }));
    })
    .then(() => {
      dispatch(setLoadingStatus(false));
    });
};

export const setTaskForCurrentDate = (data) => (dispatch) => {
  const newRef = firebase
    .database()
    .ref(`/users/${data.id}/tasks/${data.date}`)
    .push();
  const id = newRef.key;
  newRef.set(data.task).then(() => {
    dispatch(setTask({ task: data.task, id }));
  });
};

export const setAddTaskModeForCurrentDate = (data) => (dispatch) => {
  dispatch(setAddTaskMode(data.mode));
};

const calendarReminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload.date,
      };
    case SET_TASK:
      return {
        ...state,
        tasks: { ...state.tasks, [action.payload.id]: action.payload.task },
      };
    case GET_TASKS:
      return {
        ...state,
        tasks: { ...action.payload.tasks },
      };
    case SET_ADD_TASK_MODE:
      return {
        ...state,
        addTaskMode: action.payload.addTaskMode,
      };
    case SET_LOADING_STATUS:
      return {
        ...state,
        isDataLoading: action.payload.status,
      };
    default:
      return state;
  }
};

export default calendarReminderReducer;
