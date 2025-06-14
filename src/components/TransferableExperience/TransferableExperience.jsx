import React, { useState } from 'react';
import styles from './TransferableExperience.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const TransferableExperience = ({
  data,
  onExperienceChange,
  onErrorChange,
}) => {
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
    setExperience(e.target.value);
  };

  const handleBlur = () => {
    const errorMessage = validateExperience();
    setError(errorMessage);
    onErrorChange(!!errorMessage);

    if (!errorMessage) {
      onExperienceChange({ experience });
    }

    validateExperience();
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
        Which key experiences and accomplishments have significantly contributed
        to your professional skill set?
      </label>
      <textarea
        id="transferable-experience"
        className={`${styles.textarea} ${error ? styles.errortextarea : ''}`}
        placeholder="During my role as a delivery rider in Barcelona (Jan 2024 – Apr 2025), I developed strong time management, navigation, and customer service skills while operating in a high-pressure environment. I was consistently recognized for maintaining a 95% on-time delivery rate and received excellent customer feedback, demonstrating my reliability, adaptability, and effective communication."
        value={experience}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />

      <CharacterCount length={experience.length} limit={200} />

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default TransferableExperience;
