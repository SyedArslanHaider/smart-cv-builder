import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LeftPane.module.css';

const LeftPane = () => {
  const getActiveLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.leftpane}>
      <ul className={styles.navlist}>
        <li className={styles.navitem}>
          <NavLink to="/personal-info" className={getActiveLinkClass}>
            Personal Info
          </NavLink>
        </li>

        <li className={styles.navitem}>
          <NavLink to="/professional-summary" className={getActiveLinkClass}>
            Professional Summary
          </NavLink>
        </li>

        <li className={styles.navitem}>
          <NavLink to="/transferable-experience" className={getActiveLinkClass}>
            Transferable Experience
          </NavLink>
        </li>

        <li className={styles.navitem}>
          <NavLink to="/education" className={getActiveLinkClass}>
            Education
          </NavLink>
        </li>

        <li className={styles.navitem}>
          <NavLink to="/profile-vs-job" className={getActiveLinkClass}>
            Profile vs. Job Criteria
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default LeftPane;
