import axios from 'axios';

const BASE_URL = (mode => {
  if (mode === 'production') {
    return `https://random-data-api.com/api`;
  }
  if (mode === 'staging') {
    return `https://random-data-api.com/api`;
  }
  return `https://random-data-api.com/api`;
})(process.env.MODE);

export default function fetch(url, method, param1, param2) {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then(res => resolve(res.data))
      .catch(err => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.'
        };

        if (!err.response) {
          reject(defaultError);
        } else if (!err.response.data) {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
}

export const colors = () => (
  fetch(`${BASE_URL}/color/random_color?size=3`, 'get')
);
