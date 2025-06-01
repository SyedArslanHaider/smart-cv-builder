import React, { useState } from 'react';
import styles from './TransferableExperience.module.css';

const TransferableExperience = ({ data, onExperienceChange }) => {
  const [experience, setExperience] = useState(data?.experience || '');
  const [error, setError] = useState('');

  const validateExperience = () => {
    if (!experience.trim()) {
      setError('Please provide your transferable experience.');
    } else if (experience.length < 200) {
      setError('Experience must be at least 200 characters long.');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    const newExperience = e.target.value;
    setExperience(newExperience);
  };

  const handleBlur = () => {
    const errorMessage = validateExperience(); 
    setError(errorMessage);

    if (!errorMessage) {
      onExperienceChange({ experience });
    }
  };

  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>TRANSFERABLE EXPERIENCE</h1>

      <label htmlFor="transferable-experience" className={styles.label}>
        What experiences have shaped your skill set?
      </label>
      <textarea
        id="transferable-experience"
        className={`${styles.textarea} ${error ? styles.errortextarea : ''}`}
        placeholder="As a delivery rider in Barcelona (Jan 2024 – Apr 2025), I managed timely deliveries across the city, enhancing my navigation, time management, and customer service skills. This role strengthened my adaptability, problem-solving abilities, and communication in fast-paced environments."
        value={experience}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />

      {experience.length >= 0 && (
        <p
          className={styles.charcounter}
          style={{
            color:
              experience.length === 0
                ? 'black'
                : experience.length < 200
                  ? 'red'
                  : 'green',
          }}
        >
          {experience.length} / 200 characters
        </p>
      )}

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default TransferableExperience;
