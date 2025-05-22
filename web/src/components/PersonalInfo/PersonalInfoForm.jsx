import React, { useState } from 'react';
import { useSubmitPersonalInfo } from '../../hooks/useSubmitPersonalInfo.js';
import styles from './PersonalInfo.module.css';

const PersonalInfoForm = () => {
  const [personalData, setPersonalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });

  const { submitPersonalInfo, loading, error, successMessage } =
    useSubmitPersonalInfo();

  const handleChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPersonalInfo(personalData);

    setPersonalData({
      fullName: '',
      email: '',
      phone: '',
      github: '',
      linkedin: '',
      portfolio: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="fullName">FullName:</label>
      <input
        id="fullName"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={personalData.fullName}
        onChange={handleChange}
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
        className={styles.input}
        required
      />

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Submiting...' : 'Submit'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default PersonalInfoForm;
