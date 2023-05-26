import plusIcon from '../../assets/img/plusIcon.svg';
import styles from './Button.module.scss';
export const PlusButton = ({ handleOnClick }) => {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      <img src={plusIcon.src} alt="plus" />
    </button>
  );
};
