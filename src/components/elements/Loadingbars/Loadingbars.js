import React from 'react';
import styles from './styles.scoped.css';

export default function LoadingBars() {
  return (
    <div className={styles.root}>
      <div className={styles[`lds-ring`]}><div></div><div></div><div></div><div></div></div>
    </div>
  );
}
