import styles from './Authorization.module.scss';
import authLogo from './../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import './../../assets/styles/main.scss';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';

const Authorization = (props) => {
  const {
    onEmailInputHandler,
    email,
    password,
    onPaswordInputHandler,
    passwordError,
    handleLogin,
    emailError,
  } = useContext(AuthContext);
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

export default Authorization;
