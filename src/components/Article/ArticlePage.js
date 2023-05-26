import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleArticleById } from '../../actions/fl';
import { getPlaylist } from '../../actions/playlist';
import Loading from '../../components/Layout/Loading';
import Share from '../../components/Share/Share';
// TODO: Fix this
import styles from '../../components/Page/VideoPage.module.scss';
import { getFileUrlById } from '../../actions/fl';

const VideoPage = ({ videoId, allVideos, article }) => {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isShare, setIsShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function getData() {
      const singleVideo = await getSingleArticleById(videoId);
      const entries = Object.values(allVideos);
      let filtered = entries;
      if (router.pathname.search('browse') > -1) {
        filtered = entries.filter((video) => {
          if (singleVideo && singleVideo.brand.length > 0) {
            const name = singleVideo.brand[0] || '';
            const videoName = video.brand[0] || '';
            name.toLowerCase() === videoName.toLowerCase();
          }
        });
      }

      const data = await getPlaylist();
      if (singleVideo) {
        data.some((item) => {
          if (item === singleVideo.id) {
            setIsAdded(true);
            return true;
          }
        });
        const thumb = await getFileUrlById(singleVideo.dWebThumbnail[0].id);
        setImage(thumb);
        setVideo(singleVideo);
      }
    }
    if (router.pathname.search('share') > -1) {
      setIsShare(true);
    }

    getData();
  }, [videoId]);

  return (
    <div className={`page ${styles.videoPage}`}>
      {video && (
        <div>
          <div className={styles.iframeContainer}>
            {!isShare && prev && !isPlaying && (
              <button onClick={handlePrev} className={styles.previous}>
                <p className={styles.buttonTitle}>Prev</p>
                <p>{prev.title}</p>
                <p className={styles.brand}>{prev.brand[0]}</p>
              </button>
            )}
            {image && (
              <a target="_blank" rel="noreferrer" href={article.url}>
                <img src={image} className={styles.hero} />
              </a>
            )}
            {!isShare && next && !isPlaying && (
              <button onClick={handleNext} className={styles.next}>
                <p className={styles.buttonTitle}>Next</p>
                <p>{next.title}</p>
                <p className={styles.brand}>{next.brand[0]}</p>
              </button>
            )}
          </div>
          <div className={styles.inner}>
            {video.brand && <p className={styles.brandName}>{video.brand[0]}</p>}
            <p className={styles.title}>{video.title}</p>

            <p className={styles.desc}>{video.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              <a target="_blank" rel="noreferrer" href={article.url}>
                URL
              </a>
            </p>
            {/* <p className={styles.publishDate}>{`Published on ${video.publishDate}`}</p> */}
            {/* <div className={styles.buttonContainer}>
              {isAdded && <button onClick={() => handleRemoveFromPlaylist()}>-</button>}
              {!isAdded && <button onClick={() => handleAddVideoToPlaylist()}>+</button>}
            </div> */}
            <Share video={video} />
          </div>
        </div>
      )}
      {!video && <Loading />}
    </div>
  );
};

export default VideoPage;
