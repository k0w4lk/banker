import styles from './AuthRegLogo.module.scss';
import AuthRegLogoUrl from './../../assets/images/logo.svg';

const AuthRegLogo = (props) => {
  return (
    <img src={AuthRegLogoUrl} className={styles.logo} alt="auth-reg-logo" />
  );
};

export default AuthRegLogo;
