import React from 'react';
import styles from './CharacterCount.module.css';

const CharacterCount = ({ length = 0, limit = 150 }) => {
  return (
    <p
      className={styles.charcounter}
      style={{
        color: length === 0 ? 'black' : length < limit ? 'red' : 'green',
      }}
    >
      {length} / {limit} characters
    </p>
  );
};

export default CharacterCount;
