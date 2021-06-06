import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import styles from './StartPage.module.scss';
import './../../../assets/styles/main.scss';

const StartPage = () => {
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel />
    </div>
  );
};

export default StartPage;
