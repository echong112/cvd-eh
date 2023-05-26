import app from './config';

export const getFileUrlById = async (id) => {
  try {
    const res = await app.storage.getURL({ fileId: id });
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};
