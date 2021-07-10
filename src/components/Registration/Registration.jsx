import { ClickAwayListener, TextField, Tooltip } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import classNames from 'classnames';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../context/authContext.js';
import {
  INVALID_EMAIL_ERROR,
  MAX_NAME_LENGTH,
  MAX_SURNAME_LENGTH,
  ONLY_CYRILLIC_SYMBOLS,
  PASSWORD_MISMATCH_ERROR,
  REQUIRED_ERROR,
  WEAK_PASSWORD_ERROR,
} from '../../errorMessages';
import AuthRegContainer from '../AuthRegContainer';
import AuthRegHeading from '../AuthRegHeading/AuthRegHeading.jsx';
import AuthRegLogo from '../AuthRegLogo';
import './../../assets/styles/main.scss';
import styles from './Registration.module.scss';

const Registration = () => {
  const { handleRegistration, emailError, clearErrors, isAuthenticating } =
    useContext(AuthContext);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <AuthRegContainer className="l-auth-reg__wrapper">
      <div className={classNames('l-auth-reg__form', styles.formWrapper)}>
        <AuthRegLogo />
        <AuthRegHeading heading="РЕГИСТРАЦИЯ">
          <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
            <Tooltip
              open={tooltipOpen}
              title={
                <>
                  <h2>Требования к регистрационным полям:</h2>
                  <br />
                  <h3>Имя/фамилия</h3>
                  <p>
                    Используются только символы кирллического алфавита. Длина не
                    более 25 символов
                  </p>
                  <br />
                  <h3>Пароль</h3>
                  <p>
                    Длина от 6 символов. Обязательны маленькая и большая
                    латинские буквы, цифра и один из следующих символов:
                    !@#$%^&*
                  </p>
                </>
              }
              placement="bottom-end"
            >
              <HelpOutlineIcon onClick={() => setTooltipOpen(!tooltipOpen)} />
            </Tooltip>
          </ClickAwayListener>
        </AuthRegHeading>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(
                MAX_NAME_LENGTH,
                `Имя должно иметь не более ${MAX_NAME_LENGTH} символов`
              )
              .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
              .required(REQUIRED_ERROR),
            surname: Yup.string()
              .max(
                MAX_NAME_LENGTH,
                `Фамилия должна иметь не более ${MAX_SURNAME_LENGTH} символов`
              )
              .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
              .required(REQUIRED_ERROR),
            email: Yup.string()
              .email(INVALID_EMAIL_ERROR)
              .required(REQUIRED_ERROR),
            password: Yup.string()
              .required(REQUIRED_ERROR)
              .matches(
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                'Слабый пароль'
              )
              .min(6, WEAK_PASSWORD_ERROR),
            confirmPassword: Yup.string()
              .required(REQUIRED_ERROR)
              .oneOf([Yup.ref('password'), null], PASSWORD_MISMATCH_ERROR),
          })}
          onSubmit={(values) => {
            handleRegistration(
              values.email,
              values.password,
              values.name,
              values.surname
            );
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <div className={styles.inputsWrapper}>
                <TextField
                  className={styles.input}
                  error={Boolean(props.touched.name && props.errors.name)}
                  label="ИМЯ"
                  value={props.values.name}
                  onChange={props.handleChange}
                  name="name"
                  helperText={
                    props.touched.name && props.errors.name
                      ? props.errors.name
                      : null
                  }
                />
                <TextField
                  className={styles.input}
                  error={Boolean(props.touched.surname && props.errors.surname)}
                  label="ФАМИЛИЯ"
                  value={props.values.surname}
                  onChange={props.handleChange}
                  name="surname"
                  helperText={
                    props.touched.surname && props.errors.surname
                      ? props.errors.surname
                      : null
                  }
                />
                <TextField
                  className={styles.input}
                  error={Boolean(
                    emailError || (props.touched.email && props.errors.email)
                  )}
                  value={props.values.email}
                  onChange={props.handleChange}
                  onFocus={clearErrors}
                  label="ЭЛЕКТРОННАЯ ПОЧТА"
                  name="email"
                  helperText={`${
                    props.touched.email && props.errors.email
                      ? props.errors.email
                      : ''
                  }\n${emailError ? emailError : ''}`}
                />
                <TextField
                  className={styles.input}
                  error={Boolean(
                    props.touched.password && props.errors.password
                  )}
                  value={props.values.password}
                  type="password"
                  label="ПАРОЛЬ"
                  onChange={props.handleChange}
                  name="password"
                  helperText={
                    props.touched.password && props.errors.password
                      ? props.errors.password
                      : null
                  }
                />
                <TextField
                  className={styles.input}
                  error={Boolean(
                    props.touched.confirmPassword &&
                      props.errors.confirmPassword
                  )}
                  type="password"
                  label="ПОДТВЕРДИТЕ ПАРОЛЬ"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange}
                  name="confirmPassword"
                  helperText={
                    props.touched.confirmPassword &&
                    props.errors.confirmPassword
                      ? props.errors.confirmPassword
                      : null
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isAuthenticating}
                className={classNames('l-auth-reg__button', styles.button)}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
            </form>
          )}
        </Formik>
        <div className="l-auth-reg__redirect">
          <span className="l-auth-reg__text">УЖЕ ЗАРЕГИСТРИРОВАНЫ?&nbsp;</span>
          <NavLink onClick={clearErrors} className="l-auth-reg__link" to={'/'}>
            ВОЙТИ
          </NavLink>
        </div>
      </div>
    </AuthRegContainer>
  );
};

export default Registration;
