import styles from './Registration.module.scss';
import authLogo from './../../assets/images/logo.svg';
import './../../assets/styles/main.scss';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/authContext.js';
import { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  INVALID_EMAIL_ERROR,
  WEAK_PASSWORD_ERROR,
  REQUIRED_ERROR,
  PASSWORD_MISMATCH_ERROR,
  MAX_NAME_LENGTH,
  MAX_SURNAME_LENGTH,
} from './../../context/authContext.js';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from '@material-ui/core';

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
      <div className="l-auth-reg__form">
        <img src={authLogo} className="l-auth-reg__logo" alt="auth-logo" />
        <h1 className={styles.registrationForm__heading}>РЕГИСТРАЦИЯ</h1>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            role: '',
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
              .required(REQUIRED_ERROR),
            surname: Yup.string()
              .max(
                MAX_NAME_LENGTH,
                `Фамилия должна иметь не более ${MAX_SURNAME_LENGTH} символов`
              )
              .required(REQUIRED_ERROR),
            email: Yup.string()
              .email(INVALID_EMAIL_ERROR)
              .required(REQUIRED_ERROR),
            password: Yup.string()
              .required(REQUIRED_ERROR)
              .min(6, WEAK_PASSWORD_ERROR),
            confirmPassword: Yup.string()
              .required(REQUIRED_ERROR)
              .oneOf([Yup.ref('password'), null], PASSWORD_MISMATCH_ERROR),
            role: Yup.string().required(REQUIRED_ERROR),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleRegistration(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <form
              className={styles.registrationForm__form}
              onSubmit={props.handleSubmit}
            >
              <TextField
                error={props.touched.name && props.errors.name}
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
                error={props.touched.surname && props.errors.surname}
                className={styles.registrationForm__input}
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
              <FormControl
                className={styles.registrationForm__input}
                error={props.touched.role && props.errors.role}
              >
                <InputLabel htmlFor="registation-role-picker">РОЛЬ</InputLabel>
                <Select
                  placeholder="РОЛЬ"
                  value={props.values.role}
                  onChange={props.handleChange}
                  inputProps={{
                    name: 'role',
                    id: 'registation-role-picker',
                  }}
                >
                  <MenuItem value={'СПЕЦИАЛИСТ ПО ПРОДАЖАМ'}>
                    СПЕЦИАЛИСТ ПО ПРОДАЖАМ
                  </MenuItem>
                  <MenuItem value={'АДМИНИСТРАТОР ПРОДУКТОВ'}>
                    АДМИНИСТРАТОР ПРОДУКТОВ
                  </MenuItem>
                </Select>
                <FormHelperText>
                  {props.touched.role && props.errors.role
                    ? props.errors.role
                    : null}
                </FormHelperText>
              </FormControl>
              <TextField
                error={
                  emailError || (props.touched.email && props.errors.email)
                }
                className={styles.registrationForm__input}
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
              {}
              <TextField
                error={props.touched.password && props.errors.password}
                className={styles.registrationForm__input}
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
                className={styles.registrationForm__input}
                error={
                  props.touched.confirmPassword && props.errors.confirmPassword
                }
                type="password"
                label="ПОДТВЕРДИТЕ ПАРОЛЬ"
                value={props.values.confirmPassword}
                onChange={props.handleChange}
                name="confirmPassword"
                helperText={
                  props.touched.confirmPassword && props.errors.confirmPassword
                    ? props.errors.confirmPassword
                    : null
                }
              />
              <button
                type="submit"
                disabled={props.isSubmitting}
                className={styles.registrationForm__button}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
            </form>
          )}
        </Formik>
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
