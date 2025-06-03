import React, { useState } from 'react';
import styles from './ProfileVsJob.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const ProfileVsJob = () => {
  const [jobcriteria, setJobCriteria] = useState('');
  const [error, setError] = useState('');

  const validateJobCriteria = () => {
    if (!jobcriteria.trim()) {
      setError('Please provide the profile vs job criteria.');
    } else if (jobcriteria.length < 200) {
      setError('The Criteria must be at least 200 characters long.');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    setJobCriteria(e.target.value);
  };

  const handleBlur = () => {
    validateJobCriteria();
  };

  const handleFocus = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}> PROFILE vs. JOB CRITERIA</h1>

      <label htmlFor="profile-vs-job" className={styles.label}>
        What Helps You Stand Out?
      </label>
      <textarea
        id="profile-vs-job"
        className={`${styles.textarea} ${error ? styles.errortextarea : ''}`}
        placeholder="Excellent teamwork, problem-solving, and adaptability. Proficient in React, Express, PostgreSQL, and Agile methodologies. Fluent in English and intermediate Spanish. Meet job criteria in full-stack development and collaborative project execution."
        value={jobcriteria}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        required
      />

      <CharacterCount text={jobcriteria} limit={200} />

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default ProfileVsJob;
