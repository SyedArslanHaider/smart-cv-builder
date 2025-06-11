import React, { useState } from 'react';
import styles from './ProfessionalSummary.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const ProfessionalSummary = ({ data, onSummaryChange }) => {
  const [summary, setSummary] = useState(data?.summary || '');
  const [error, setError] = useState('');

  const validateSummary = () => {
    if (!summary.trim()) {
      setError('Please provide a professional summary.');
    } else if (summary.length < 150) {
      setError('Summary must be at least 150 characters long.');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    setSummary(e.target.value);
  };

  const handleBlur = () => {
    const errorMessage = validateSummary();
    setError(errorMessage);

    if (!errorMessage) {
      onSummaryChange({ summary });
    }
    validateSummary();
  };
  
  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROFESSIONAL SUMMARY</h1>

      <label htmlFor="professional-summary" className={styles.label}>
        Tell us about your journey in tech?
      </label>
      <textarea
        id="professional-summary"
        className={`${styles.textarea} ${error ? styles.errortextarea : ''}`}
        placeholder="I am passionate about tech, focusing on building solutions with React and Express. Looking for a role to continue learning, developing impactful applications, and growing as a full-stack developer."
        value={summary}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />

      <CharacterCount length={summary.length} limit={150} />

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default ProfessionalSummary;
