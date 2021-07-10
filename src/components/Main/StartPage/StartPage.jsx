import 'react-calendar/dist/Calendar.css';
import './../../../assets/styles/main.scss';
import AddNavPanel from './../../common/AddNavPanel';
import ActionsHistory from './ActionsHistory';
import MainCalendar from './MainCalendar';
import Reminder from './Reminder';
import styles from './StartPage.module.scss';

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
