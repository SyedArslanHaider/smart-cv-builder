import styles from './CVPreview.module.css';

const CVSkills = ({ skills, isSoftSkill, onEditClick }) => {
  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Skills</h2>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
        </button>
      </div>
      <hr className={styles.line} />
      <div className={styles['skills-container']}>
        <div className={styles['skills-column']}>
          <h3 className={styles['skills-subheader']}>Technical Skills</h3>
          <div className={styles['skills-list']}>
            {skills
              .filter((skill) => !isSoftSkill(skill))
              .map((skill, index) => (
                <span
                  key={`technical-${index}`}
                  className={styles['skill-item']}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
        <div className={styles['skills-column']}>
          <h3 className={styles['skills-subheader']}>Soft Skills</h3>
          <div className={styles['skills-list']}>
            {skills.filter(isSoftSkill).map((skill, index) => (
              <span key={`soft-${index}`} className={styles['skill-item']}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSkills;