import app from './config';

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
