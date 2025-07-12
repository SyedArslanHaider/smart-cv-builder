import styles from './CVPreview.module.css';

const CVEducation = ({ education, onEditClick }) => {
  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Education</h2>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
        </button>
      </div>
      <hr className={styles.line} />
      <div className={styles['education-list']}>
        {education.map((edu, index) => (
          <div key={index} className={styles['education-item']}>
            <h3 className={styles['degree-info']}>
              {edu.program || 'Program Not Specified'}
            </h3>
            <div className={styles['institution-info']}>
              {edu.institution || 'Institution Not Specified'}
            </div>
            <div className={styles['education-duration']}>
              {edu.startDate && (
                <span className={styles['education-date']}>
                  {edu.startDate}
                </span>
              )}
              {edu.endDate && (
                <>
                  <span className={styles['education-date-separator']}>
                    {' '}
                    -{' '}
                  </span>
                  <span className={styles['education-date']}>
                    {edu.endDate}
                  </span>
                </>
              )}
            </div>
            {edu.highlights && (
              <div className={styles['education-highlights']}>
                {edu.highlights.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className={styles['education-paragraph']}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVEducation;