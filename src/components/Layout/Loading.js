import LoadingSpin from 'react-loading-spin';
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingSpin primaryColor={'rgb(181, 148, 68)'} />
    </div>
  );
}
