import app from './config';

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
