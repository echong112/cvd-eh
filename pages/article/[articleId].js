import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleArticleById, getSingleVideoById, getFileUrlById } from '../../src/actions/fl';
import Loading from '../../src/components/Layout/Loading';
// TODO: REFACTOR THESE STYLES
import styles from '../../src/components/Page/VideoPage.module.scss';

const Article = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function getData() {
      const singleArticle = await getSingleArticleById(articleId);
      const thumbnailFileId = singleArticle.dWebThumbnail?.[0]?.id;
      const thumbnailFileUrl = await getFileUrlById(thumbnailFileId);
      singleArticle.thumbnail = thumbnailFileUrl;
      if (singleArticle) {
        setArticle(singleArticle);
      }
    }
    getData();
  }, [articleId]);

  return (
    <div className={styles.videoPage}>
      {article && (
        <div>
          <Head>
            <title>{article.title}</title>
            <meta name="description" content={article.description} />
          </Head>
          <div className={styles.iframeContainer}>
            <div className={styles.playerWrapper}>
              {!article.vimeo && article.thumbnail && (
                <img src={article.thumbnail} className={styles.reactPlayer} />
              )}
            </div>
          </div>
          <div className={styles.inner}>
            {article.brand && <p className={styles.brandName}>{article.brand[0]}</p>}
            <p className={styles.title}>{article.title}</p>
            <p className={styles.desc}>{article.description}</p>
            <p className={styles.publishDate}>{`Published on ${article.publishDate}`}</p>
            {article.url && (
              <p className={styles.url}>
                <a href={article.url} target="_blank" rel="noreferrer">
                  {article.url}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
      {!article && <Loading />}
    </div>
  );
};

export default Article;
