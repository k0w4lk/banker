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
  INVALID_EMAIL_ERROR,
  WEAK_PASSWORD_ERROR,
  REQUIRED_ERROR,
  PASSWORD_MISMATCH_ERROR,
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
        {isEditMode ? (
          <button
            className="c-add-nav-panel__text-button"
            onClick={() => setIsEditMode(!isEditMode)}
            type="button"
          >
            СОХРАНИТЬ
          </button>
        ) : (
          <button
            className="c-add-nav-panel__text-button"
            onClick={() => setIsEditMode(!isEditMode)}
            form="profile-data-form"
            type="submit"
          >
            РЕДАКТИРОВАТЬ
          </button>
        )}
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
              MAX_NAME_LENGTH,
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
        }}
      >
        {(props) => (
          <form
            id="profile-data-form"
            className={styles.profile__dataWrapper}
            onSubmit={props.handleSubmit}
          >
            <span className={styles.profile__dataHeading}>
              ЭЛЕКТРОННАЯ ПОЧТА
            </span>
            <TextField variant="outlined" disabled value={props.values.email} />
            <span className={styles.profile__dataHeading}>ИМЯ</span>
            <TextField
              variant="outlined"
              disabled={!isEditMode}
              onChange={props.handleChange}
              name="name"
              value={props.values.name}
            />
            <span className={styles.profile__dataHeading}>ФАМИЛИЯ</span>
            <TextField
              variant="outlined"
              disabled={!isEditMode}
              onChange={props.handleChange}
              name="surname"
              value={props.values.surname}
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
