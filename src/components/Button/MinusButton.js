import minusIcon from '../../assets/img/minusIcon.svg';
import styles from './Button.module.scss';

export const MinusButton = ({ handleOnClick }) => {
  return (
    <button className={styles.button} onClick={handleOnClick}>
      <img src={minusIcon.src} alt="minus" />
    </button>
  );
};
