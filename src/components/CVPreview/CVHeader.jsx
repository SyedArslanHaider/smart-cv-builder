import {
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import styles from './CVPreview.module.css';

const CVHeader = ({ fullName, contact, onEditClick }) => {
  return (
    <div className={styles['user-section']}>
      <div className={styles['header-edit-container']}>
        <h1 className={styles['cv-username']}>
          {fullName || 'Professional Profile'}
        </h1>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
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
                {' '}
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
                {' '}
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
                {' '}
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