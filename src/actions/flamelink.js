import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import flamelink from 'flamelink/app';
import 'flamelink/content';
import 'flamelink/storage';

const projectId = 'cvd-2-d6aa3';
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const app = flamelink({
  firebaseApp,
  dbType: 'cf'
});

export const getFileById = async (id) => {
  try {
    const res = await app.storage.getFiles();
    console.log(res);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getVideos = async (startAfter, limit = 20) => {
  try {
    const options = {
      schemaKey: 'videos',
      limit: limit,
      filters: [
        ['show', '==', true],
        ['featured', '==', true]
      ],
      orderBy: [
        { field: 'publishDate', order: 'desc' },
        { field: 'vimeo', order: 'desc' }
      ]
    };
    if (startAfter) {
      options.startAfter = startAfter;
    }
    const videos = await app.content.get({ ...options });
    return videos;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getArticles = async (startAfter, limit = 12) => {
  try {
    const options = {
      schemaKey: 'websites',
      limit: limit,
      filters: [],
      orderBy: [{ field: 'publishDate', order: 'desc' }]
    };
    if (startAfter) {
      options.startAfter = startAfter;
    }
    const videos = await app.content.get({ ...options });
    return videos;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFeaturedCollection = async () => {
  try {
    const options = {
      schemaKey: 'collections',
      limit: 1,
      field: ['videos', 'isEnabled'],
      filters: [['title', '==', 'Featured Collection']],
      populate: ['videos', 'isEnabled']
    };
    const res = await app.content.get({ ...options });
    const parsed = Object.values(res)[0];
    if (!parsed.isEnabled) return [];
    const videos = parsed.videos;
    return videos;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getNextVideo = async (startAfter) => {
  try {
    const options = {
      schemaKey: 'videos',
      limit: 1,
      filters: [
        ['show', '==', true],
        ['featured', '==', true]
      ],
      orderBy: [{ field: 'publishDate', order: 'asc' }]
    };
    if (startAfter) {
      options.startAfter = startAfter;
    }
    const videos = await app.content.get({ ...options });
    return videos;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllBySchema = async (schemaKey) => {
  try {
    const options = {
      schemaKey: schemaKey,
      filters: []
    };
    const videos = await app.content.get({ ...options });
    const parsed = Object.values(videos);
    return parsed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllVideos = async () => {
  try {
    const options = {
      schemaKey: 'videos',
      filters: [],
      orderBy: [{ field: 'publishDate', order: 'desc' }]
    };
    const videos = await app.content.get({ ...options });
    const parsed = Object.values(videos);
    return parsed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getAllArticles = async () => {
  try {
    const options = {
      schemaKey: 'websites',
      filters: [],
      orderBy: [{ field: 'title', order: 'desc' }]
    };
    const videos = await app.content.get({ ...options });
    const parsed = Object.values(videos);
    return parsed;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getSingleArticleById = async (articleId) => {
  try {
    const video = await app.content.get({
      schemaKey: 'websites',
      entryId: articleId,
      fields: [
        'id',
        'title',
        'url',
        'brand',
        'publishDate',
        'tags',
        'dWebThumbnail',
        'mWebThumbnail',
        'show',
        'featured'
      ]
    });
    return video;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getBrandsFromVideos = async () => {
  const parsed = await getAllVideos();
  const tempBrands = [];
  parsed.map((item) => {
    item.brand.forEach((brandName) => {
      if (tempBrands.indexOf(brandName) === -1) {
        tempBrands.push(brandName);
      }
    });
  });
  tempBrands.sort();
  return tempBrands;
};

export const parseVideosByBrands = (videos) => {
  const brandMap = new Map();
  const tempBrands = [];

  videos.sort((a, b) => {
    if (a.brand[0] > b.brand[0]) {
      return 1;
    } else {
      return -1;
    }
  });

  videos.forEach((item) => {
    const currentBrand = brandMap.get(item.brand[0]);
    if (!currentBrand) {
      brandMap.set(item.brand[0], [item]);
    } else {
      currentBrand.push(item);
      brandMap.set(item.brand[0], currentBrand);
    }
  });

  brandMap.forEach((item) => {
    tempBrands.push(item);
  });
  return tempBrands;
};

// TODO: make this dynamic to db.
export const getAllMainCategories = async () => {
  const allCats = await getAllBySchema('category');
  return allCats.map((cat) => cat.title);
};
