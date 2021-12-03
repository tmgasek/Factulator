import axios from 'axios';

const baseUrl = 'https://en.wikipedia.org/w/api.php';

export const searchWiki = async (term) => {
  const params = {
    origin: '*',
    action: 'opensearch',
    search: `${term}`,
    namespace: 0,
    format: 'json',
  };
  const res = await axios.get(baseUrl, { params });
  return res.data;
};
