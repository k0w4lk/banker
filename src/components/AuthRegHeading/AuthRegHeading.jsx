import styles from './AuthRegHeading.module.scss';

const AuthRegHeading = (props) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{props.heading}</h1>
      {props.children}
    </div>
  );
};

export default AuthRegHeading;
