import React from 'react';
import styles from './NextButton.module.css';

const NextButton = ({ handleNext, disabled }) => {
  return (
    <button
      onClick={handleNext}
      disabled={disabled}
      className={styles.nextbutton}
    >
      Next
    </button>
  );
};

export default NextButton;
