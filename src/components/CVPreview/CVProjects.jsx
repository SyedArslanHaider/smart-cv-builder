import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaEdit, FaSave, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import styles from './CVProjects.module.css';

const CVProjects = ({ projects = [], onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState([...projects]);

  const handleChange = (index, field, value) => {
    const newData = [...editData];
    newData[index] = {
      ...newData[index],
      [field]: value
    };
    setEditData(newData);
  };

  const handleTechChange = (index, value) => {
    const newData = [...editData];
    newData[index] = {
      ...newData[index],
      technologiesUsed: value.split(',').map(tech => tech.trim())
    };
    setEditData(newData);
  };

  const addProject = () => {
    setEditData([
      ...editData,
      {
        name: '',
        description: '',
        deployedLink: '',
        githubLink: '',
        technologiesUsed: []
      }
    ]);
  };

  const removeProject = (index) => {
    const newData = [...editData];
    newData.splice(index, 1);
    setEditData(newData);
  };

  const handleSave = () => {
    onSave(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData([...projects]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={styles.section}>
        <div className={styles['section-header-container']}>
          <h2 className={styles['section-header']}>Projects</h2>
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
        
        {editData.map((project, index) => (
          <div key={index} className={styles['edit-item']}>
            <div className={styles['form-group']}>
              <label>Project Name:</label>
              <input
                value={project.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Description:</label>
              <textarea
                value={project.description || ''}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Deployed Website:</label>
              <input
                value={project.deployedLink || ''}
                onChange={(e) => handleChange(index, 'deployedLink', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>GitHub Link:</label>
              <input
                value={project.githubLink || ''}
                onChange={(e) => handleChange(index, 'githubLink', e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <label>Technologies Used (comma separated):</label>
              <input
                value={project.technologiesUsed?.join(', ') || ''}
                onChange={(e) => handleTechChange(index, e.target.value)}
              />
            </div>
            <button
              onClick={() => removeProject(index)}
              className={styles['remove-button']}
            >
              <FaMinus /> Remove Project
            </button>
          </div>
        ))}
        
        <button onClick={addProject} className={styles['add-button']}>
          <FaPlus /> Add Project
        </button>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles['section-header-container']}>
        <h2 className={styles['section-header']}>Projects</h2>
        <button 
          onClick={() => setIsEditing(true)} 
          className={styles['edit-button']}
        >
          <FaEdit /> Edit
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