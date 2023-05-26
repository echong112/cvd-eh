import ArticleSingle from '../Single/ArticleSingle';
// TODO: FIX THIS
import styles from '../Videos/Videos.module.scss';

export default function Videos({ title = 'All Articles', videos = [], innerRef }) {
  return (
    <div className={styles.allVideosWrapper}>
      <div className={styles.allVideosHeader}>
        <h6>{title}</h6>
      </div>
      <div className={styles.allVideosCont} ref={innerRef}>
        {videos && videos.map((video) => <ArticleSingle key={video.id} video={video} />)}
      </div>
    </div>
  );
}
