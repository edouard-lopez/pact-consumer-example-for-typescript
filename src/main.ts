import axios from 'axios';

const defaultBaseUrl = 'http://your-api.example.com';

export const api = (baseUrl = defaultBaseUrl) => ({
  getHealth: () =>
    axios.get(`${baseUrl}/health`).then((response) => response.data.status),
  /* other endpoints here */
});
