import { authApi } from '../../api/api';

const SET_USER = 'SET_USER';

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: SET_USER,
  user: user,
});

export const login = (email, password) => {
  return (dispatch) => {
    return authApi.authentication(email, password).then((response) => {
      console.log(response);
      if (response.operationType === 'signIn') {
        const user = response.user;
        dispatch(setUser(user));
      }
    });
  };
};

export default authReducer;
