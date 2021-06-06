import { createContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import firebase from 'firebase';

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
export const MAX_NAME_LENGTH = 20;
export const MAX_SURNAME_LENGTH = 25;

const Auth = (props) => {
  const [user, setUser] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registrationPassword, setRegistrationPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearInputs = () => {
    setLoginEmail('');
    setRegistrationEmail('');
    setLoginPassword('');
    setRegistrationPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const onLoginEmailInputHandler = (e) => setLoginEmail(e.target.value);
  const onRegistrationEmailInputHandler = (e) =>
    setRegistrationEmail(e.target.value);

  const onLoginPaswordInputHandler = (e) =>
    setLoginPassword(e.currentTarget.value);
  const onRegistrationPaswordInputHandler = (e) =>
    setRegistrationPassword(e.currentTarget.value);

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
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
          default:
            setEmailError(SOME_ERROR);
            setPasswordError(SOME_ERROR);
            break;
        }
      });
  };

  const handleRegistration = (email, password) => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
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
      });
  };

  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
        props.history.push('/main');
      } else {
        setUser('');
        props.history.push('/');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginEmail,
        registrationEmail,
        loginPassword,
        registrationPassword,
        emailError,
        passwordError,
        onLoginEmailInputHandler,
        onRegistrationEmailInputHandler,
        onLoginPaswordInputHandler,
        onRegistrationPaswordInputHandler,
        handleLogin,
        handleRegistration,
        handleLogout,
        clearErrors,
        clearInputs,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default withRouter(Auth);
