import { ClickAwayListener, TextField, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthenticationStatus,
  getEmailError,
} from "../../selectors/authSelectors.js";
import { clearErrors, registration } from "../../store/reducers/authReducer.js";
import AuthRegButton from "../AuthRegButton/";
import AuthRegContainer from "../AuthRegContainer";
import AuthRegForm from "../AuthRegForm/AuthRegForm.jsx";
import AuthRegFormWrapper from "../AuthRegFormWrapper";
import AuthRegHeading from "../AuthRegHeading";
import AuthRegLogo from "../AuthRegLogo";
import AuthRegRedirect from "../AuthRegRedirect";
import styles from "./Registration.module.scss";
import { registrationValidation } from "./validation.js";

const Registration = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const dispatch = useDispatch();
  const emailError = useSelector(getEmailError);
  const isAuthenticating = useSelector(getAuthenticationStatus);
  return (
    <AuthRegContainer>
      <AuthRegFormWrapper>
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
              <HelpOutlineIcon
                onClick={() => setTooltipOpen(!tooltipOpen)}
                className={styles.help}
              />
            </Tooltip>
          </ClickAwayListener>
        </AuthRegHeading>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registrationValidation}
          onSubmit={(values) => {
            dispatch(
              registration(
                values.email,
                values.password,
                values.name.trim(),
                values.surname.trim()
              )
            );
          }}
        >
          {(props) => (
            <AuthRegForm onSubmit={props.handleSubmit}>
              <TextField
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
                error={Boolean(
                  emailError || (props.touched.email && props.errors.email)
                )}
                value={props.values.email}
                onChange={props.handleChange}
                label="ЭЛЕКТРОННАЯ ПОЧТА"
                name="email"
                helperText={`${
                  props.touched.email && props.errors.email
                    ? props.errors.email
                    : ""
                }\n${emailError ? emailError : ""}`}
              />
              <TextField
                error={Boolean(props.touched.password && props.errors.password)}
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
                error={Boolean(
                  props.touched.confirmPassword && props.errors.confirmPassword
                )}
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
              <AuthRegButton
                text="ЗАРЕГИСТРИРОВАТЬСЯ"
                type="submit"
                disabled={isAuthenticating}
              />
            </AuthRegForm>
          )}
        </Formik>
        <AuthRegRedirect
          text="УЖЕ ЗАРЕГИСТРИРОВАНЫ?"
          linkText="ВОЙТИ"
          to={"/"}
          onLinkClickHandler={() => dispatch(clearErrors)}
        />
      </AuthRegFormWrapper>
    </AuthRegContainer>
  );
};

export default Registration;
