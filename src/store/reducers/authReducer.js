import {
  EMAIL_ALREADY_IN_USE_ERROR,
  INVALID_EMAIL_ERROR,
  SOME_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  USER_DISABLED_ERROR,
  WEAK_PASSWORD_ERROR,
  WRONG_PASSWORD_ERROR,
} from "../../errorMessages";
import { firebase } from "./../../firebase";

const LOGOUT = "LOGOUT";
const CLEAR_ERRORS = "CLEAR_ERRORS";
const SET_EMAIL_ERROR = "SET_EMAIL_ERROR";
const SET_PASSWORD_ERROR = "SET_PASSWORD_ERROR";

const initialState = {
  emailError: "",
  passwordError: "",
  isAuthenticating: false,
};

const db = firebase.database();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {
        ...state,
        isAuthenticating: action.payload.isAuthenticating,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        emailError: action.payload.emailError,
        passwordError: action.payload.passwordError,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload.passwordError,
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload.emailError,
      };

    default:
      return state;
  }
};

const setAuthenticatingStatus = (status) => ({
  type: LOGOUT,
  payload: {
    isAuthenticating: status,
  },
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
  payload: {
    emailError: "",
    passwordError: "",
  },
});

const setEmailError = (error) => ({
  type: SET_EMAIL_ERROR,
  payload: {
    emailError: error,
  },
});

const setPasswordError = (error) => ({
  type: SET_PASSWORD_ERROR,
  payload: {
    passwordError: error,
  },
});

export const registration = (email, password, name, surname) => (dispatch) => {
  dispatch(clearErrors());
  dispatch(setAuthenticatingStatus(true));
  console.log(email, password, name, surname);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
          dispatch(setEmailError(EMAIL_ALREADY_IN_USE_ERROR));
          break;
        case "auth/invalid-email":
          dispatch(setEmailError(INVALID_EMAIL_ERROR));
          break;
        case "auth/weak-password":
          dispatch(setPasswordError(WEAK_PASSWORD_ERROR));
          break;
        default:
          dispatch(setEmailError(SOME_ERROR));
          dispatch(setPasswordError(SOME_ERROR));
          break;
      }
    })
    .finally(() => {
      dispatch(setAuthenticatingStatus(false));
    });
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      db.ref(`/users/${user.uid}`).set({
        name,
        surname,
        email,
      });
    }
  });
};

export const logIn = (email, password) => (dispatch) => {
  dispatch(clearErrors());
  dispatch(setAuthenticatingStatus(true));
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code) {
        case "auth/user-disabled":
          dispatch(setEmailError(USER_DISABLED_ERROR));
          break;
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
          dispatch(setPasswordError(WRONG_PASSWORD_ERROR));
          break;
        case "auth/too-many-requests":
          dispatch(setPasswordError(TOO_MANY_REQUESTS_ERROR));
          break;
        default:
          dispatch(setEmailError(SOME_ERROR));
          dispatch(setPasswordError(SOME_ERROR));
          break;
      }
    })
    .finally(() => {
      dispatch(setAuthenticatingStatus(false));
    });
};

export const logOut = () => (dispatch) => {
  dispatch(setAuthenticatingStatus(true));
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(setAuthenticatingStatus(false));
    });
};

export default authReducer;
