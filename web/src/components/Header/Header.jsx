import React from 'react';
import styles from '../Header/Header.module.css';
import Logo from '/home/l0086/Desktop/smart-cv-builder/web/src/assets/Logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Smart Cv Pathfolio Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
