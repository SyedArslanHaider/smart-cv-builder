import { useState } from 'react';
import styles from '../Education/Education.module.css';

export const Education = () => {
  const [education, setEducation] = useState({
    institution: '',
    program: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState({});

  const validateEducation = () => {
    const newErrors = {};
    if (!education.institution.trim())
      newErrors.institution = 'Institution is required';
    if (!education.program.trim()) newErrors.program = 'Program is required';
    if (!education.startDate) newErrors.startDate = 'Start date is required';
    if (!education.endDate) newErrors.endDate = 'End date is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEducation((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validateError = validateEducation();
    setError(validateError);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>EDUCATION</h1>
        <p>Tell us about your educational background.</p>

        <label className={styles.label}>Institution:</label>
        <input
          className={styles.input}
          type="text"
          name="institution"
          value={education.institution}
          onChange={handleChange}
          placeholder="e.g. Self-taught via Udemy, CodeAcademy Bootcamp, freeCodeCamp University of Lagos, Harvard"
        />
        {error.institution && (
          <p className={styles.error}>{error.institution}</p>
        )}

        <label className={styles.label}>Program:</label>
        <input
          className={styles.input}
          type="text"
          name="program"
          value={education.program}
          onChange={handleChange}
          placeholder="e.g.Full-stack Web Dev Bootcamp, React Specialization,  B.Sc. Computer Science"
        />
        {error.program && <p className={styles.error}>{error.program}</p>}

        <div className={styles.dateGroup}>
          <div className={styles.dateField}>
            <label className={styles.label}>Start Date:</label>
            <input
              className={styles.input}
              type="month"
              name="startDate"
              value={education.startDate}
              onChange={handleChange}
            />
            {error.startDate && (
              <p className={styles.error}>{error.startDate}</p>
            )}
          </div>

          <div className={styles.dateField}>
            <label className={styles.label}>End Date:</label>
            <input
              className={styles.input}
              type="month"
              name="endDate"
              value={education.endDate}
              onChange={handleChange}
            />
            {error.endDate && <p className={styles.error}>{error.endDate}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};
