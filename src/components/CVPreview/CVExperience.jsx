import { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import styles from './CVExperience.module.css';

const CVExperience = ({ experience = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState([...experience]);

  const handleChange = (index, field, value) => {
    const newData = [...editData];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setEditData(newData);
  };

  const handleBulletPointChange = (expIndex, bulletIndex, value) => {
    const newData = [...editData];
    const newBulletPoints = [...newData[expIndex].bulletPoints];
    newBulletPoints[bulletIndex] = value;
    newData[expIndex] = {
      ...newData[expIndex],
      bulletPoints: newBulletPoints
    };
    setEditData(newData);
  };

  const addExperience = () => {
    setEditData([
      ...editData,
      {
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        bulletPoints: ['']
      }
    ]);
  };

  const addBulletPoint = (expIndex) => {
    const newData = [...editData];
    newData[expIndex] = {
      ...newData[expIndex],
      bulletPoints: [...newData[expIndex].bulletPoints, '']
    };
    setEditData(newData);
  };

  const removeExperience = (index) => {
    const newData = [...editData];
    newData.splice(index, 1);
    setEditData(newData);
  };

  const removeBulletPoint = (expIndex, bulletIndex) => {
    const newData = [...editData];
    const newBulletPoints = [...newData[expIndex].bulletPoints];
    newBulletPoints.splice(bulletIndex, 1);
    newData[expIndex] = {
      ...newData[expIndex],
      bulletPoints: newBulletPoints
    };
    setEditData(newData);
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData([...experience]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.section}>
        <div className={styles['section-header-container']}>
          <h2 className={styles['section-header']}>Professional Experience</h2>
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
        
        {editData.map((exp, expIndex) => (
          <div key={expIndex} className={styles['edit-item']}>
            <div className={styles['form-group']}>
              <label>Company:</label>
              <input
                value={exp.companyName || ''}
                onChange={(e) => handleChange(expIndex, 'companyName', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Position:</label>
              <input
                value={exp.jobTitle || ''}
                onChange={(e) => handleChange(expIndex, 'jobTitle', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Start Date:</label>
              <input
                value={exp.startDate || ''}
                onChange={(e) => handleChange(expIndex, 'startDate', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>End Date:</label>
              <input
                value={exp.endDate || ''}
                onChange={(e) => handleChange(expIndex, 'endDate', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Bullet Points:</label>
              {exp.bulletPoints?.map((point, bulletIndex) => (
                <div key={bulletIndex} className={styles['bullet-point-group']}>
                  <textarea
                    value={point}
                    onChange={(e) => 
                      handleBulletPointChange(expIndex, bulletIndex, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeBulletPoint(expIndex, bulletIndex)}
                    className={styles['remove-button']}
                  >
                    <FaMinus /> Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => addBulletPoint(expIndex)}
                className={styles['add-button']}
              >
                <FaPlus /> Add Bullet Point
              </button>
            </div>
            <button
              onClick={() => removeExperience(expIndex)}
              className={styles['remove-button']}
            >
              <FaMinus /> Remove Experience
            </button>
          </div>
        ))}
        
        <button onClick={addExperience} className={styles['add-button']}>
          <FaPlus /> Add Experience
        </button>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Professional Experience</h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
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