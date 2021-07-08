import AddNavPanel from './../../common/AddNavPanel';
import MainCalendar from './MainCalendar';
import ActionsHistory from './ActionsHistory';
import Reminder from './Reminder';
import 'react-calendar/dist/Calendar.css';
import styles from './StartPage.module.scss';
import './../../../assets/styles/main.scss';

const StartPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AddNavPanel className={styles.nav} />
      <div className={styles.contentWrapper}>
        <ActionsHistory />
        <MainCalendar />
        <Reminder />
      </div>
    </div>
  );
};

export default StartPage;
