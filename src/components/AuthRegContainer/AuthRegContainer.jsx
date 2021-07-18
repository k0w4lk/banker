import styles from './AuthRegContainer.module.scss';

const AuthRegContainer = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export default AuthRegContainer;
