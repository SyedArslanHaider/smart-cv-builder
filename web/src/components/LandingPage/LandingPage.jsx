    import React from 'react';
    import styles from './LandingPage.module.css';
    import Header from '../../components/Header/Header.jsx';
    import Hero from '../../components/Hero/Hero.jsx';
    const LandingPage = () => {
    return (
        <div className={styles.landingContainer}>
        <Header />
        <Hero/>
        </div>
    );
    };
    export default LandingPage;