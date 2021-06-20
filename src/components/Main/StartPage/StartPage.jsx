import AddNavPanel from '../common/AddNavPanel/AddNavPanel.jsx';
import MainCalendar from './MainCalendar/MainCalendar.jsx';
import 'react-calendar/dist/Calendar.css';
import styles from './StartPage.module.scss';
import './../../../assets/styles/main.scss';

const StartPage = () => {
  return (
    <div className={styles.profile__wrapper}>
      <AddNavPanel />
      <MainCalendar />
    </div>
  );
};

export default StartPage;
