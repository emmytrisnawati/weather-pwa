import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColor } from './actions';
import styles from './styles.scoped.css';

export default function Main() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(s => s.main);

  useEffect(() => {
    dispatch(fetchColor());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const renderDescWeather = () => (
    <div>
      <p>Feels Like</p>
      <span>29 C</span>
    </div>
  );
  const renderDays = () => (
    <div>
      <p>Sun</p>
      <span>Icon</span>
      <p>26 C</p>
    </div>
  );

  return (
    <main className={styles.root}>
      <section className={styles.main} style={{ background: 'linear-gradient(#436FB6, #FFCE06' }}>
        <button className={styles.buttonAdd}>Add Location</button>
        <div className={styles.grid}>
          <div className={styles.location}>
            <span>Your location</span>
            <h2>Jakarta</h2>
            <p>Sunday, 12 December 2021</p>
          </div>
          <div className={styles.weather}>
            <h1>26 C</h1>
            <span>icon Partly Cloudy</span>
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
            {renderDays()}
            {renderDays()}
            {renderDays()}
            {renderDays()}
            {renderDays()}
            {renderDays()}
            {renderDays()}
          </div>
        </div>
      </section>
    </main>
  );
}
