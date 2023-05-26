import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { search } from '../src/actions/typesense';
import Link from 'next/link';
import styles from '../src/assets/styles/pages/SearchPage.module.scss';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);

  useEffect(() => {
    // TODO: DRY and rewrite this to a case switch
    async function getData() {
      let tempQuery = '';
      let response;
      if (router.query.brand) {
        tempQuery = router.query.brand;
        response = await search(tempQuery, 'brand', 'brand');
      } else if (router.query.category) {
        tempQuery = router.query.category;
        response = await search(tempQuery, 'tags', 'tags');
      } else if (router.query.query) {
        tempQuery = router.query.query;
        response = await search(tempQuery);
      } else {
        response = { hits: [] };
      }
      setQuery(tempQuery);
      setHits(response.hits);
    }
    getData();
  }, [router]);

  return (
    <div className={styles.searchPage}>
      <h1 className={styles.pageTitle}>
        {`(${hits.length}) Search results for "`}
        <span className={styles.italics}>{`${query}`}</span>
        {` "`}
      </h1>
      {hits &&
        hits.map((hit) => {
          return (
            <div className={styles.hit} key={hit.document.id}>
              <Link href={`/video/${hit.document.id}`}>
                <div>
                  <img className={styles.thumbnail} src={hit.document.thumbnail} />
                  <p>{hit.document.title}</p>
                  <p>{hit.document.brand[0]}</p>
                  <p>{hit.document.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      {hits && hits.length === 0 && <p className={styles.noResults}>0 Results</p>}
    </div>
  );
}
