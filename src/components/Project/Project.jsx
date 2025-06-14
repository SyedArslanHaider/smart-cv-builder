import { useState, useEffect } from 'react';
import styles from '../Project/Project.module.css';
import CharacterCount from '../CharacterCount/CharacterCount.jsx';
import isValidUrl from '../../utils/validation.js';

export const Project = ({ data, onProjectChange, onErrorChange }) => {
  const [project, setProject] = useState({
    name: data?.name || '',
    description: data?.description || '',
    deployedWebsite: data?.deployedWebsite || '',
    githubLink: data?.githubLink || '',
  });

  const [error, setError] = useState({});

  useEffect(() => {
    onProjectChange([project]);
  }, [project, onProjectChange]);

  const validateProject = () => {
    const newErrors = {};
    if (!project.name.trim()) newErrors.name = 'Project name is required';
    if (!project.description.trim())
      newErrors.description = 'Description is required';
    if (!project.deployedWebsite.trim()) {
      newErrors.deployedWebsite = 'Deployed site URL is required';
    } else if (!isValidUrl(project.deployedWebsite)) {
      newErrors.deployedWebsite =
        'Please enter a valid URL for the deployed site';
    }
    if (!project.githubLink.trim()) {
      newErrors.githubLink = 'GitHub link is required';
    } else if (!isValidUrl(project.githubLink)) {
      newErrors.githubLink = 'Please enter a valid GitHub URL';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'description') {
      setError((prev) => ({ ...prev, description: undefined }));
    }
    const updatedProject = {
      ...project,
      [name]: value,
    };

    setProject(updatedProject);
    onProjectChange(updatedProject);
  };

  const handleBlur = () => {
    const newErrors = validateProject();
    setError(newErrors);
    onErrorChange(Object.keys(newErrors).length > 0);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const charCount = (text = '') => {
    return text.length;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>PROJECTS</h1>
        <h2>Tell us about a project you’ve worked on.</h2>

        <label className={styles.label}>Project Name:</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          value={project.name}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="e.g. Portfolio Website, E-commerce App"
        />
        {error.name && <p className={styles.error}>{error.name}</p>}

        <label className={styles.label}>Description:</label>
        <textarea
          className={styles.input}
          name="description"
          value={project.description}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          rows={4}
          placeholder="e.g. A full-stack portfolio site with animations and contact form."
        />
        <CharacterCount length={charCount(project.description)} limit={150} />
        {error.description && (
          <p className={styles.error}>{error.description}</p>
        )}

        <div className={styles.projectLinks}>
          <div className={styles.projectField}>
            <label className={styles.label}>Deployed Website:</label>
            <input
              className={styles.input}
              type="url"
              name="deployedWebsite"
              value={project.deployedWebsite}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="https://yourproject.com"
            />
            {error.deployedWebsite && (
              <p className={styles.error}>{error.deployedWebsite}</p>
            )}
          </div>

          <div className={styles.projectField}>
            <label className={styles.label}>GitHub Link:</label>
            <input
              className={styles.input}
              type="url"
              name="githubLink"
              value={project.githubLink}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder="https://github.com/yourrepo"
            />
            {error.githubLink && (
              <p className={styles.error}>{error.githubLink}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Project;
