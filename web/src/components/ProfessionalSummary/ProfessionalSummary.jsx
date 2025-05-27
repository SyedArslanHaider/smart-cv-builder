import React, { useState } from 'react';
import styles from './ProfessionalSummary.module.css';

const ProfessionalSummary = () => {
  const [summary, setSummary] = useState('');
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
    validateSummary();
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
        required
      />

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default ProfessionalSummary;
