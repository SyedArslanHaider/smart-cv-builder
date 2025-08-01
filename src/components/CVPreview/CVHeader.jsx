import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaExternalLinkAlt,
  FaEdit,
  FaSave,
  FaTimes
} from 'react-icons/fa';
import styles from './CVHeader.module.css';
import { useState } from 'react';

const CVHeader = ({ fullName, contact, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: fullName || '',
    contact: { ...contact }
  });

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave({
      fullName: editData.fullName,
      contact: editData.contact
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      fullName: fullName || '',
      contact: { ...contact }
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles['user-section']}>
        <div className={styles['edit-form']}>
          <div className={styles['form-group']}>
            <label>Full Name:</label>
            <input
              type="text"
              value={editData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div className={styles['contact-section']}>
            <h3>Contact Information</h3>
            {['email', 'phone', 'linkedin', 'github', 'portfolio'].map(
              (field) => (
                <div key={field} className={styles['form-group']}>
                  <label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type="text"
                    value={editData.contact[field] || ''}
                    onChange={(e) => handleContactChange(field, e.target.value)}
                  />
                </div>
              )
            )}
          </div>

          <div className={styles['button-group']}>
            <button onClick={handleSave} className={styles['save-button']}>
              <FaSave /> Save
            </button>
            <button onClick={handleCancel} className={styles['cancel-button']}>
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['user-section']}>
      <div className={styles['header-edit-container']}>
        <h1 className={styles['cv-username']}>
          {fullName || 'Professional Profile'}
        </h1>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
        </button>
      </div>
      <div className={styles['personal-details']}>
        <div className={styles['email-and-phone-box']}>
          {contact.email && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>
                <FaEnvelope className={styles['icon-color']} />{' '}
              </span>
              {contact.email}
            </p>
          )}

          {contact.phone && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>
                <FaPhone className={styles['icon-color']} />{' '}
              </span>
              +34 {contact.phone}
            </p>
          )}
        </div>

        <div className={styles['github-portfolio-linkedin-box']}>
          {contact.linkedin && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>
                <FaLinkedin className={styles['icon-color']} />{' '}
              </span>
              <a
                href={
                  contact.linkedin.startsWith('http')
                    ? contact.linkedin
                    : `https://${contact.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                LinkedIn
              </a>
            </p>
          )}

          {contact.github && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>
                <FaGithub className={styles['icon-color']} />{' '}
              </span>
              <a
                href={
                  contact.github.startsWith('http')
                    ? contact.github
                    : `https://github.com/${contact.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                GitHub
              </a>
            </p>
          )}

          {contact.portfolio && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>
                <FaExternalLinkAlt className={styles['icon-color']} />{' '}
              </span>
              <a
                href={
                  contact.portfolio.startsWith('http')
                    ? contact.portfolio
                    : `https://${contact.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                Portfolio
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVHeader;