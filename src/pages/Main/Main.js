import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColor } from './actions';
import styles from './styles.scoped.css';

export default function Main() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(s => s.main);

  useEffect(() => {
    dispatch(fetchColor());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderDescWeather = (label, value) => (
    <article>
      <b>{label}</b>
      <p>{value}</p>
    </article>
  );

  const renderDays = (label, value) => (
    <article>
      <b>{label}</b>
      <img alt="icon" />
      <p>{value}</p>
    </article>
  );

  return (
    <section className={styles.root}>
      <button aria-label="Add Location" />
      <div className={styles.location}>
        <span>Your location</span>
        <h2>Jakarta</h2>
        <p>Sunday, 12 December 2021</p>
      </div>
      <div className={styles.weather}>
        <section>
          <h1>26&#8451;</h1>
          <span>icon Partly Cloudy</span>
        </section>
        <section>
          {renderDescWeather('Feels Like', '29\u2103')}
          {renderDescWeather('Wind', '6 km/h')}
          {renderDescWeather('Visibility', '5 km')}
          {renderDescWeather('Cloud Cover', '40%')}
          {renderDescWeather('Humidity', '92%')}
          {renderDescWeather('UV Index', '0 of 10')}
          {renderDescWeather('Pressure', '1019 hPa')}
          {renderDescWeather('Rain Amount', '4.28 mm')}
        </section>
      </div>
      <div className={styles.daily}>
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
        {renderDays('Sun', '29\u2103')}
      </div>
    </section>
  );
}
