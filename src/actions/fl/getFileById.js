import app from './config';
// TODO: This is not correct
export const getFileById = async (id) => {
  try {
    const res = await app.storage.getFiles();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};
