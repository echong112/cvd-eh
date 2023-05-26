import app from './config';

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
