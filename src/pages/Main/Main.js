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
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if(lat && long) {
      dispatch(fetchWeatherDaily(`lat=${lat}&lon=${long}`));
      dispatch(fetchWeather(`lat=${lat}&lon=${long}`));
    }
  }, [lat, long]);

  useEffect(() => {
    // dispatch(fetchWeatherCity(`lat=${lat}&lon=${long}`));
  }, []);

  if (isLoadingWeather || isLoadingWeatherDaily) {
    return <p>Loading...</p>;
  }

  const renderDescWeather = () => (
    <div>
      <p>Feels Like</p>
      <span>29 C</span>
    </div>
  );
  const renderDays = (data) => (
    <div>
      <p>{createDate(data.dt)}</p>
      <img
        alt="weather status icon"
        src={imgUrl(data.weather[0].icon)}
      />
      <p>{data.temp.day} C</p>
    </div>
  );

  const imgUrl = url => `http://openweathermap.org/img/w/${url}.png`;
  return (
    <main className={styles.root}>
      <section className={styles.main} style={{ background: 'linear-gradient(#436FB6, #FFCE06' }}>
        <button className={styles.buttonAdd}>Add Location</button>
        <div className={styles.grid}>
          <div className={styles.location}>
            <span>Your location</span>
            <h2>{dataWeather.name}</h2>
            <p>{createDate(dataWeather.dt, 'long')}</p>
          </div>
          <div className={styles.weather}>
            <h1>{dataWeatherDaily.current.temp} C</h1>
            <img
              alt="weather status icon"
              src={imgUrl(dataWeatherDaily.current.weather[0].icon)}
            />
            <span>{dataWeatherDaily.current.weather[0].description}</span>
          </div>
          <div className={styles.desc}>
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
            {renderDescWeather()}
          </div>
          <div className={styles.days}>
            {dataWeatherDaily.daily.map(data => {
              return renderDays(data);
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
