import React from 'react';
import styles from './Rotating3DCV.module.css';

const Rotating3DCV = () => {
return (
<div className={styles.scene}>
<div className={styles.resume3d}>
    <div className={`${styles.resumeFace} ${styles.resumeFront}`}>
    <div className={styles.resumeHeader}></div>

    <div className={styles.resumeContent}>
        <div className={`${styles.resumeLine} ${styles.sm}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={styles.mt6}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={styles.resumePhoto}></div>
    </div>
    </div>

    <div className={`${styles.resumeFace} ${styles.resumeBack}`}>
    <div className={`${styles.resumeContent} ${styles.pt4}`}>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.lg}`}></div>
        <div className={`${styles.resumeLine} ${styles.sm}`}></div>
        <div className={styles.mt6}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.md}`}></div>
        <div className={`${styles.resumeLine} ${styles.sm}`}></div>
        <div className={`${styles.resumeLine} ${styles.sm}`}></div>
    </div>
    </div>
</div>
</div>
);
};

export default Rotating3DCV;
