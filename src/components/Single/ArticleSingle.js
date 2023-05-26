import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Single.module.scss';
import * as ga from '../../actions/ga';
import { getFileUrlById } from '../../actions/fl';

export default function SingleArticle({ video }) {
  const [mWebThumb, setMwebThumb] = useState('');
  const [dWebThumb, setDwebThumb] = useState('');

  useEffect(() => {
    async function getData() {
      const mWeb = video.mWebThumbnail.length > 0 ? video.mWebThumbnail[0].id || false : false;
      const dWeb = video.dWebThumbnail.length > 0 ? video.dWebThumbnail[0].id || false : false;
      // set the article tile

      // console.log(mWeb, dWeb);
      if (dWeb) {
        const dWebUrl = await getFileUrlById(dWeb);
        setDwebThumb(dWebUrl);
      }

      if (mWeb) {
        const mWebUrl = await getFileUrlById(mWeb);
        setMwebThumb(mWebUrl);
      }
    }
    getData();
  }, []);

  // images come as an array
  return (
    <div className={styles.container}>
      <Link href={`/articles/?detail=${video.id}`} className={styles.link}>
        <div
          className={styles.singleVideo}
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
                backgroundImage: `url(${dWebThumb})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <div className={styles.cardCont}>
                <div className={'gradient'}></div>
                <div className={styles.videoInfoCont}>
                  {/* <p className={styles.brand}>{video.brand}</p> */}
                  <p className={styles.title}>{video.title}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
