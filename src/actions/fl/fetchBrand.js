import app from './config';

export const fetchBrand = async (brandId) => {
  try {
    const video = await app.content.get({
      schemaKey: 'brands',
      entryId: brandId,
      fields: ['title']
    });
    return video;
  } catch (error) {
    console.error(error);
    return false;
  }
};
