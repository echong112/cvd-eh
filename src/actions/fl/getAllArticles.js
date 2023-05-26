import app from './config';

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
