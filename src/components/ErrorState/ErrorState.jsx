import React from 'react';
import styles from './ErrorState.module.css';

const ErrorState = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CV Generation Failed</h2>
      <div className={styles.icon}>!</div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default ErrorState;
