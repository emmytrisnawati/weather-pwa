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

  return (
    <main className={styles.root}>
      <h1>Color palette</h1>
      <section>
        {data.map((item, idx) => (
          <div className={styles.color} key={idx} style={{ backgroundColor: item.hex_value || '#000' }}>
            <p>{item.color_name}</p>
            <small>{item.hex_value}</small>
          </div>
        ))}
      </section>
    </main>
  );
}
