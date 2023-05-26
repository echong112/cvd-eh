import { useEffect, useState } from 'react';
import { getBrandsFromVideos } from '../../actions/fl';
import styles from './Header.module.scss';
import courageousLogo from '../../assets/img/courageousLogo.svg';

export default function Header() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function getData() {
      if (brands.length === 0) {
        const tempBrands = await getBrandsFromVideos();
        setBrands(tempBrands);
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.header}>
      <div className={`${styles.headerLogo} ${styles.noClick}`}>
        <div className={styles.logoSwitchCont}>
          <img src={courageousLogo.src} alt="logo" className={styles.logoImageMain} />
        </div>{' '}
      </div>
    </div>
  );
}
