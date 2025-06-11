import React from 'react';
import styles from './LoadingState.module.css';

const LoadingState = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};
export default LoadingState;
