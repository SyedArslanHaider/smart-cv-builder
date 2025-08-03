import { useFormContext } from 'react-hook-form';
import styles from './ProfileVsJob.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const ProfileVsJob = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const jobCriteriaValue = watch('profileVsJobCriteria.jobcriteria');
  const currentLength = jobCriteriaValue?.length || 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROFILE vs. JOB CRITERIA</h1>

      <label htmlFor="profile-vs-job" className={styles.label}>
        What Helps You Stand Out?
      </label>
      <textarea
        id="profile-vs-job"
        className={`${styles.textarea} ${
          errors.profileVsJobCriteria?.jobcriteria ? styles.errortextarea : ''
        }`}
        placeholder="Excellent teamwork, problem-solving, and adaptability. Proficient in React, Express, PostgreSQL, and Agile methodologies. Fluent in English and intermediate Spanish. Meet job criteria in full-stack development and collaborative project execution."
        {...register('profileVsJobCriteria.jobcriteria')}
        required
      />

      <CharacterCount length={currentLength} limit={200} />

      {errors.profileVsJobCriteria?.jobcriteria && (
        <p className={styles.errortext}>
          {errors.profileVsJobCriteria.jobcriteria.message}
        </p>
      )}
    </div>
  );
};

export default ProfileVsJob;
