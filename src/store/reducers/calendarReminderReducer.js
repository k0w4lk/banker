import { firebase } from './../../firebase';

const SET_DATE = 'SET_DATE';
const SET_TASK = 'SET_TASK';

const initialState = {
  date: new Date(),
};

const setDate = (data) => ({
  type: SET_DATE,
  payload: {
    date: data,
  },
});

export const setPickedDate = (data) => (dispatch) => {
  dispatch(setDate(data));
};

const setTask = (data) => ({
  type: SET_TASK,
  payload: {
    task: data,
  },
});

export const setTaskForCurrentDate = (data) => (dispatch) => {
  // debugger;
  console.log(data);
  firebase
    .database()
    .ref(`/users/${data.id}/tasks`)
    .push()
    .set({ task: data.task });

  dispatch(setTask(data.task));
};

const calendarReminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.payload.date,
      };

    default:
      return state;
  }
};

export default calendarReminderReducer;
