import Loading from '../Layout/Loading';
import Single from '../Single/Single';

import styles from './Videos.module.scss';

export default function Videos({ title = 'All Videos', videos = [], innerRef }) {
  return (
    <div className={styles.allVideosWrapper}>
      <div className={styles.allVideosHeader}>
        <h6>{title}</h6>
      </div>
      <div className={styles.allVideosCont} ref={innerRef}>
        {videos && videos.map((video) => <Single key={video.id} video={video} />)}
      </div>
    </div>
  );
}
