import app from './config';

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
