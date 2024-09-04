import axios from 'axios';
import { API_KEY, PER_PAGE } from '@helpers';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos/';

export async function fetchImages(query, page) {
  const response = await axios({
    params: {
      client_id: API_KEY,
      orientation: 'squarish',
      per_page: PER_PAGE,
      page,
      query,
    },
  });

  return response.data;
}
