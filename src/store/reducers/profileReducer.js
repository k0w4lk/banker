import { firebase } from "./../../firebase";

const SET_USER_DATA = "SET_USER_DATA";
const UPDATE_USER_DATA = "UPDATE_USER_DATA";

const initialState = {
  name: null,
  surname: null,
  email: null,
  id: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        id: action.payload.id,
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
      };
    default:
      return state;
  }
};

const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: {
    name: data.name,
    surname: data.surname,
    email: data.email,
    id: data.id,
  },
});

const updateUserData = (data) => ({
  type: UPDATE_USER_DATA,
  payload: {
    name: data.name,
    surname: data.surname,
  },
});

export const setUpdatedUserData = (data) => (dispatch) => {
  firebase.database().ref(`/users/${data.id}/name`).set(data.name);
  firebase.database().ref(`/users/${data.id}/surname`).set(data.surname);
  dispatch(updateUserData(data));
};

export const setUserId = (id) => (dispatch) => {
  firebase
    .database()
    .ref(`/users/${id}`)
    .once("value", (val) => {
      dispatch(setUserData({ ...val.val(), id }));
    });
};

export default profileReducer;
