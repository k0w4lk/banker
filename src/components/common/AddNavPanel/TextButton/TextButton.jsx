import classNames from 'classnames';
import styles from './TextButton.module.scss';

const AddNavPanelTextButton = (props) => {
  const { text, className, ...restProps } = props;
  return (
    <button className={classNames(styles.button, className)} {...restProps}>
      {text}
    </button>
  );
};

export default AddNavPanelTextButton;
