import { NavLink } from "react-router-dom";
import styles from "./AuthRegRedirect.module.scss";

const AuthRegRedirect = (props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>{props.text}&nbsp;</span>
      <NavLink
        className={styles.link}
        onClick={props.onLinkClickHandler}
        to={props.to}
      >
        {props.linkText}
      </NavLink>
    </div>
  );
};

export default AuthRegRedirect;
