import styles from "./ClientFormButton.module.scss";
import classNames from "classnames";

const ClientFormButton = (props) => {
  const { text, buttonType, ...restProps } = props;

  return (
    <button
      className={classNames(styles.button, {
        [styles.buttonSubmit]: buttonType === "submit",
        [styles.buttonCancel]: buttonType === "cancel",
      })}
      {...restProps}
    >
      {text}
    </button>
  );
};

export default ClientFormButton;
