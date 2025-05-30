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

const LeftPane = () => {
  return (
    <div className="leftpane">
      <ul className="step-list">
        {steps.map((step) => (
          <li key={step} className={styles['step-item']}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPane;
