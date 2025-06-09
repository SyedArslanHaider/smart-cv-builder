import React from 'react';
import styles from '../LoadingPage/LoadingPage.module.css';

const LoadingPage = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
};

export default LoadingPage;