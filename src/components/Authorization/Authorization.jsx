import styles from './Authorization.module.scss';
import authLogo from './../../assets/images/logo.svg';
import { NavLink, withRouter } from 'react-router-dom';
import './../../assets/styles/main.scss';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { login } from '../../store/reducers/authReducer';

const Authorization = (props) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const onEmailInputHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPaswordInputHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();
    login(email, password);
    // .then((user) => {
    //   console.log(user);
    //   if (user) props.history.push('/main');
    // })
    // .catch((err) => {
    //   switch (err.code) {
    //     case 'auth/invalid-email':
    //     case 'auth/user-disabled':
    //     case 'auth/user-not-found':
    //       setEmailError(err.message);
    //       break;
    //     case 'auth/wrong-password':
    //       setPasswordError(err.message);
    //       break;
    //     default:
    //       break;
    //   }
    // });
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className={styles.authorization__wrapper}>
      <div className={styles.authorizationForm__wrapper}>
        <img src={authLogo} className="l-auth-reg__logo" alt="auth-logo" />
        <h1 className={styles.authorizationForm__heading}>АВТОРИЗАЦИЯ</h1>
        <form className={styles.authorizationForm__form} action="">
          <input
            onChange={onEmailInputHandler}
            value={email}
            className="l-auth-reg__input"
            type="text"
            placeholder="ЛОГИН"
          />
          {emailError ? <p>{emailError}</p> : null}
          <input
            value={password}
            onChange={onPaswordInputHandler}
            className="l-auth-reg__input"
            type="password"
            placeholder="ПАРОЛЬ"
          />
          {passwordError ? <p>{passwordError}</p> : null}
          <button
            onClick={handleLogin}
            className={styles.authorizationForm__button}
          >
            ВОЙТИ
          </button>
        </form>
        <div className="l-auth-reg__redirect">
          <span className="l-auth-reg__text">НЕТ УЧЕТНОЙ ЗАПИСИ?&nbsp;</span>
          <NavLink className="l-auth-reg__link" to="/registration">
            СОЗДАТЬ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Authorization);
