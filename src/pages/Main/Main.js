import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDate, fetchWeather, fetchWeatherDaily } from './actions';
import styles from './styles.scoped.css';

export default function Main() {
  const dispatch = useDispatch();
  const { dataWeather, dataWeatherDaily, isLoadingWeather, isLoadingWeatherDaily } = useSelector(s => s.main);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if (lat && long) {
      dispatch(fetchWeatherDaily(`lat=${lat}&lon=${long}`));
      dispatch(fetchWeather(`lat=${lat}&lon=${long}`));
    }
  }, [lat, long]);

  if (isLoadingWeather || isLoadingWeatherDaily) {
    return <p>Loading...</p>;
  }

  const renderDescWeather = (label, value) => (
    <article>
      <b>{label}</b>
      <p>{value.includes('undefined' || '') ? '-' : value}</p>
    </article>
  );
  const renderDays = (data) => (
    <article>
      <b>{createDate(data.dt)}</b>
      <img
        alt="weather status icon"
        src={imgUrl(data.weather[0].icon)}
      />
      <p>{data.temp.day}&#8451;</p>
    </article>
  );

  const imgUrl = url => `https://openweathermap.org/img/w/${url}.png`;

  return (
    <section className={styles.root}>
      <button aria-label="Add Location" />
      <div className={styles.grid}>
        <div className={styles.location}>
          <span>Your location</span>
          <h2>{dataWeather.name}</h2>
          <p>{createDate(dataWeather.dt, 'long')}</p>
        </div>
        <div className={styles.weather}>
          <section>
            <h1>{dataWeatherDaily.current.temp}&#8451;</h1>
            <img
              alt={dataWeatherDaily.current.weather[0].description}
              src={imgUrl(dataWeatherDaily.current.weather[0].icon)}
            />
            <span>{dataWeatherDaily.current.weather[0].description}</span>
          </section>
          <section>
            {renderDescWeather('Feels Like', `${dataWeather.main.feels_like}\u2103`)}
            {renderDescWeather('Wind', `${(dataWeather.wind.speed / 3.6).toFixed(2)} km/h`)}
            {renderDescWeather('Visibility', `${dataWeather.visibility / 1000} km`)}
            {renderDescWeather('Cloud Cover', `${dataWeather.clouds.all}%`)}
            {renderDescWeather('Humidity', `${dataWeather.main.humidity}%`)}
            {renderDescWeather('UV Index', `${dataWeatherDaily.current.uvi} of 10`)}
            {renderDescWeather('Pressure', `${dataWeather.main.pressure} hPa`)}
            {renderDescWeather('Rain Amount', `${dataWeatherDaily.current.rain?.['1h']} mm`)}
          </section>
        </div>
        <div className={styles.daily}>
          {dataWeatherDaily.daily.map(data => renderDays(data))}
        </div>
      </div>
    </section>
  );
}
