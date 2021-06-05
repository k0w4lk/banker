import styles from './Authorization.module.scss';
import authLogo from './../../assets/images/logo.svg';

const Authorization = (props) => {
  return (
    <div className={styles.authorization__wrapper}>
      <div className={styles.authorizationForm__wrapper}>
        <img
          src={authLogo}
          className={styles.authorizationForm__logo}
          alt="auth-logo"
        />
        <h1 className={styles.authorizationForm__heading}>АВТОРИЗАЦИЯ</h1>
        <form className={styles.authorizationForm__form} action="">
          <input
            className={styles.authorizationForm__input}
            type="text"
            placeholder="ЛОГИН"
          />
          <input
            className={styles.authorizationForm__input}
            type="password"
            placeholder="ПАРОЛЬ"
          />
          <button className={styles.authorizationForm__button}>ВОЙТИ</button>
        </form>
        <a className={styles.authorizationForm__link} href="#s">
          Создать учетную запись
        </a>
      </div>
    </div>
  );
};

export default Authorization;
