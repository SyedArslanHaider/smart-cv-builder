import React from 'react';
import styles from './SubmitButton.module.css';

const SubmitButton = ({ handleSubmit, disabled }) => {
  return (
    <button
      onClick={handleSubmit}
      disabled={disabled}
      className={styles.submitbutton}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
