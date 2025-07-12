import styles from './CVPreview.module.css';

const CVExperience = ({ experience, onEditClick }) => {
  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Professional Experience</h2>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
        </button>
      </div>
      <hr className={styles.line} />
      {experience && experience.length > 0 ? (
        experience.map((exp, index) => (
          <div key={index} className={styles['experience-item']}>
            <div className={styles['experience-header']}>
              <div>
                <h3 className={styles['job-title']}>{exp.jobTitle}</h3>
                <div className={styles['company-info']}>
                  <div>
                    <span className={styles['company-name']}>
                      {exp.companyName}
                    </span>
                  </div>
                  <div>
                    {(exp.startDate || exp.endDate) && (
                      <span className={styles['job-duration']}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
              <ul className={styles['responsibilities-list']}>
                {exp.bulletPoints.map((point, i) => (
                  <li key={i} className={styles['responsibility-item']}>
                    {point}
                  </li>
                ))}
              </ul>
            ) : exp.description ? (
              <div className={styles['job-description']}>
                {exp.description.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className={styles['job-paragraph']}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p className={styles['no-data']}>No experience data available</p>
      )}
    </div>
  );
};

export default CVExperience;