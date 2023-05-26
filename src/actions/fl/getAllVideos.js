import app from './config';

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
