import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, disabled, children }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={styles.nextbutton}>
      {children}
    </button>
  );
};

export default Button;
