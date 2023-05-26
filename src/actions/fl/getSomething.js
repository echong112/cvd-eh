import app from './config';

export const getSomething = async (schema, id, fields = []) => {
  try {
    const res = await app.content.get({
      schemaKey: schema,
      entryId: id,
      fields: [...fields]
    });
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
};
