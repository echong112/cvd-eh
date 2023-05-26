import app from './config';

export const getSingleVideoById = async (videoId) => {
  try {
    const video = await app.content.get({
      schemaKey: 'videos',
      entryId: videoId,
      fields: [
        'id',
        'title',
        'vimeo',
        'brand',
        'description',
        'series',
        'cpCode',
        'publishDate',
        'year',
        'tags',
        'thumbnail',
        'duration',
        'brands'
      ]
    });
    return video;
  } catch (error) {
    console.error(error);
    return false;
  }
};
