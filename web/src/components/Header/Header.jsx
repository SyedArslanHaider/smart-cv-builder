import React from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Smart Cv Pathfolio Logo" className={styles.logo} />
    </header>
  );
};

export default Header;
