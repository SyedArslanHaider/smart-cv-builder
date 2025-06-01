import React from 'react';
import styles from './PreviousButton.module.css';

const PreviousButton = ({ handlePrevious, disabled }) => {
  return (
    <button
      onClick={handlePrevious}
      disabled={disabled}
      className={styles.previousbutton}
    >
      Previous
    </button>
  );
};

export default PreviousButton;
