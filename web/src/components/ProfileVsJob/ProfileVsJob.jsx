import React, { useState } from 'react';
import styles from './ProfileVsJob.module.css';

const ProfileVsJob = ({ data, onJobCriteriaChange }) => {
  const [jobcriteria, setJobCriteria] = useState(data?.jobcriteria || '');
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
    const newJobCriteria = e.target.value;
    setJobCriteria(newJobCriteria);
  };

  const handleBlur = () => {
    const errorMessage = validateJobCriteria();
    setError(errorMessage);

    if (!errorMessage) {
      onJobCriteriaChange({ jobcriteria });
    }
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

      {jobcriteria.length >= 0 && (
        <p
          className={styles.charcounter}
          style={{
            color:
              jobcriteria.length === 0
                ? 'black'
                : jobcriteria.length < 200
                  ? 'red'
                  : 'green',
          }}
        >
          {jobcriteria.length} / 200 characters
        </p>
      )}

      {error && <p className={styles.errortext}>{error}</p>}
    </div>
  );
};

export default ProfileVsJob;
