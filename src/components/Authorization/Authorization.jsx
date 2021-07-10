import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../context/authContext.js';
import { REQUIRED_ERROR } from '../../errorMessages.js';
import AuthRegContainer from '../AuthRegContainer/AuthRegContainer.jsx';
import AuthRegHeading from '../AuthRegHeading/AuthRegHeading.jsx';
import AuthRegLogo from '../AuthRegLogo/AuthRegLogo.jsx';
import './../../assets/styles/main.scss';
import styles from './Authorization.module.scss';

const Authorization = (props) => {
  const {
    handleLogin,
    emailError,
    passwordError,
    clearErrors,
    isAuthenticating,
  } = useContext(AuthContext);
  return (
    <AuthRegContainer>
      <div className="l-auth-reg__form">
        <AuthRegLogo />
        <AuthRegHeading heading="АВТОРИЗАЦИЯ" />
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
                error={Boolean(
                  passwordError ||
                    emailError ||
                    (props.touched.email && props.errors.email)
                )}
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
                error={Boolean(
                  passwordError ||
                    (props.touched.password && props.errors.password)
                )}
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
    </AuthRegContainer>
  );
};

export default Authorization;
