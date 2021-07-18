import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import { logOut } from "./../../../store/reducers/authReducer";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AuthContext } from "../../../context/authContext.js";
import { getCurrentUser } from "../../../selectors/profileSelectors.js";
import { setUpdatedUserData } from "../../../store/reducers/profileReducer.js";
import AddNavPanelTextButton from "../../common/AddNavPanel/TextButton";
import AddNavPanel from "./../../common/AddNavPanel";
import styles from "./Profile.module.scss";
import {
  MAX_NAME_LENGTH,
  MAX_SURNAME_LENGTH,
  ONLY_CYRILLIC_SYMBOLS,
  REQUIRED_ERROR,
} from "../../../errorMessages.js";
import { transferActionData } from "../../../store/reducers/actionsReducer";

const Profile = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const profile = useSelector((state) => getCurrentUser(state));
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel>
        <AddNavPanelTextButton
          type="button"
          disabled={isEditMode}
          onClick={() => setIsEditMode(true)}
          text="РЕДАКТИРОВАТЬ"
        />
        {isEditMode ? (
          <AddNavPanelTextButton
            form="profile-data-form"
            type="submit"
            text="СОХРАНИТЬ"
            className={styles.saveButton}
          />
        ) : null}
        <AddNavPanelTextButton
          onClick={() => dispatch(logOut())}
          type="button"
          text="ВЫЙТИ"
          className={styles.exitButton}
        />
      </AddNavPanel>
      <Formik
        initialValues={{
          name: profile.name,
          surname: profile.surname,
          email: profile.email,
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
              MAX_SURNAME_LENGTH,
              `Фамилия должна иметь не более ${MAX_SURNAME_LENGTH} символов`
            )
            .matches(/^[А-Яа-я]+$/, ONLY_CYRILLIC_SYMBOLS)
            .required(REQUIRED_ERROR),
        })}
        onSubmit={(values) => {
          dispatch(
            setUpdatedUserData({
              name: values.name,
              surname: values.surname,
              id: user.uid,
            })
          );
          dispatch(
            transferActionData({
              id: user.uid,
              date: new Date().toLocaleDateString("ru"),
              time: new Date().toLocaleTimeString("ru"),
              action: `Изменены даныне личного профиля ${values.name} ${values.surname}`,
            })
          );
          setIsEditMode(!isEditMode);
        }}
      >
        {(formProps) => (
          <form
            id="profile-data-form"
            className={styles.profile__dataWrapper}
            onSubmit={formProps.handleSubmit}
          >
            <span className={styles.profile__dataHeading}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </span>
            <TextField
              variant="outlined"
              disabled
              value={formProps.values.email}
            />
            <span className={styles.profile__dataHeading}>ИМЯ</span>
            <TextField
              variant="outlined"
              disabled={!isEditMode}
              onChange={formProps.handleChange}
              name="name"
              value={formProps.values.name}
              error={Boolean(formProps.touched.name && formProps.errors.name)}
              helperText={
                formProps.touched.name && formProps.errors.name
                  ? formProps.errors.name
                  : null
              }
            />
            <span className={styles.profile__dataHeading}>ФАМИЛИЯ</span>
            <TextField
              variant="outlined"
              disabled={!isEditMode}
              onChange={formProps.handleChange}
              name="surname"
              value={formProps.values.surname}
              error={Boolean(
                formProps.touched.surname && formProps.errors.surname
              )}
              helperText={
                formProps.touched.surname && formProps.errors.surname
                  ? formProps.errors.surname
                  : null
              }
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
