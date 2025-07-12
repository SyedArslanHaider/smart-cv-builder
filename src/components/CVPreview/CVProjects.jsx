import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './CVPreview.module.css';

const CVProjects = ({ projects, onEditClick }) => {
  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Projects</h2>
        <button 
          onClick={onEditClick} 
          className={styles['section-edit-button']}
        >
          Edit
        </button>
      </div>
      <hr className={styles.line} />
      <div className={styles['projects-list']}>
        {projects.map((project, index) => (
          <div key={index} className={styles['project-item']}>
            <h3 className={styles['project-name']}>
              {project.name || 'Project Name Not Specified'}
            </h3>
            {project.description && (
              <div className={styles['project-description']}>
                {project.description
                  .split('\n')
                  .map((paragraph, pIndex) => (
                    <p key={pIndex} className={styles['project-paragraph']}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            )}

            {project.technologiesUsed && project.technologiesUsed.length > 0 && (
              <div className={styles['technologies-container']}>
                <span className={styles['technologies-label']}>
                  Technologies:{' '}
                </span>
                <div className={styles['technologies-list']}>
                  {project.technologiesUsed.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={styles['technology-tag']}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className={styles['project-links-container']}>
              {project.deployedLink && (
                <a
                  href={
                    project.deployedLink.startsWith('http')
                      ? project.deployedLink
                      : `https://${project.deployedLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['project-link']}
                >
                  <FaExternalLinkAlt className={styles['icon-color']} />{' '}
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={
                    project.githubLink.startsWith('http')
                      ? project.githubLink
                      : `https://github.com/${project.githubLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['project-link']}
                >
                  <FaGithub className={styles['icon-color']} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVProjects;