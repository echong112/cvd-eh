import { useEffect, useState } from 'react';
import Link from 'next/link';
import { search } from '../../actions/typesense';
import styles from './Search.module.scss';
import { getFileUrlById } from '../../actions/fl';

export default function Search() {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickedOnVideo = () => {
    setHits([]);
    setQuery('');
  };

  useEffect(() => {
    async function getData() {
      if (query !== '') {
        const response = await search(query);
        const toReturn = [];

        for (const hit of response.hits) {
          const thumbnail = hit.document.dWebThumbnail?.[0]?.path
            ? await getFileUrlById(hit.document.dWebThumbnail[0].path)
            : null;
          toReturn.push({ ...hit, document: { ...hit.document, thumbnail } });
        }

        setHits(toReturn || []);
      } else {
        setHits([]);
      }
    }
    getData();
  }, [query]);

  return (
    <div className={styles.searchBarCont}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          className={styles.textInput}
          placeholder=" Quick Search..."
          type="text"
          id="search"
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query.length > 0 && (
          <span onClick={() => setQuery('')} className={styles.clearQuery}>
            X
          </span>
        )}
      </form>
      <div className={`${styles.searchResults} ${query.length > 0 ? '' : styles.closed}`}>
        {query.length > 0 && hits.length === 0 && (
          <>
            <p>No results</p>
          </>
        )}
        {hits &&
          hits.map((hit) => {
            console.log(hit.document);
            return (
              <Link href={`/?detail=${hit.document.id}`} key={hit.document.id}>
                <div onClick={handleClickedOnVideo} className={styles.hits}>
                  {hit.document.thumbnail && (
                    <img className={styles.thumbnail} src={hit.document.thumbnail} />
                  )}

                  <div>
                    <p className={styles.title}>{hit.document.title}</p>
                    {hit.document.brand && <p className={styles.brand}>{hit.document.brand[0]}</p>}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
