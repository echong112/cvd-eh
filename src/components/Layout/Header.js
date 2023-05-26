import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Playlist } from '../Playlist/Playlist';
import Search from './Search';
import styles from './Header.module.scss';
import playlistIcon from '../../assets/img/playlistIcon.svg';
import searchIcon from '../../assets/img/searchIcon.svg';
import courageousLogo from '../../assets/img/courageous.svg';

export default function Header() {
  const router = useRouter();
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrollingDown(window.pageYOffset > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollingDown]);

  useEffect(() => {
    function handleClick(e) {
      if (playlistOpen) {
        if (e.target.className.search('playlistContainer') > -1) {
          setPlaylistOpen(false);
        }
      }
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`${styles.header}`}>
      <div className={styles.headerLogo}>
        <Link href="/">
          <div className={styles.logoSwitchCont}>
            <img src={courageousLogo.src} alt="logo" className={styles.logoImageMain} />
          </div>
        </Link>
      </div>
      <div className={styles.collapse}>{router.pathname.indexOf('browse') < 0 && <Search />}</div>
      <div className={styles.playListButtonCont}>
        <button onClick={() => router.push('/browse')} className={styles.advancedSearchBtn}>
          <img src={searchIcon.src} alt="search" />
          <span className={styles.tooltiptext}>Advanced Search</span>
        </button>
        <button onClick={() => setPlaylistOpen(!playlistOpen)}>
          <img src={playlistIcon.src} alt="playlist" />
        </button>
      </div>
      <Playlist
        isPlaylistOpen={playlistOpen}
        onClickOnPlaylistUrl={() => {
          setPlaylistOpen(false);
        }}
      />
    </div>
  );
}
