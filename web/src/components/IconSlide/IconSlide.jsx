import React from 'react';
import {
  FaUser,
  FaFileAlt,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaCheckCircle,
} from 'react-icons/fa';
import styles from './IconSlide.module.css';

const IconSlide = ({ currentStep }) => {
  const sections = [
    { label: 'Personal Info', icon: <FaUser /> },
    { label: 'Professional Summary', icon: <FaFileAlt /> },
    { label: 'Experience', icon: <FaBriefcase /> },
    { label: 'Education', icon: <FaGraduationCap /> },
    { label: 'Project', icon: <FaTools /> },
    { label: 'Profile vs Job Criteria', icon: <FaCheckCircle /> },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.iconlinecontainer}>
        <div className={styles.line} />
        {sections.map((section, index) => (
          <div
            key={index}
            title={section.label}
            className={`${styles.iconwrapper} ${
              currentStep === index ? styles.iconwrapperactive : ''
            }`}
          >
            <div
              className={`${styles.icon} ${
                currentStep === index ? styles.iconactive : ''
              }`}
            >
              {section.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSlide;
