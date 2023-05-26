import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player/vimeo';
import { getFileUrlById, getSingleArticleById, getSingleVideoById } from '../../actions/fl';
import { getPlaylist, removeFromPlaylist, addToPlaylistWithId } from '../../actions/playlist';
import Loading from '../../components/Layout/Loading';
import Share from '../../components/Share/Share';
import { convertSeconds } from '../../actions/utils';
import styles from './VideoPage.module.scss';
import * as ga from '../../actions/ga';

const placeholderImage = 'https://placehold.co/854x480';

const VideoPage = ({ videoId, allVideos }) => {
  const router = useRouter();
  const [video, setVideo] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [isShare, setIsShare] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  function getFormattedDateTime() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return `${formattedDate}`;
  }

  useEffect(() => {
    async function getData() {
      let singleVideo = await getSingleVideoById(videoId);
      if (!singleVideo) {
        singleVideo = await getSingleArticleById(videoId);
        const thumbnailFileId = singleVideo.dWebThumbnail[0]?.id;
        const thumbnailFileUrl = await getFileUrlById(thumbnailFileId);
        singleVideo.thumbnail = thumbnailFileUrl;
        if (!singleVideo.thumbnail) {
          singleVideo.thumbnail = placeholderImage;
        }
      }
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

      filtered.some((entry, index) => {
        if (entry.title === singleVideo?.title) {
          if (filtered[index - 1]) {
            setPrev(filtered[index - 1]);
          }
          if (filtered[index + 1]) {
            setNext(filtered[index + 1]);
          }
          return true;
        }
      });

      const data = await getPlaylist();
      if (singleVideo) {
        data.some((item) => {
          if (item === singleVideo.id) {
            setIsAdded(true);
            return true;
          }
        });
        setVideo(singleVideo);
      }
    }
    if (router.pathname.search('share') > -1) {
      setIsShare(true);
    }

    getData();
  }, [videoId]);

  const handleAddVideoToPlaylist = async () => {
    setIsAdded(true);
    await addToPlaylistWithId(videoId);
  };

  const handleRemoveFromPlaylist = async () => {
    setIsAdded(false);
    await removeFromPlaylist(videoId);
  };

  const handleNext = () => {
    router.push(`${router.pathname}?detail=${next.id}`);
    setNext(null);
    setPrev(null);
  };

  const handlePrev = () => {
    if (prev) {
      router.push(`${router.pathname}?detail=${prev.id}`);
      setNext(null);
      setPrev(null);
    }
  };

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
            <div className={styles.playerWrapper}>
              {video.vimeo && (
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
                    console.log('playing');

                    ga.event({
                      action: 'play',
                      params: {
                        title: `${video.brand || ''} ${video.title} ${video.vimeo || ''}`
                      }
                    });

                    setIsPlaying(true);
                  }}
                />
              )}
              {!video.vimeo && video.thumbnail && (
                <img src={video.thumbnail} className={styles.reactPlayer} />
              )}
            </div>
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
            {video.duration && (
              <span className={styles.desc}>{convertSeconds(video.duration)}</span>
            )}
            <p className={styles.desc}>{video.description}</p>
            <p className={styles.publishDate}>{`Published on ${getFormattedDateTime(
              video.publishDate
            )}`}</p>
            {video.url && (
              <a href={video.url} target="_blank" rel="noreferrer" className={styles.desc}>
                {video.url}
              </a>
            )}
            {video.vimeo && (
              <div className={styles.buttonContainer}>
                {isAdded && <button onClick={() => handleRemoveFromPlaylist()}>-</button>}
                {!isAdded && <button onClick={() => handleAddVideoToPlaylist()}>+</button>}
              </div>
            )}
            <Share video={video} />
          </div>
        </div>
      )}
      {!video && <Loading />}
    </div>
  );
};

export default VideoPage;
