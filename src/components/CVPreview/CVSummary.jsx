import { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import styles from './CVSummary.module.css';

const CVSummary = ({ professional_summary = '', onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(professional_summary);

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(professional_summary);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.section}>
        <div className={styles['section-header-container']}>
          <h2 className={styles['section-header']}>Professional Summary</h2>
          <div className={styles['button-group']}>
            <button onClick={handleSave} className={styles['save-button']}>
              <FaSave /> Save
            </button>
            <button onClick={handleCancel} className={styles['cancel-button']}>
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles['edit-form']}>
          <textarea
            value={editData}
            onChange={(e) => setEditData(e.target.value)}
            className={styles['edit-textarea']}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Professional Summary</h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
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