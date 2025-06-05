import React from 'react';
import styles from './LeftPane.module.css';

const steps = [
  'PERSONAL INFO',
  'PROFESSIONAL SUMMARY',
  'EXPERIENCE',
  'EDUCATION',
  'PROJECTS',
  'PROFILE VS JOB CRITERIA',
];

const LeftPane = ({ currentStep }) => {
  return (
    <div className={styles.leftpane}>
      <ul className={styles['step-list']}>
        {steps.map((step) => (
          <li
            key={step}
            className={`${styles['step-item']} ${currentStep === step ? styles['active'] : ''}`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPane;
