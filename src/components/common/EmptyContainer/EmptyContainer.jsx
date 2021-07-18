import styles from './EmptyContainer.module.scss';
import emptyBox from './../../../assets/images/empty-box.svg';

const EmptyContainer = (props) => {
  return (
    <div className={styles.wrapper}>
      <img src={emptyBox} className={styles.img} alt="empty icon" />
      <p className={styles.text}>{props.text}</p>
    </div>
  );
};

export default EmptyContainer;
