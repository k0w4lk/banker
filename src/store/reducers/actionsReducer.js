import { firebase } from './../../firebase';

const SET_ACTION = 'SET_ACTION';
const SET_ACTIONS = 'SET_ACTIONS';
const SET_ACTIONS_LOADING_STATUS = 'SET_ACTIONS_LOADING_STATUS';

const initialState = {
  actions: {},
  actionsLoadingStatus: true,
};

const setAction = (data) => ({
  type: SET_ACTION,
  payload: {
    action: data.action,
    id: data.actionId,
  },
});

const setActions = (data) => ({
  type: SET_ACTIONS,
  payload: { actions: data },
});

const setActionsLoadingStatus = (status) => ({
  type: SET_ACTIONS_LOADING_STATUS,
  payload: {
    actionsLoadingStatus: status,
  },
});

export const getActionsData = (data) => (dispatch) => {
  firebase
    .database()
    .ref(`/users/${data.id}/actions`)
    .once('value', (val) => {
      dispatch(setActions({ ...val.val() }));
    })
    .then(() => {
      dispatch(setActionsLoadingStatus(false));
    });
};

export const transferActionData = (data) => (dispatch) => {
  const actionsRef = firebase
    .database()
    .ref(`/users/${data.id}/actions`)
    .push();
  const actionId = actionsRef.key;
  actionsRef
    .set({ date: data.date, time: data.time, action: data.action })
    .then(() => {
      dispatch(setAction({ action: data.action, actionId }));
    });
};

const actionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION:
      return {
        ...state,
        actions: {
          ...state.actions,
          [action.payload.id]: action.payload.action,
        },
      };
    case SET_ACTIONS:
      return {
        ...state,
        actions: { ...action.payload.actions },
      };
    case SET_ACTIONS_LOADING_STATUS:
      return {
        ...state,
        actionsLoadingStatus: action.payload.status,
      };
    default:
      return state;
  }
};

export default actionsReducer;
