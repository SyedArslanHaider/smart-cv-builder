import React from 'react';
import styles from '../SubmitButton/SubmitButton.module.css';

const SubmitButton = () => {
  return (
    <button className={styles['submit-button']}>
      Submit
    </button>
  );
};

export default SubmitButton;
