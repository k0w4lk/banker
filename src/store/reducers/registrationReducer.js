import firebase from 'firebase';

const SET_NEW_USER_DATA = 'SET_NEW_USER_DATA';

const initialState = {
  usersData: [],
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_USER_DATA:
      return {
        ...state,
        usersData: [
          ...state.usersData,
          {
            name: action.payload.name,
            surname: action.payload.surname,
            role: action.payload.role,
            email: action.payload.email,
          },
        ],
      };

    default:
      return state;
  }
};

const setNewUserData = (name, surname, role, email) => ({
  type: SET_NEW_USER_DATA,
  payload: {
    name,
    surname,
    role,
    email,
  },
});

export const addUser = (name, surname, role, email) => (dispatch) => {
  firebase
    .database()
    .ref(`/users/${email}`)
    .set({ name, surname, role, email });
  dispatch(setNewUserData(name, surname, role, email));
};

export default registrationReducer;
