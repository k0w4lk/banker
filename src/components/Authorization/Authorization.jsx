import styles from './Authorization.module.scss';
import authLogo from './../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import './../../assets/styles/main.scss';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { REQUIRED_ERROR } from './../../context/authContext.js';
import { TextField } from '@material-ui/core';

const Authorization = (props) => {
  const {
    handleLogin,
    emailError,
    passwordError,
    clearErrors,
    isAuthenticating,
  } = useContext(AuthContext);
  return (
    <div className="l-auth-reg__wrapper">
      <div className="l-auth-reg__form">
        <img src={authLogo} className="l-auth-reg__logo" alt="auth-logo" />
        <div className="l-auth-reg__heading-wrapper">
          <h1 className="l-auth-reg__heading">АВТОРИЗАЦИЯ</h1>
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().required(REQUIRED_ERROR),
            password: Yup.string().required(REQUIRED_ERROR),
          })}
          onSubmit={(values) => {
            handleLogin(values.email, values.password);
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <TextField
                className="l-auth-reg__input"
                error={
                  passwordError ||
                  emailError ||
                  (props.touched.email && props.errors.email)
                }
                disabled={isAuthenticating}
                autoFocus={true}
                onChange={props.handleChange}
                value={props.values.email}
                onFocus={clearErrors}
                name="email"
                label="ЭЛЕКТРОННАЯ ПОЧТА"
                helperText={`${
                  props.touched.email && props.errors.email
                    ? props.errors.email
                    : ''
                }\n${emailError ? emailError : ''}`}
              />
              <TextField
                disabled={isAuthenticating}
                className="l-auth-reg__input"
                error={
                  passwordError ||
                  (props.touched.password && props.errors.password)
                }
                value={props.values.password}
                onChange={props.handleChange}
                name="password"
                onFocus={clearErrors}
                label="ПАРОЛЬ"
                type="password"
                helperText={`${
                  props.touched.password && props.errors.password
                    ? props.errors.password
                    : ''
                }\n${passwordError ? passwordError : ''}`}
              />
              <button
                type="submit"
                disabled={isAuthenticating}
                className="l-auth-reg__button"
              >
                ВОЙТИ
              </button>
            </form>
          )}
        </Formik>

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
