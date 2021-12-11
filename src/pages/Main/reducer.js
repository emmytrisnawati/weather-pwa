import { DATA_FETCHED, LOADING } from './constants';

const initialState = {
  dataWeather: [],
  dataWeatherDaily: [],
  isLoadingWeather: true,
  isLoadingWeatherDaily: true,
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading, data, key } = action;

  switch (type) {
    case DATA_FETCHED:
      return {
        ...state,
        [`data${key}`]: data,
        [`isLoading${key}`]: false
      };
    case LOADING:
      return {
        ...state,
        [`isLoading${key}`]: isLoading
      };
    default:
      return state;
  }
}
