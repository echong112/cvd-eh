import { useEffect, useState } from 'react';
import Link from 'next/link';
import { addToPlaylistWithId, getPlaylist, removeFromPlaylist } from '../../actions/playlist';
import { convertSeconds } from '../../actions/utils';
import styles from './Single.module.scss';
import * as ga from '../../actions/ga';
import { PlusButton } from '../Button/PlusButton';
import { MinusButton } from '../Button/MinusButton';
import { getFileUrlById, getSomething } from '../../actions/fl';
import webIcon from '../../assets/img/web-icon.svg';
import videoIcon from '../../assets/img/video-icon.svg';

export default function Single({ video, isSlide }) {
  const [isAdded, setIsAdded] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [brand, setBrand] = useState(null);

  const handleAddVideoToPlaylist = async () => {
    setIsAdded(true);
    await addToPlaylistWithId(isSlide ? video._fl_meta_.fl_id : video.id);
  };

  const handleRemoveFromPlaylist = async () => {
    setIsAdded(false);
    await removeFromPlaylist(isSlide ? video._fl_meta_.fl_id : video.id);
  };

  useEffect(() => {
    async function getData() {
      const playlist = await getPlaylist();
      const isOnPlayList = playlist.some((item) => item === video.id);
      if (video.dWebThumbnail?.length > 0) {
        const file = await getFileUrlById(video.dWebThumbnail[0].id);
        video.thumbnail = file;
      }
      if (video.thumbnail) {
        setThumbnail(video.thumbnail);
      }
      setIsAdded(isOnPlayList);
      const brand = await getSomething('brands', video.brands.id, ['title']);
      if (brand) {
        setBrand(brand.title);
      }
    }
    getData();
  }, []);

  if (video.id === 0) {
    return null;
  }
  return (
    <div className={`${styles.container} ${isSlide ? styles.slide : ''}`}>
      <Link href={`/?detail=${isSlide ? video._fl_meta_.fl_id : video.id}`} className={styles.link}>
        <div
          className={styles.single}
          onClick={() => {
            ga.event({
              action: 'clicked',
              params: {
                title: `${video.brand || ''} ${video.title} ${video.vimeo || ''}`
              }
            });
          }}
        >
          {video && (
            <div
              className={styles.wrapper}
              style={{
                backgroundImage: `url(${thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <img src={video.vimeo ? videoIcon.src : webIcon.src} className={styles.icon} />
              <div className={styles.cardCont}>
                <div className={'gradient'}></div>
                <div className={styles.videoInfoCont}>
                  {brand && <p className={styles.brand}>{brand}</p>}
                  {video.title && <p className={styles.title}>{video.title}</p>}
                  {video.duration && (
                    <p className={styles.title}>{convertSeconds(video.duration)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>

      {!isAdded && <PlusButton handleOnClick={() => handleAddVideoToPlaylist()} />}

      {isAdded && <MinusButton handleOnClick={handleRemoveFromPlaylist} />}
    </div>
  );
}
