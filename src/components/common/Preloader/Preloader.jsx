import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.wrapper}>
      <CircularProgress />
    </div>
  );
};

export default Preloader;
