import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../src/components/Page/VideoPage.module.scss';

const Website = () => {
  const router = useRouter();
  const { websiteId } = router.query;

  useEffect(() => {
    async function getData() {
      console.log(' hi there');
    }

    getData();
  }, [websiteId]);

  return (
    <div className={styles.videoPage}>
      <h1>huzzah</h1>
    </div>
  );
};

export default Website;
