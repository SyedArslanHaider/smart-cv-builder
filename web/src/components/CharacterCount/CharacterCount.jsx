import React from 'react';
import styles from './CharacterCount.module.css';

const CharacterCount = ({ text = '', limit = 150 }) => {
  return (
    <p
      className={styles.charcounter}
      style={{
        color:
          text.length === 0 ? 'black' : text.length < limit ? 'red' : 'green',
      }}
    >
      {text.length} / {limit} characters
    </p>
  );
};

export default CharacterCount;
