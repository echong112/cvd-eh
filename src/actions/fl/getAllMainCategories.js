import { getAllBySchema } from './getAllBySchema';

// TODO: make this dynamic to db.
export const getAllMainCategories = async () => {
  const allCats = await getAllBySchema('category');
  return allCats.map((cat) => cat.title);
};
