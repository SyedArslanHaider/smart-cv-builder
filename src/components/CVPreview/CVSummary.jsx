import styles from './CVPreview.module.css';

const CVSummary = ({ professional_summary, onEditClick }) => {
  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Professional Summary</h2>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
        </button>
      </div>
      <hr className={styles.line} />
      <div className={styles['summary-content']}>
        {professional_summary.split('\n').map((paragraph, index) => (
          <p key={index} className={styles['summary-paragraph']}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CVSummary;