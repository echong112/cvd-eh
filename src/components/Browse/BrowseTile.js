import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addToPlaylist, getPlaylist, removeFromPlaylist } from '../../actions/playlist';
import styles from './BrowseRow.module.scss';
import { getAllMainCategories } from '../../actions/fl';
import { convertSeconds } from '../../actions/utils';
import { MinusButton } from '../Button/MinusButton';
import { PlusButton } from '../Button/PlusButton';

export function BrowseTile({ video, selectedBrand }) {
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [category, setCategory] = useState('');
  const [mainCategories, setMainCategories] = useState([]);

  const onGetVideoDetails = () => {
    router.push(`/?detail=${video.id}`);
  };

  useEffect(() => {
    async function getData() {
      const playlist = await getPlaylist();
      const isOnPlayList = playlist.some((item) => item === video.id);
      const mainCategoriesRes = await getAllMainCategories();
      setMainCategories(mainCategoriesRes);
      setIsAdded(isOnPlayList);
    }

    if (video.tags) {
      video.tags.map((tag, index) => {
        if (mainCategories.indexOf(tag) > -1) {
          setCategory(mainCategories[index]);
        }
      });
    }
    getData();
  }, []);
  const handleAddVideoToPlaylist = async () => {
    setIsAdded(true);
    await addToPlaylist(video);
  };

  const handleRemoveFromPlaylist = async () => {
    setIsAdded(false);
    await removeFromPlaylist(video.id);
  };

  return (
    <div className={styles.container}>
      {!isAdded ? (
        <PlusButton handleOnClick={handleAddVideoToPlaylist} />
      ) : (
        <MinusButton handleOnClick={handleRemoveFromPlaylist} />
      )}
      <div
        onClick={onGetVideoDetails}
        className={`${selectedBrand ? styles.selectedWork : ''} ${styles.work}`}
      >
        <div
          className={styles.thumbnail}
          style={{
            background: `url(${video.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className={'gradient'}></div>
        </div>
        <p className={styles.title}>{video.title}</p>
        <p className={styles.meta}>
          {video.brand[0]} | {category}
          {' | '}
          {convertSeconds(video.duration)}
        </p>
      </div>
    </div>
  );
}
