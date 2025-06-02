import { useState } from 'react';
import styles from '../Project/Project.module.css';

const Project = ({ data, onProjectChange }) => {
  const [project, setProject] = useState({
    name: data?.name || '',
    description: data?.description || '',
    deployedWebsite: data?.deployedWebsite || '',
    githubLink: data?.githubLink || '',
  });

  const [error, setError] = useState({});

  const countWords = (text) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const validateProject = () => {
    const newErrors = {};
    if (!project.name.trim()) newErrors.name = 'Project name is required';
    if (!project.description.trim())
      newErrors.description = 'Description is required';
    else if (countWords(project.description) > 150)
      newErrors.description = 'Description cannot exceed 150 words';
    if (!project.deployedWebsite.trim())
      newErrors.deployedWebsite = 'Deployed site URL is required';
    if (!project.githubLink.trim())
      newErrors.githubLink = 'GitHub link is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProject((prev) => {
      const updatedProject = {
        ...prev,
        [name]: value,
      };

      return updatedProject;
    });
  };
  const handleBlur = () => {
    const newErrors = validateProject();
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onProjectChange([project]);
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>PROJECTS</h1>
        <p>Tell us about a project you’ve worked on.</p>

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
