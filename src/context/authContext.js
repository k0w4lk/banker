import { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import firebase from 'firebase';
import { addUser } from '../store/reducers/registrationReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';

export const AuthContext = createContext();

export const WEAK_PASSWORD_ERROR =
  'Пароль должен состоять не менее чем из шести символов';
export const EMAIL_ALREADY_IN_USE_ERROR =
  'Данный адрес электронной почты уже зарегистрирован';
export const INVALID_EMAIL_ERROR = 'Неверный элекронный адрес';
export const USER_NOT_FOUND_ERROR = 'Пользователь не найден';
export const USER_DISABLED_ERROR = 'Пользователь заблокирован';
export const WRONG_PASSWORD_ERROR =
  'Неверный адрес электронной почты или пароль';
export const SOME_ERROR = 'Произошла ошибка';
export const REQUIRED_ERROR = 'Обязательное поле';
export const PASSWORD_MISMATCH_ERROR = 'Пароли должны совпадать';
export const TOO_MANY_REQUESTS_ERROR =
  'Учетная запись временно заблокирована. Попробуйте авторизоваться позже';
export const MAX_NAME_LENGTH = 20;
export const MAX_SURNAME_LENGTH = 25;

const Auth = (props) => {
  const [user, setUser] = useState('');
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
          case 'auth/invalid-email':
            setEmailError(INVALID_EMAIL_ERROR);
            break;
          case 'auth/user-disabled':
            setEmailError(USER_DISABLED_ERROR);
            break;
          case 'auth/user-not-found':
            setEmailError(USER_NOT_FOUND_ERROR);
            break;
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

  const handleRegistration = (email, password, name, surname, role) => {
    clearErrors();
    setIsAuthenticating(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        props.addUser(name, surname, role, email);
        console.log(name, surname, role, email);
        if (user) props.history.push('/main');
      })
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
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        props.history.push('/main');
      } else {
        setUser('');
        props.history.push('/');
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        emailError,
        passwordError,
        handleLogin,
        handleRegistration,
        handleLogout,
        clearErrors,
        isAuthenticating,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default compose(withRouter, connect(null, { addUser }))(Auth);
