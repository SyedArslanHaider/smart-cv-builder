import React, { useState } from 'react';
import styles from './PersonalInfo.module.css';

const PersonalInfoForm = ({ data, onPersonalInfoChange }) => {
  const [personalData, setPersonalData] = useState({
    fullName: data?.fullName || '',
    email: data?.email || '',
    phone: data?.phone || '',
    github: data?.github || '',
    linkedin: data?.linkedin || '',
    portfolio: data?.portfolio || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const updatedData = { ...personalData, [e.target.name]: e.target.value };
    setPersonalData(updatedData);
  };

  const validateInputs = () => {
    if (
      !personalData.fullName.trim() ||
      !personalData.email.trim() ||
      !personalData.phone.trim() ||
      !personalData.github.trim() ||
      !personalData.linkedin.trim() ||
      !personalData.portfolio.trim()
    ) {
      return 'All fields are required.';
    }
    return '';
  };
  const handleBlur = () => {
    const validationError = validateInputs();
    setError(validationError);

    if (!validationError) {
      onPersonalInfoChange(personalData);
    }
  };

  return (
    <form className={styles.form}>
      <h2>PERSONAL INFORMATION</h2>

      <label htmlFor="fullName">FullName:</label>
      <input
        id="fullName"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={personalData.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={personalData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="tel"
        name="phone"
        placeholder="Phone"
        value={personalData.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      <label htmlFor="github">GitHub:</label>
      <input
        id="github"
        type="url"
        name="github"
        placeholder="GitHub URL"
        value={personalData.github}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        type="url"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={personalData.linkedin}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      <label htmlFor="portfolio">Portfolio:</label>
      <input
        id="portfolio"
        type="url"
        name="portfolio"
        placeholder="Portfolio URL"
        value={personalData.portfolio}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
        required
      />

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default PersonalInfoForm;