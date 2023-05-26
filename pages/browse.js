import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  getAllVideos,
  parseVideosByBrands,
  getAllMainCategories,
  getAllBySchema,
  getSingleVideoById
} from '../src/actions/fl';
import { BrowseRow } from '../src/components/Browse/BrowseRow';
import styles from '../src/assets/styles/pages/BrowsePage.module.scss';
import Loading from '../src/components/Layout/Loading';
import VideoPage from '../src/components/Page/VideoPage';

import textDeleteIcon from '../src/assets/img/deleteVideoIcon.svg';

const Browse = () => {
  const router = useRouter();
  const [allVideos, setAllVideos] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [allBrands, setAllBrands] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState('');
  const [singleVideo, setSingleVideo] = useState(null);
  const [scrollingDown, setScrollingDown] = useState(false);

  const resetVideos = async () => {
    const tempBrands = await parseVideosByBrands(allVideos);
    setFiltered(tempBrands);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const res = await getAllVideos();
      const brands = await getAllBySchema('brands');
      const allBrandNames = brands.map((brand) => brand.title);
      const sorted = allBrandNames.sort();

      const tempBrands = parseVideosByBrands(res);
      const allCatRes = await getAllMainCategories();
      setAllCategories(allCatRes);
      setAllVideos(res);
      setAllBrands(allBrandNames);
      setFiltered(tempBrands);
      setBrands(tempBrands);
      setIsLoading(false);
    }
    if (brands.length === 0) {
      getData();
    }
  }, []);

  useEffect(() => {
    async function handleQuery() {
      if (query !== '') {
        setSelectedCategory('');
        setSelectedBrand('');
        const filtered = [];
        const lowerCaseQuery = query.toLowerCase();
        allVideos.forEach((video) => {
          const isInTitle = video.title.toLowerCase().search(lowerCaseQuery) > -1;
          const isInDescription = video.description.toLowerCase().search(lowerCaseQuery) > -1;

          const lowerCaseBrands = video.brand.map((item) => item.toLowerCase());
          const lowerCaseTags = video.tags.map((item) => item.toLowerCase());

          const isInBrandList = lowerCaseBrands.some(
            (brandName) => brandName.toLowerCase().search(lowerCaseQuery) > -1
          );
          const isInTagList = lowerCaseTags.some(
            (brandName) => brandName.toLowerCase().search(lowerCaseQuery) > -1
          );

          if (isInTitle || isInDescription || isInBrandList || isInTagList) {
            filtered.push(video);
          }
        });

        const filteredBrands = parseVideosByBrands(filtered);

        setFiltered(filteredBrands);
      } else {
        resetVideos();
      }
    }
    handleQuery();
  }, [query]);

  // TODO: make these more generic
  useEffect(() => {
    async function setBrand() {
      setQuery('');
      setSelectedCategory('');
      if (selectedBrand !== '') {
        const filtered = [];
        const lowerCaseQuery = selectedBrand.toLowerCase();
        allVideos.forEach((video) => {
          const lowerCaseBrands = video.brand.map((item) => item.toLowerCase());
          const isInBrandList = lowerCaseBrands.indexOf(lowerCaseQuery) > -1;
          if (isInBrandList) {
            filtered.push(video);
          }
        });
        const filteredBrands = parseVideosByBrands(filtered);
        setFiltered(filteredBrands);
      } else {
        resetVideos();
      }
    }
    setBrand();
  }, [selectedBrand]);

  useEffect(() => {
    async function setCategory() {
      setQuery('');
      setSelectedBrand('');
      if (selectedCategory !== '') {
        const filtered = [];
        const lowerCaseQuery = selectedCategory.toLowerCase();
        allVideos.forEach((video) => {
          const lowerCaseTags = video.tags.map((item) => item.toLowerCase());
          const isInTagList = lowerCaseTags.indexOf(lowerCaseQuery) > -1;
          if (isInTagList) {
            filtered.push(video);
          }
        });
        const filteredBrands = parseVideosByBrands(filtered);
        setFiltered(filteredBrands);
      } else {
        resetVideos();
      }
    }
    setCategory();
  }, [selectedCategory]);

  useEffect(() => {
    async function getData() {
      if (router.query.detail) {
        setDetail(router.query.detail);
        if (!singleVideo) {
          const singleVideoRes = await getSingleVideoById(router.query.detail);
          setSingleVideo(singleVideoRes);
        }
      } else {
        setDetail('');
      }
    }
    getData();
  }, [router]);

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 10) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollingDown]);

  return (
    <div className="page">
      {detail === '' && (
        <>
          <Head>
            <title>Browse</title>
            <meta name="description" content="Browse the Courageous Video Directory" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* This needs to be its own component */}

          <div
            className={`${styles.searchFilterCont} ${
              scrollingDown ? styles.searchFilterContScroll : ''
            }`}
          >
            {/* This needs to be its own component */}
            <div
              className={`${styles.searchContainer} ${
                scrollingDown ? styles.searchContainerScroll : ''
              }`}
            >
              <input
                value={query}
                placeholder="Search..."
                onChange={(event) => setQuery(event.target.value)}
              />
              <button
                onClick={() => {
                  setQuery('');
                }}
              >
                <img src={textDeleteIcon.src} alt="x with circle" />
              </button>
            </div>
            {/* This needs to be it's own component */}
            <div className={styles.selectContainer}>
              <select
                className={styles.dropdown}
                value={selectedBrand}
                onChange={(event) => setSelectedBrand(event.target.value)}
              >
                <option value={''}>Brand</option>
                {allBrands &&
                  allBrands.map((brand, i) => {
                    return (
                      <option key={i} value={brand}>
                        {brand}
                      </option>
                    );
                  })}
              </select>
              <select
                className={styles.dropdown}
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                <option value={''}>Category</option>
                {allCategories &&
                  allCategories.map((category, i) => {
                    return (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className={styles.regularBrowsePage}>
            {detail === '' &&
              filtered &&
              filtered.map((brand, i) => {
                return <BrowseRow brand={brand} key={i} selectedBrand={selectedBrand} />;
              })}
            {isLoading && <Loading />}
          </div>
        </>
      )}
      {detail !== '' && <VideoPage videoId={detail} allVideos={allVideos} />}
    </div>
  );
};
export default Browse;
