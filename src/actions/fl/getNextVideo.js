import app from './config';

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
