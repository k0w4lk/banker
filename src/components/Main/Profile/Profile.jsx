import { AuthContext } from '../../../context/authContext.js';
import { useContext, useState } from 'react';
import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import styles from './Profile.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setUpdatedUserData } from '../../../store/reducers/profileReducer.js';
import { Formik } from 'formik';
import { TextField } from '@material-ui/core';
import * as Yup from 'yup';
import {
  REQUIRED_ERROR,
  MAX_NAME_LENGTH,
  MAX_SURNAME_LENGTH,
} from './../../../context/authContext';

const ONLY_CYRILLIC_SYMBOLS = 'Доступны только символы кириллического алфавита';

const Profile = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { handleLogout, user } = useContext(AuthContext);
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel>
        <button
          className="c-add-nav-panel__text-button"
          type="button"
          disabled={isEditMode}
          onClick={() => setIsEditMode(true)}
        >
          РЕДАКТИРОВАТЬ
        </button>
        {isEditMode ? (
          <button
            className={classNames(
              'c-add-nav-panel__text-button',
              styles.saveButton
            )}
            form="profile-data-form"
            type="submit"
          >
            СОХРАНИТЬ
          </button>
        ) : null}
        <button
          className={classNames(
            'c-add-nav-panel__text-button',
            styles.profile__exitButton
          )}
          onClick={handleLogout}
          type="button"
        >
          ВЫЙТИ
        </button>
      </AddNavPanel>
      <Formik
        initialValues={{
          name: props.profile.name,
          surname: props.profile.surname,
          email: props.profile.email,
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
          props.setUpdatedUserData({
            name: values.name,
            surname: values.surname,
            id: user.uid,
          });
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

const mapStateToProps = (state) => ({
  profile: state.currentUser,
});

export default connect(mapStateToProps, { setUpdatedUserData })(Profile);
