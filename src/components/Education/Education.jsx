import styles from './Education.module.css';
import { useFormContext } from 'react-hook-form';

const Education = () => {
  const {
    register,

    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.form}>
      <h1>EDUCATION</h1>
      <h2>Tell us about your educational background.</h2>

      <label className={styles.label}>Institution:</label>
      <input
        className={styles.input}
        type="text"
        {...register('education[0].institution')}
        placeholder="e.g. Udemy, CodeAcademy Bootcamp, Harvard"
      />
      {errors.education?.[0]?.institution && (
        <p className={styles.error}>
          {errors.education[0].institution.message}
        </p>
      )}

      <label className={styles.label}>Program:</label>
      <input
        className={styles.input}
        type="text"
        {...register('education[0].program')}
        placeholder="e.g. Full-stack Web Dev Bootcamp"
      />
      {errors.education?.[0]?.program && (
        <p className={styles.error}>{errors.education[0].program.message}</p>
      )}

      <div className={styles.dateGroup}>
        <div className={styles.dateField}>
          <label className={styles.label}>
            Start Date: <span className={styles.hint}>(e.g. June 2023)</span>
          </label>
          <input
            className={styles.input}
            type="month"
            {...register('education[0].startDate')}
          />
          {errors.education?.[0]?.startDate && (
            <p className={styles.error}>
              {errors.education[0].startDate.message}
            </p>
          )}
        </div>

        <div className={styles.dateField}>
          <label className={styles.label}>
            End Date:{' '}
            <span className={styles.hint}>(e.g. June 2024 or "current")</span>
          </label>
          <input
            className={styles.input}
            type="month"
            {...register('education[0].endDate')}
          />
          {errors.education?.[0]?.endDate && (
            <p className={styles.error}>
              {errors.education[0].endDate.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
