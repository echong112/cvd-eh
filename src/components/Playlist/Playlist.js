import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Playlist.module.scss';
import deleteVideoIcon from '../../assets/img/deleteVideoIcon.svg';
import { getPlaylist, removeFromPlaylist } from '../../actions/playlist';
import { fetchBrand, getSingleArticleById, getSingleVideoById } from '../../actions/fl';
import { copyTextToClipboard } from '../../actions/clipboard';
import { emailPlaylist, playlistToString } from '../../actions/emailPlaylist';

export const Playlist = ({ isPlaylistOpen, onClickOnPlaylistUrl }) => {
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [playlistMap, setPlaylistMap] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getPlaylist();
      setPlaylistMap(res);
      const tempPlaylist = [];
      for (const video of res) {
        let singleVideo = await getSingleVideoById(video);
        if (!singleVideo) {
          singleVideo = await getSingleArticleById(video);
        }
        if (singleVideo) {
          const brand = singleVideo.brands;
          if (brand) {
            const res = await fetchBrand(brand.id);
            singleVideo.brand = res;
            tempPlaylist.push(singleVideo);
          }
        }
      }
      setPlaylistVideos(tempPlaylist);
    }
    getData();
  }, [isPlaylistOpen]);

  return (
    <div className={`${styles.playlistContainer} ${isPlaylistOpen ? styles.opened : ''}`}>
      <div className={styles.closer} onClick={() => onClickOnPlaylistUrl()}></div>
      <div className={styles.playlist}>
        <div className={styles.headerCont}>
          <h6>Videos in Queue</h6>
        </div>
        <div className={styles.playlistRowCont}>
          {playlistVideos &&
            playlistVideos.map((vid, index) => {
              if (vid) {
                return (
                  <div key={index} className={styles.singleVidRow}>
                    <Link href={`/?detail=${playlistMap[index]}`}>
                      <p onClick={() => onClickOnPlaylistUrl()} className={styles.videoTitle}>
                        {vid.title}
                      </p>
                    </Link>
                    {vid.brand.title && <p>{vid.brand.title}</p>}
                    <button
                      onClick={async () => {
                        const playlistTemp = [...playlistVideos];
                        playlistTemp.splice(index, 1);
                        setPlaylistVideos(playlistTemp);
                        await removeFromPlaylist(playlistMap[index]);
                      }}
                    >
                      <img src={deleteVideoIcon.src} alt="x" />
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => copyTextToClipboard(playlistToString(playlistVideos, playlistMap))}
          >
            Copy Playlist
          </button>
          <button onClick={() => emailPlaylist(playlistVideos, playlistMap)}>Email Playlist</button>
          <button onClick={onClickOnPlaylistUrl}>X</button>
        </div>
      </div>
    </div>
  );
};
