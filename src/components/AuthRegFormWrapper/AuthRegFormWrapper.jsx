import styles from "./AuthRegFormWrapper.module.scss";

const AuthRegFormWrapper = (props) => {
  return <div className={styles.formWrapper}>{props.children}</div>;
};

export default AuthRegFormWrapper;
