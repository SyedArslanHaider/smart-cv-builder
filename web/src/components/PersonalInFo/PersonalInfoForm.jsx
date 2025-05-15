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
      <label>
        FullName:
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={personalData.fullName}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={personalData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={personalData.phone}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label>
        GitHub:
        <input
          type="url"
          name="github"
          placeholder="GitHub URL"
          value={personalData.github}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label>
        LinkedIn:
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={personalData.linkedin}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <label>
        Portfolio:
        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio URL"
          value={personalData.portfolio}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </label>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Saving...' : 'Save'}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};

export default PersonalInfoForm;
