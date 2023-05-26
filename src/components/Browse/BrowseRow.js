import { useState } from 'react';
import styles from './BrowseRow.module.scss';
import { BrowseTile } from './BrowseTile';

import arrowDown from '../../assets/img/arrowDown.svg';
import arrowUp from '../../assets/img/arrowUp.svg';

export function BrowseRow({ brand, selectedBrand }) {
  const [show, setShow] = useState(false);
  const hasMore = brand.some((item) => !item.show);

  return (
    <div className={styles.brand}>
      <p className={styles.brandName}>{brand[0].brand[0]}</p>
      <div className={`${selectedBrand ? styles.selected : ''} ${styles.works}`}>
        {brand &&
          brand.map((video) => {
            if (video.show) {
              return <BrowseTile video={video} key={video.id} selectedBrand={selectedBrand} />;
            }
          })}
        {hasMore && (
          <div className={selectedBrand ? styles.selectedThumbnail : styles.thumbnail}>
            <button
              className={selectedBrand ? styles.selectedButton : styles.button}
              onClick={() => setShow(!show)}
            >
              {`${show ? 'Hide' : 'Show'} extended Content`}
              <img src={show ? arrowDown.src : arrowUp.src} className={styles.arrow} alt="arrow" />
            </button>
          </div>
        )}
        {show && (
          <>
            {brand &&
              brand.map((video) => {
                if (!video.show) {
                  return <BrowseTile video={video} key={video.id} selectedBrand={selectedBrand} />;
                }
              })}
          </>
        )}
      </div>
    </div>
  );
}
