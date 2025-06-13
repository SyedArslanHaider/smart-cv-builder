import { useState, useEffect } from 'react';
import styles from './Education.module.css';
import { formatToMonthYear, monthYearToYYYYMM } from '../../../utils/date';

export const Education = ({ data, onEducationChange }) => {
  const [education, setEducation] = useState({
    institution: data?.institution || '',
    program: data?.program || '',
    startDate: monthYearToYYYYMM(data?.startDate) || '',
    endDate: monthYearToYYYYMM(data?.endDate) || '',
  });

  const [error, setError] = useState({});

  useEffect(() => {
    setEducation({
      institution: data?.institution || '',
      program: data?.program || '',
      startDate: monthYearToYYYYMM(data?.startDate) || '',
      endDate: monthYearToYYYYMM(data?.endDate) || '',
    });
  }, [data]);

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

    const updatedEducation = {
      ...education,
      [name]: value,
    };

    setEducation(updatedEducation);

    const formattedEducation = {
      ...updatedEducation,
      startDate: formatToMonthYear(updatedEducation.startDate),
      endDate:
        updatedEducation.endDate.toLowerCase() === 'current'
          ? 'current'
          : formatToMonthYear(updatedEducation.endDate),
    };

    onEducationChange([formattedEducation]);
  };

  const handleBlur = () => {
    const newErrors = validateEducation();
    setError(newErrors);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>EDUCATION</h1>
        <h2>Tell us about your educational background.</h2>

        <label className={styles.label}>Institution:</label>
        <input
          className={styles.input}
          type="text"
          name="institution"
          value={education.institution}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="e.g.Full-stack Web Dev Bootcamp, React Specialization,  B.Sc. Computer Science"
        />

        {error.program && <p className={styles.error}>{error.program}</p>}

        <div className={styles.dateGroup}>
          <div className={styles.dateField}>
            <label className={styles.label}>
              Start Date:
              <span className={styles.hint}> (Format: MM-YYYY)</span>
            </label>
            <input
              className={styles.input}
              type="month"
              name="startDate"
              value={education.startDate}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />

            {error.startDate && (
              <p className={styles.error}>{error.startDate}</p>
            )}
          </div>

          <div className={styles.dateField}>
            <label className={styles.label}>
              End Date:
              <span className={styles.hint}> (Format: MM-YYYY)</span>
            </label>
            <input
              className={styles.input}
              type="month"
              name="endDate"
              value={education.endDate}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="e.g  August 2025"
            />
            {error.endDate && <p className={styles.error}>{error.endDate}</p>}
          </div>
        </div>
      </form>
    </div>
  );
};
export default Education;
