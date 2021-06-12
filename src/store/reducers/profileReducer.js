import firebase from 'firebase';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  user: {
    name: null,
    surname: null,
    role: null,
    email: null,
  },
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: {
          name: action.payload.name,
          surname: action.payload.surname,
          role: action.payload.role,
          email: action.payload.email,
        },
      };

    default:
      return state;
  }
};

const setUserData = (name, surname, role, email) => ({
  type: SET_USER_DATA,
  payload: {
    name,
    surname,
    role,
    email,
  },
});

export const setUser = (name, surname, role, email) => (dispatch) => {
  firebase
    .database()
    .ref(`/users/${email}`)
    .once('value', (val) => {
      console.log({ ...val.val() });
      dispatch(setUserData({ ...val.val() }));
    });
};

export default profileReducer;
