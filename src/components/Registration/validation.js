import {
  MAX_NAME_LENGTH,
  MAX_SURNAME_LENGTH,
  ONLY_CYRILLIC_SYMBOLS,
  INVALID_EMAIL_ERROR,
  REQUIRED_ERROR,
  WEAK_PASSWORD_ERROR,
  PASSWORD_MISMATCH_ERROR,
} from "../../errorMessages";
import * as Yup from "yup";

export const registrationValidation = Yup.object({
  name: Yup.string()
    .max(
      MAX_NAME_LENGTH,
      `Имя должно иметь не более ${MAX_NAME_LENGTH} символов`
    )
    .trim()
    .matches(/^[А-Яа-яЁё]+$/, ONLY_CYRILLIC_SYMBOLS)
    .required(REQUIRED_ERROR),
  surname: Yup.string()
    .max(
      MAX_NAME_LENGTH,
      `Фамилия должна иметь не более ${MAX_SURNAME_LENGTH} символов`
    )
    .trim()
    .matches(/^[А-Яа-яЁё]+$/, ONLY_CYRILLIC_SYMBOLS)
    .required(REQUIRED_ERROR),
  email: Yup.string().email(INVALID_EMAIL_ERROR).required(REQUIRED_ERROR),
  password: Yup.string()
    .required(REQUIRED_ERROR)
    .matches(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      "Слабый пароль"
    )
    .min(6, WEAK_PASSWORD_ERROR),
  confirmPassword: Yup.string()
    .required(REQUIRED_ERROR)
    .oneOf([Yup.ref("password"), null], PASSWORD_MISMATCH_ERROR),
});
