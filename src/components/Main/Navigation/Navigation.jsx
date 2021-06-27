import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

const Navigation = (props) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.workBlocks}>
        <NavLink
          exact
          to="/main"
          className={styles.navigation__item}
          activeClassName={styles.active}
        >
          Стартовая страница
        </NavLink>
        <NavLink
          to="/main/clients"
          className={styles.navigation__item}
          activeClassName={styles.active}
        >
          Клиенты
        </NavLink>
      </div>
      <div className={styles.profileBlock}>
        <NavLink
          to="/main/profile"
          className={styles.navigation__item}
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
