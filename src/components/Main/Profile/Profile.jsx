import { AuthContext } from '../../../context/authContext.js';
import { useContext, useState } from 'react';
import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import styles from './Profile.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setUpdatedUserData } from '../../../store/reducers/profileReducer.js';
import { Formik } from 'formik';

const Profile = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { handleLogout, user } = useContext(AuthContext);
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel>
        {isEditMode ? (
          <button
            className="panel__button"
            onClick={() => setIsEditMode(!isEditMode)}
            type="button"
          >
            СОХРАНИТЬ
          </button>
        ) : (
          <button
            className="panel__button"
            onClick={() => setIsEditMode(!isEditMode)}
            form="profile-data-form"
            type="submit"
          >
            РЕДАКТИРОВАТЬ
          </button>
        )}
        <button
          className={classNames('panel__button', styles.profile__exitButton)}
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
            <input
              disabled
              className={styles.profile__dataValue}
              type="email"
              value={props.values.email}
            />
            <span className={styles.profile__dataHeading}>ПАРОЛЬ</span>
            <input
              disabled
              value=""
              className={styles.profile__dataValue}
              type="password"
            />
            <span className={styles.profile__dataHeading}>ИМЯ</span>
            <input
              disabled={!isEditMode}
              className={styles.profile__dataValue}
              type="text"
              onChange={props.handleChange}
              name="name"
              value={props.values.name}
            />
            <span className={styles.profile__dataHeading}>ФАМИЛИЯ</span>
            <input
              disabled={!isEditMode}
              className={styles.profile__dataValue}
              type="text"
              onChange={props.handleChange}
              name="surname"
              value={props.values.surname}
            />
            <span className={styles.profile__dataHeading}>ФОТО ПРОФИЛЯ</span>
            <input
              disabled={!isEditMode}
              className={styles.profile__dataValue}
              type="file"
              value=""
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
