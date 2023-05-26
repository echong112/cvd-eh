import { getAllVideos } from './getAllVideos';

export const getBrandsFromVideos = async () => {
  const parsed = await getAllVideos();
  const tempBrands = [];
  parsed.map((item) => {
    item.brand.forEach((brandName) => {
      if (tempBrands.indexOf(brandName) === -1) {
        tempBrands.push(brandName);
      }
    });
  });
  tempBrands.sort();
  return tempBrands;
};
