import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { copyTextToClipboard } from '../../actions/clipboard';
import { addToPlaylist, getPlaylist, removeFromPlaylist } from '../../actions/playlist';
import styles from './Share.module.scss';

export default function Share({ video }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function getData() {
      const playlist = await getPlaylist();
      const isOnPlayList = playlist.some((item) => item === video.id);
      setIsAdded(isOnPlayList);
    }
    getData();
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleCopyToClipboard = async () => {
    setCopied(true);
    await copyTextToClipboard(
      `${window.location.origin}/${video.vimeo ? 'video' : 'article'}/${video.id}`
    );
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleAddVideoToPlaylist = async () => {
    setIsAdded(true);
    await addToPlaylist(video);
  };

  const handleRemoveFromPlaylist = async () => {
    setIsAdded(false);
    await removeFromPlaylist(video.id);
  };

  return (
    <div className={styles.share}>
      <BsThreeDotsVertical onClick={handleOpen} />
      {isOpen && (
        <div className={`${styles.menu}`}>
          {video.vimeo && (
            <p onClick={() => window.open(`https://vimeo.com/${video.vimeo}`, '_blank')}>
              Vimeo Link
            </p>
          )}
          <p onClick={handleCopyToClipboard}>
            Copy Link
            <span className={`${styles.copied} ${copied ? styles.show : {}}`}>Copied</span>
          </p>
          {!isAdded && <p onClick={handleAddVideoToPlaylist}>+ Playlist</p>}
          {isAdded && <p onClick={handleRemoveFromPlaylist}>Remove from Playlist</p>}
        </div>
      )}
    </div>
  );
}
