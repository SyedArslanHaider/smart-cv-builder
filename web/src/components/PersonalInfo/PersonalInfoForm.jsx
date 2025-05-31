import React, { useState } from 'react';
import styles from './PersonalInfo.module.css';

const PersonalInfoForm = ({ onSubmit, loading, error, successMessage }) => {
  const [personalData, setPersonalData] = useState({
    fullName: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    setPersonalData({
      ...personalData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(personalData); // Submit to parent handler
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
      <h2>Personal Information</h2>

      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={personalData.fullName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={personalData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={personalData.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        GitHub:
        <input
          type="url"
          name="github"
          value={personalData.github}
          onChange={handleChange}
        />
      </label>

      <label>
        LinkedIn:
        <input
          type="url"
          name="linkedin"
          value={personalData.linkedin}
          onChange={handleChange}
        />
      </label>

      <label>
        Portfolio:
        <input
          type="url"
          name="portfolio"
          value={personalData.portfolio}
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {/* Messages */}
      {error && <p className={styles.error}>❌ {error}</p>}
      {successMessage && <p className={styles.success}>✅ {successMessage}</p>}
    </form>
  );
};

export default PersonalInfoForm;
