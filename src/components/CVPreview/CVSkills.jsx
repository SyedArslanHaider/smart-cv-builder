import { useState } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import styles from './CVSkills.module.css';

const CVSkills = ({ skills = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(skills.join(', '));

  const isSoftSkill = (skill) => {
    const skillStr = typeof skill === 'string' ? skill.toLowerCase() : '';
    const softSkills = [
      'communication',
      'teamwork',
      'leadership',
      'problem-solving',
      'adaptability',
      'creativity',
      'time management',
      'collaboration',
      'interpersonal',
      'negotiation',
      'critical thinking',
      'emotional intelligence',
      'team player',
      'active listening',
      'conflict resolution',
      'presentation',
      'mentoring',
      'coaching',
      'decision making',
      'strategic thinking',
    ];
    return softSkills.some((softSkill) =>
      skillStr.includes(softSkill.toLowerCase())
    );
  };

  const handleSave = () => {
    const newSkills = editData
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill);
    onSave(newSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(skills.join(', '));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.section}>
        <div className={styles['section-header-container']}>
          <h2 className={styles['section-header']}>Skills</h2>
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
          <div className={styles['form-group']}>
            <label>Skills (comma separated):</label>
            <textarea
              value={editData}
              onChange={(e) => setEditData(e.target.value)}
              placeholder="e.g. JavaScript, React, Teamwork, Communication"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Skills</h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
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