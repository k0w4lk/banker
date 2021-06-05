import styles from './Registration.module.scss';
import authLogo from './../../assets/images/logo.svg';
import './../../assets/styles/main.scss';
import { useState } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const Registration = (props) => {
  //const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //const [hasAccount, setHasAccount] = useState(false);

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

  const handleRegistration = (e) => {
    e.preventDefault();
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) props.history.push('/main');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-alreadyIn-use':
          case 'auth/invalid-email':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

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
            onChange={onEmailInputHandler}
            value={email}
            className="l-auth-reg__input"
            type="text"
            placeholder="ЛОГИН"
            required
          />
          {emailError ? <p>{emailError}</p> : null}
          <input
            onChange={onPaswordInputHandler}
            value={password}
            className="l-auth-reg__input"
            type="password"
            placeholder="ПАРОЛЬ"
            required
          />
          {passwordError ? <p>{passwordError}</p> : null}
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
          <NavLink className={styles.registrationForm__link} to={'/'}>
            ВОЙТИ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Registration);
