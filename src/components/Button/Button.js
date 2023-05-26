import minusIcon from '../../assets/minusIcon.svg';
import plusIcon from '../../assets/img/plusIcon.svg';
import styles from './Button.module.scss';

export const Button = ({ handleOnClick, isPlus, alt }) => {
  return (
    <button
      className={`${styles.button} ${isPlus ? styles.plusButton : styles.minusButton}`}
      onClick={handleOnClick}
    >
      <img src={isPlus ? plusIcon.src : minusIcon.src} alt={alt} />
    </button>
  );
};
