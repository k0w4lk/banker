import styles from "./AuthRegButton.module.scss";

const AuthRegButton = (props) => {
  const { text, ...restProps } = props;
  return (
    <button {...restProps} className={styles.button}>
      {text}
    </button>
  );
};

export default AuthRegButton;
