import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player/vimeo';
import { getSingleVideoById } from '../../src/actions/fl';
import Loading from '../../src/components/Layout/Loading';
import { convertSeconds } from '../../src/actions/utils';
// TODO: REFACTOR THESE STYLES
import styles from '../../src/components/Page/VideoPage.module.scss';

const Video = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const [video, setVideo] = useState(null);

  useEffect(() => {
    async function getData() {
      const singleVideo = await getSingleVideoById(videoId);
      if (singleVideo) {
        setVideo(singleVideo);
      }
    }
    getData();
  }, [videoId]);

  return (
    <div className={styles.videoPage}>
      {video && video.vimeo && (
        <div>
          <Head>
            <title>{video.title}</title>
            <meta name="description" content={video.description} />
          </Head>
          <div className={styles.iframeContainer}>
            <div className={styles.playerWrapper}>
              <ReactPlayer
                url={`https://vimeo.com/${video.vimeo}`}
                className={styles.reactPlayer}
                width="100%"
                height="100%"
                controls={true}
                onPause={() => {
                  setIsPlaying(false);
                  console.log('pausing');
                }}
                onPlay={() => {
                  setIsPlaying(true);
                }}
              />
            </div>
          </div>
          <div className={styles.inner}>
            {video.brand && <p className={styles.brandName}>{video.brand[0]}</p>}
            <p className={styles.title}>{video.title}</p>
            <span className={styles.desc}>{convertSeconds(video.duration)}</span>
            <p className={styles.desc}>{video.description}</p>
            <p className={styles.publishDate}>{`Published on ${video.publishDate}`}</p>
          </div>
        </div>
      )}
      {!video && <Loading />}
    </div>
  );
};

export default Video;
