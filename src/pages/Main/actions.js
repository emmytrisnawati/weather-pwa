import { colors, getWeather, getWeatherDaily } from '../../utils/fetch';
import { DATA_FETCHED, LOADING } from './constants';

export function fetchColor() {
  return async dispatch => {
    dispatch(loadingAction(true));

    try {
      const data = await colors();
      dispatch(fetchedAction(data));
    } catch (err) {
      dispatch(loadingAction(false));
    }
  };
}

export function fetchWeather(city) {
  return async dispatch => {
    const key = 'Weather';
    dispatch(loadingAction(true, key));

    try {
      const data = await getWeather(city);
      dispatch(fetchedAction(data, key));
    } catch (err) {
      dispatch(fetchedAction([], key));
      dispatch(loadingAction(false, key));
    }
  };
}

export function fetchWeatherDaily(city) {
  return async dispatch => {
    const key = 'WeatherDaily';
    dispatch(loadingAction(true, key));

    try {
      const data = await getWeatherDaily(city);
      dispatch(fetchedAction(data, key));
    } catch (err) {
      dispatch(fetchedAction([], key));
      dispatch(loadingAction(false, key));
    }
  };
}

export function createDate(dt, type) {
  let day = new Date(dt * 1000);
  if(type === 'long') {
    let options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return day.toLocaleString('id-ID', options); // Friday, January 15, 2021
  } else {
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()];
    return weekday;
  }
}


function fetchedAction(data, key) {
  return { type: DATA_FETCHED, data, key };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
