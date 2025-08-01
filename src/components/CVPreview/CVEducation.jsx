import { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import styles from './CVEducation.module.css';

const CVEducation = ({ education = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState([...education]);

  const handleChange = (index, field, value) => {
    const newData = [...editData];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setEditData(newData);
  };

  const addEducation = () => {
    setEditData([
      ...editData,
      {
        program: '',
        institution: '',
        startDate: '',
        endDate: '',
        highlights: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const newData = [...editData];
    newData.splice(index, 1);
    setEditData(newData);
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData([...education]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.section}>
        <div className={styles['section-header-container']}>
          <h2 className={styles['section-header']}>Education</h2>
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
        
        {editData.map((edu, index) => (
          <div key={index} className={styles['edit-item']}>
            <div className={styles['form-group']}>
              <label>Program:</label>
              <input
                value={edu.program || ''}
                onChange={(e) => handleChange(index, 'program', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Institution:</label>
              <input
                value={edu.institution || ''}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Start Date:</label>
              <input
                value={edu.startDate || ''}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>End Date:</label>
              <input
                value={edu.endDate || ''}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Highlights:</label>
              <textarea
                value={edu.highlights || ''}
                onChange={(e) => handleChange(index, 'highlights', e.target.value)}
              />
            </div>
            <button 
              onClick={() => removeEducation(index)} 
              className={styles['remove-button']}
            >
              <FaMinus /> Remove
            </button>
          </div>
        ))}
        
        <button onClick={addEducation} className={styles['add-button']}>
          <FaPlus /> Add Education
        </button>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Education</h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
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
                  <span className={styles['education-date-separator']}> - </span>
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