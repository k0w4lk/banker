import styles from './Registration.module.scss';
import authLogo from './../../assets/images/logo.svg';
import './../../assets/styles/main.scss';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';

const Registration = (props) => {
  const {
    onRegistrationEmailInputHandler,
    registrationEmail,
    registrationPassword,
    onRegistrationPaswordInputHandler,
    passwordError,
    handleRegistration,
    emailError,
    clearErrors,
    clearInputs,
  } = useContext(AuthContext);
  return (
    <div className={styles.registration__wrapper}>
      <div className={styles.registrationForm__wrapper}>
        <img src={authLogo} className="l-auth-reg__logo" alt="auth-logo" />
        <h1 className={styles.registrationForm__heading}>РЕГИСТРАЦИЯ</h1>
        <form className={styles.registrationForm__form} action="">
          <input className="l-auth-reg__input" type="text" placeholder="ИМЯ" />
          <input
            className="l-auth-reg__input"
            type="text"
            placeholder="ФАМИЛИЯ"
          />
          <input className="l-auth-reg__input" type="text" placeholder="РОЛЬ" />
          <input
            onChange={onRegistrationEmailInputHandler}
            value={registrationEmail}
            className="l-auth-reg__input"
            type="email"
            placeholder="ЭЛЕКТРОННАЯ ПОЧТА"
            required
          />
          {emailError ? (
            <p className="l-auth-reg__error-text">{emailError}</p>
          ) : null}
          <input
            onChange={onRegistrationPaswordInputHandler}
            value={registrationPassword}
            className="l-auth-reg__input"
            type="password"
            placeholder="ПАРОЛЬ"
            required
          />
          {passwordError ? (
            <p className="l-auth-reg__error-text">{passwordError}</p>
          ) : null}
          <input
            className="l-auth-reg__input"
            type="password"
            placeholder="ПОДТВЕРДИТЕ ПАРОЛЬ"
          />
          <button
            onClick={handleRegistration}
            className={styles.registrationForm__button}
          >
            ЗАРЕГИСТРИРОВАТЬСЯ
          </button>
        </form>
        <div className="l-auth-reg__redirect">
          <span className={styles.registrationForm__redirect}>
            УЖЕ ЗАРЕГИСТРИРОВАНЫ?&nbsp;
          </span>
          <NavLink
            onClick={() => {
              clearErrors();
              clearInputs();
            }}
            className={styles.registrationForm__link}
            to={'/'}
          >
            ВОЙТИ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Registration;
