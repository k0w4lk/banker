import styles from "./AuthRegForm.module.scss";

const AuthRegForm = (props) => {
  return (
    <form className={styles.form} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default AuthRegForm;
