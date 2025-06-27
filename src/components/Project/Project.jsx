import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '../Project/Project.module.css';
import CharacterCount from '../CharacterCount/CharacterCount.jsx';
import { ProjectSchema } from '../../utils/schemaValidations.js';

const Project = ({ data, onProjectChange, onErrorChange }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ProjectSchema),
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      deployedWebsite: data?.deployedWebsite || '',
      githubLink: data?.githubLink || '',
    },
  });

  useEffect(() => {
    reset({
      name: data?.name || '',
      description: data?.description || '',
      deployedWebsite: data?.deployedWebsite || '',
      githubLink: data?.githubLink || '',
    });
  }, [data, reset]);

  const handleBlur = async () => {
    const valid = await trigger();
    onErrorChange(!valid);
    if (valid) {
      onProjectChange(getValues());
    }
  };

  const descriptionLength = getValues('description')?.length || 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit(() => {})}>
      <h1>PROJECTS</h1>
      <h2>Tell us about a project you’ve worked on.</h2>

      <label className={styles.label}>Project Name:</label>
      <input
        className={styles.input}
        type="text"
        {...register('name')}
        onBlur={handleBlur}
        placeholder="e.g. Portfolio Website, E-commerce App"
      />
      {errors.name && <p className={styles.error}>{errors.name.message}</p>}

      <label className={styles.label}>Description:</label>
      <textarea
        className={styles.input}
        rows={4}
        {...register('description')}
        onBlur={handleBlur}
        placeholder="e.g. A full-stack portfolio site with animations and contact form."
      />
      <CharacterCount length={descriptionLength} limit={150} />
      {errors.description && (
        <p className={styles.error}>{errors.description.message}</p>
      )}

      <div className={styles.projectLinks}>
        <div className={styles.projectField}>
          <label className={styles.label}>Deployed Website:</label>
          <input
            className={styles.input}
            type="url"
            {...register('deployedWebsite')}
            onBlur={handleBlur}
            placeholder="https://yourproject.com"
          />
          {errors.deployedWebsite && (
            <p className={styles.error}>{errors.deployedWebsite.message}</p>
          )}
        </div>

        <div className={styles.projectField}>
          <label className={styles.label}>GitHub Link:</label>
          <input
            className={styles.input}
            type="url"
            {...register('githubLink')}
            onBlur={handleBlur}
            placeholder="https://github.com/yourrepo"
          />
          {errors.githubLink && (
            <p className={styles.error}>{errors.githubLink.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Project;
