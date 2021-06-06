import { AuthContext } from '../../../context/authContext.js';
import { useContext } from 'react';
import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import styles from './Products.module.scss';
import './../../../assets/styles/main.scss';
import classNames from 'classnames';

const Products = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel>
        <button className="panel__button" onClick={handleLogout}>
          ПОИСК
        </button>
        <button
          className={classNames('panel__button', styles.profile__exitButton)}
          onClick={handleLogout}
        >
          ДОБАВИТЬ ПРОДУКТ
        </button>
      </AddNavPanel>
    </div>
  );
};

export default Products;
