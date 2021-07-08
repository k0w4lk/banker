import styles from './TextButton.module.scss';

const AddNavPanelTextButton = (props) => {
  return (
    <button className={styles.button} {...props}>
      {props.text}
    </button>
  );
};

export default AddNavPanelTextButton;
