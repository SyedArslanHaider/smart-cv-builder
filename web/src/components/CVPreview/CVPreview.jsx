// web/src/components/CVPreview.jsx
import React, { forwardRef } from 'react';
import styles from './CVPreview.module.css';

const CVPreview = forwardRef(({ data }, ref) => {
  if (!data) return <p>No data to display</p>;  
  return (
    <div ref={ref} className={styles.preview}>
      <h1>{data.fullName}</h1>
      <p className={styles.contact}>
        {data.contact.email} | {data.contact.phone}
      </p>
      <p className={styles.contact}>{data.contact.linkedin}</p>
      <p className={styles.contact}>{data.contact.github}</p>
      <p className={styles.contact}>{data.contact.portfolio}</p>

      <div className={styles.section}>
        <h2>Summary</h2>
        <p>{data.professional_summary}</p>
      </div>

      <div className={styles.section}>
        <h2>Experience</h2>
        <ul>
          {data.experience.map((exp, i) => (
            <li key={i}>{exp}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Projects</h2>
        <ul>
          {data.projects.map((proj, i) => (
            <li key={i}>{proj}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Education</h2>
        <ul>
          {data.education.map((edu, i) => (
            <li key={i}>{edu}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Profile vs Job</h2>
        <p>{data.yourProfile_vs_jobCriteria}</p>
      </div>
    </div>
  );
});

export default CVPreview;
