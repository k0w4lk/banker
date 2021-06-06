import { AuthContext } from '../../../context/authContext.js';
import { useContext } from 'react';
import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import styles from './Profile.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';

const Profile = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel>
        <button className="panel__button" onClick={handleLogout}>
          РЕДАКТИРОВАТЬ
        </button>
        <button
          className={classNames('panel__button', styles.profile__exitButton)}
          onClick={handleLogout}
        >
          ВЫЙТИ
        </button>
      </AddNavPanel>
      <div className={styles.profile__dataWrapper}>
        <span className={styles.profile__dataHeading}>ЭЛЕКТРОННАЯ ПОЧТА</span>
        <input disabled className={styles.profile__dataValue} type="email" />
        <span className={styles.profile__dataHeading}>ПАРОЛЬ</span>
        <input disabled className={styles.profile__dataValue} type="password" />
        <span className={styles.profile__dataHeading}>ИМЯ</span>
        <input disabled className={styles.profile__dataValue} type="text" />
        <span className={styles.profile__dataHeading}>ФАМИЛИЯ</span>
        <input disabled className={styles.profile__dataValue} type="text" />
        <span className={styles.profile__dataHeading}>ФОТО ПРОФИЛЯ</span>
        <input disabled className={styles.profile__dataValue} type="file" />
      </div>
    </div>
  );
};

export default Profile;
