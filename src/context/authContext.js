import { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { firebase } from './../firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setUserId } from '../store/reducers/profileReducer';
import {
  EMAIL_ALREADY_IN_USE_ERROR,
  INVALID_EMAIL_ERROR,
  SOME_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  USER_DISABLED_ERROR,
  WEAK_PASSWORD_ERROR,
  WRONG_PASSWORD_ERROR,
} from '../errorMessages';

export const AuthContext = createContext();

const db = firebase.database();

const Auth = (props) => {
  const [user, setUser] = useState('');
  const [isCheckingForUser, setIsCheckingForUser] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = (email, password) => {
    clearErrors();
    setIsAuthenticating(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) props.history.push('/main');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/user-disabled':
            setEmailError(USER_DISABLED_ERROR);
            break;
          case 'auth/invalid-email':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setPasswordError(WRONG_PASSWORD_ERROR);
            break;
          case 'auth/too-many-requests':
            setPasswordError(TOO_MANY_REQUESTS_ERROR);
            break;
          default:
            setEmailError(SOME_ERROR);
            setPasswordError(SOME_ERROR);
            break;
        }
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  };

  const handleRegistration = (email, password, name, surname) => {
    clearErrors();
    setIsAuthenticating(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setEmailError(EMAIL_ALREADY_IN_USE_ERROR);
            break;
          case 'auth/invalid-email':
            setEmailError(INVALID_EMAIL_ERROR);
            break;
          case 'auth/weak-password':
            setPasswordError(WEAK_PASSWORD_ERROR);
            break;
          default:
            setEmailError(SOME_ERROR);
            setPasswordError(SOME_ERROR);
            break;
        }
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.ref(`/users/${user.uid}`).set({
          name,
          surname,
          email,
        });
      }
    });
  };

  const handleLogout = () => {
    setIsAuthenticating(true);
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsAuthenticating(false);
        props.history.push('/');
      });
  };

  useEffect(() => {
    setIsCheckingForUser(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        props.setUserId(user.uid);
      } else {
        setUser('');
      }
      setIsCheckingForUser(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        emailError,
        passwordError,
        isAuthenticating,
        isCheckingForUser,
        handleLogin,
        handleRegistration,
        handleLogout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default compose(withRouter, connect(null, { setUserId }))(Auth);
