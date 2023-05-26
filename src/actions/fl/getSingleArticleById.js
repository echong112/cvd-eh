import app from './config';

export const getSingleArticleById = async (articleId) => {
  try {
    const video = await app.content.get({
      schemaKey: 'websites',
      entryId: articleId,
      fields: [
        'id',
        'title',
        'url',
        'publishDate',
        'tags',
        'dWebThumbnail',
        'mWebThumbnail',
        'brand',
        'brands'
      ]
    });
    return video;
  } catch (error) {
    console.error(error);
    return false;
  }
};
