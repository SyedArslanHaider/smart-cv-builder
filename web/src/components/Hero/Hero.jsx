import React from 'react';
import styles from './Hero.module.css';
import Rotating3DCV from '../Rotating3DCV/Rotating3DCV';
import { Link } from 'react-router';

const Hero = () => {
return (
<section className={styles.hero}>
<div className={styles.container}>
    <div className={styles.left}>
    <Rotating3DCV />
    </div>

    <div className={styles.right}>
    <h1 className={styles.title}>
        Your <span className={styles.highlight}>Journey</span> deserves a
        resume that Reflects it.
    </h1>
    <p className={styles.subtitle}>
        Land your first tech job with a CV that turns your journey into your
        superpower.
    </p>
    <div className={styles.buttonRow}>
        <Link to="/form">
        <button className={styles.primaryBtn}>Create My Resume</button>
        </Link>

        <button className={styles.secondaryBtn}>View GitHub Doc</button>
    </div>
    </div>
</div>
</section>
);
};

export default Hero;
