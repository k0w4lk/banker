import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import { clearErrors } from "../../store/reducers/authReducer.js";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { REQUIRED_ERROR } from "../../errorMessages.js";
import {
  getAuthenticationStatus,
  getEmailError,
  getPasswordError,
} from "../../selectors/authSelectors.js";
import { logIn } from "../../store/reducers/authReducer.js";
import AuthRegButton from "../AuthRegButton";
import AuthRegContainer from "../AuthRegContainer";
import AuthRegFormWrapper from "../AuthRegFormWrapper";
import AuthRegHeading from "../AuthRegHeading";
import AuthRegLogo from "../AuthRegLogo";
import AuthRegRedirect from "../AuthRegRedirect";
import AuthRegForm from "../AuthRegForm/AuthRegForm.jsx";

const Authorization = (props) => {
  const dispatch = useDispatch();
  const emailError = useSelector(getEmailError);
  const passwordError = useSelector(getPasswordError);
  const isAuthenticating = useSelector(getAuthenticationStatus);
  return (
    <AuthRegContainer>
      <AuthRegFormWrapper>
        <AuthRegLogo />
        <AuthRegHeading heading="АВТОРИЗАЦИЯ" />
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().required(REQUIRED_ERROR),
            password: Yup.string().required(REQUIRED_ERROR),
          })}
          onSubmit={(values) => {
            dispatch(logIn(values.email, values.password));
          }}
        >
          {(props) => (
            <AuthRegForm onSubmit={props.handleSubmit}>
              <TextField
                error={Boolean(
                  passwordError ||
                    emailError ||
                    (props.touched.email && props.errors.email)
                )}
                disabled={isAuthenticating}
                autoFocus={true}
                onChange={props.handleChange}
                value={props.values.email}
                name="email"
                label="ЭЛЕКТРОННАЯ ПОЧТА"
                helperText={`${
                  props.touched.email && props.errors.email
                    ? props.errors.email
                    : ""
                }\n${emailError ? emailError : ""}`}
              />
              <TextField
                disabled={isAuthenticating}
                error={Boolean(
                  passwordError ||
                    (props.touched.password && props.errors.password)
                )}
                value={props.values.password}
                onChange={props.handleChange}
                name="password"
                label="ПАРОЛЬ"
                type="password"
                helperText={`${
                  props.touched.password && props.errors.password
                    ? props.errors.password
                    : ""
                }
                ${passwordError ? passwordError : ""}`}
              />
              <AuthRegButton
                type="submit"
                disabled={isAuthenticating}
                text="ВОЙТИ"
              />
            </AuthRegForm>
          )}
        </Formik>
        <AuthRegRedirect
          to={"/registration"}
          onLinkClickHandler={() => dispatch(clearErrors())}
          text="НЕТ УЧЕТНОЙ ЗАПИСИ?"
          linkText="СОЗДАТЬ"
        />
      </AuthRegFormWrapper>
    </AuthRegContainer>
  );
};

export default Authorization;
