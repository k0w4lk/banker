import styles from './Authorization.module.scss';
import authLogo from './../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import './../../assets/styles/main.scss';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';

const Authorization = (props) => {
  const {
    onLoginEmailInputHandler,
    loginEmail,
    loginPassword,
    onLoginPaswordInputHandler,
    passwordError,
    handleLogin,
    emailError,
    clearErrors,
  } = useContext(AuthContext);
  return (
    <div className={styles.authorization__wrapper}>
      <div className={styles.authorizationForm__wrapper}>
        <img src={authLogo} className="l-auth-reg__logo" alt="auth-logo" />
        <h1 className={styles.authorizationForm__heading}>АВТОРИЗАЦИЯ</h1>
        <form className={styles.authorizationForm__form} action="">
          <input
            onChange={onLoginEmailInputHandler}
            value={loginEmail}
            className="l-auth-reg__input"
            type="email"
            placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
          />
          {emailError ? (
            <p className="l-auth-reg__error-text">{emailError}</p>
          ) : null}
          <input
            value={loginPassword}
            onChange={onLoginPaswordInputHandler}
            className="l-auth-reg__input"
            type="password"
            placeholder="ПАРОЛЬ"
          />
          {passwordError ? (
            <p className="l-auth-reg__error-text">{passwordError}</p>
          ) : null}
          <button
            onClick={handleLogin}
            className={styles.authorizationForm__button}
          >
            ВОЙТИ
          </button>
        </form>
        <div className="l-auth-reg__redirect">
          <span className="l-auth-reg__text">НЕТ УЧЕТНОЙ ЗАПИСИ?&nbsp;</span>
          <NavLink
            onClick={clearErrors}
            className="l-auth-reg__link"
            to="/registration"
          >
            СОЗДАТЬ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
