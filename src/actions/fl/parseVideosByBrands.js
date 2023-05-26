export const parseVideosByBrands = (videos) => {
  const brandMap = new Map();
  const tempBrands = [];

  videos.sort((a, b) => {
    if (a.brand[0] > b.brand[0]) {
      return 1;
    } else {
      return -1;
    }
  });

  videos.forEach((item) => {
    const currentBrand = brandMap.get(item.brand[0]);
    if (!currentBrand) {
      brandMap.set(item.brand[0], [item]);
    } else {
      currentBrand.push(item);
      brandMap.set(item.brand[0], currentBrand);
    }
  });

  brandMap.forEach((item) => {
    tempBrands.push(item);
  });
  return tempBrands;
};
