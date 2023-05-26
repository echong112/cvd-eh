import Typesense from 'typesense';

const sourceCollection = 'fl_content';

export async function search(query = '', queryBy = 'title,tags,description') {
  const host = 'x72bv3t0fenpqdsup-1.a1.typesense.net';
  const port = '443';
  const protocol = 'https';
  const connectionTimeoutSeconds = 5;
  let client = new Typesense.Client({
    nodes: [
      {
        host: host,
        port: port,
        protocol: protocol
      }
    ],
    apiKey: process.env.typeSenseApiKey,
    connectionTimeoutSeconds: connectionTimeoutSeconds
  });

  let searchParameters = {
    q: query,
    query_by: queryBy,
    per_page: 100
  };
  try {
    const searchResults = await client
      .collections(sourceCollection)
      .documents()
      .search(searchParameters);

    return searchResults;
  } catch (e) {
    console.error(e);
    return false;
  }
}
