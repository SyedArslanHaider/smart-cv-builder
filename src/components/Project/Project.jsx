import { useFormContext } from 'react-hook-form';
import styles from '../Project/Project.module.css';
import CharacterCount from '../CharacterCount/CharacterCount.jsx';

const Project = ({ onProjectChange, onErrorChange, data }) => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleBlur = async () => {
    const isValid = await trigger();
    onErrorChange?.(!isValid);

    if (isValid) {
      const raw = getValues([
        'projects[0].name',
        'projects[0].description',
        'projects[0].deployedWebsite',
        'projects[0].githubLink',
      ]);
      console.log('Project values:', raw);
      const formatted = {
        name: raw[0],
        description: raw[1],
        deployedWebsite: raw[2],
        githubLink: raw[3],
      };
      onProjectChange?.([formatted]);
    }
  };

  const descriptionLength = getValues('projects[0].description')?.length || 0;

  return (
    <div className={styles.form}>
      <h1>PROJECTS</h1>
      <h2>Tell us about a project you’ve worked on.</h2>

      <label className={styles.label}>Project Name:</label>
      <input
        className={styles.input}
        type="text"
        {...register('projects[0].name')}
        onBlur={handleBlur}
        defaultValue={data?.name || ''}
        placeholder="e.g. Portfolio Website, E-commerce App"
      />
      {errors.projects?.[0]?.name && (
        <p className={styles.error}>{errors.projects[0].name.message}</p>
      )}

      <label className={styles.label}>Description:</label>
      <textarea
        className={styles.input}
        rows={4}
        {...register('projects[0].description')}
        onBlur={handleBlur}
        defaultValue={data?.description || ''}
        placeholder="e.g. A full-stack portfolio site with animations and contact form."
      />
      <CharacterCount length={descriptionLength} limit={150} />
      {errors.projects?.[0]?.description && (
        <p className={styles.error}>{errors.projects[0].description.message}</p>
      )}

      <div className={styles.projectLinks}>
        <div className={styles.projectField}>
          <label className={styles.label}>Deployed Website:</label>
          <input
            className={styles.input}
            type="url"
            {...register('projects[0].deployedWebsite')}
            onBlur={handleBlur}
            defaultValue={data?.projectLinks || ''}
            placeholder="https://yourproject.com"
          />
          {errors.projects?.[0]?.deployedWebsite && (
            <p className={styles.error}>
              {errors.projects[0].deployedWebsite.message}
            </p>
          )}
        </div>

        <div className={styles.projectField}>
          <label className={styles.label}>GitHub Link:</label>
          <input
            className={styles.input}
            type="url"
            {...register('projects[0].githubLink')}
            onBlur={handleBlur}
            defaultValue={data?.githubLink || ''}
            placeholder="https://github.com/yourrepo"
          />
          {errors.projects?.[0]?.githubLink && (
            <p className={styles.error}>
              {errors.projects[0].githubLink.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
