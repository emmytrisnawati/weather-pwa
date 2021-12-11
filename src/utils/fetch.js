import axios from 'axios';

const BASE_URL = (mode => {
  if (mode === 'production') {
    return `https://api.openweathermap.org/data/2.5`;
  }
  if (mode === 'staging') {
    return `https://api.openweathermap.org/data/2.5`;
  }
  return `https://api.openweathermap.org/data/2.5`;
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
  fetch(`${BASE_URL}/color/random_color?size=2`, 'get')
);

export const getWeather = query => (
  fetch(`${BASE_URL}/weather?${query}&units=metric&appid=480ebd54ded76ae8d0f744b0669ff502`, 'get')
);

export const getWeatherDaily = query => (
  fetch(`${BASE_URL}/onecall?${query}&units=metric&appid=480ebd54ded76ae8d0f744b0669ff502`, 'get')
);
