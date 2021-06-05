import { withRouter } from 'react-router';
import styles from './Navigation.module.scss';

const Navigation = (props) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.workBlocks}>
        <button
          className={styles.navigation__item}
          onClick={() => {
            props.history.push('/main');
          }}
        >
          Стартовая страница
        </button>
        <button
          className={styles.navigation__item}
          onClick={() => {
            props.history.push('/main/clients');
          }}
        >
          Клиенты
        </button>
        <button
          className={styles.navigation__item}
          onClick={() => {
            props.history.push('/main/products');
          }}
        >
          Продукты
        </button>
      </div>
      <div className={styles.profileBlock}>
        <button
          className={styles.navigation__item}
          onClick={() => {
            props.history.push('/main/profile');
          }}
        >
          Профиль
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
