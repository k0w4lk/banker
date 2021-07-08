import styles from './AddNavPanel.module.scss';

const AddNavPanel = (props) => {
  return <div className={styles.panel}>{props.children}</div>;
};

export default AddNavPanel;
