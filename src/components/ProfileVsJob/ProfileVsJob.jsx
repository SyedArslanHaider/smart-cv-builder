import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfileVsJob.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';
import { ProfileVsJobSchema } from '../../utils/schemaValidations.js';

const ProfileVsJob = ({ data, onJobCriteriaChange, onErrorChange }) => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ProfileVsJobSchema),
    defaultValues: {
      jobcriteria: data?.jobcriteria || '',
    },
  });

  useEffect(() => {
    reset({ jobcriteria: data?.jobcriteria || '' });
  }, [data, reset]);

  const handleBlur = async () => {
    const isValid = await trigger();
    onErrorChange(!isValid);
    if (isValid) {
      onJobCriteriaChange({ jobcriteria: getValues('jobcriteria') });
    }
  };

  const currentTextLength = getValues('jobcriteria')?.length || 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROFILE vs. JOB CRITERIA</h1>

      <label htmlFor="profile-vs-job" className={styles.label}>
        What Helps You Stand Out?
      </label>
      <textarea
        id="profile-vs-job"
        className={`${styles.textarea} ${
          errors.jobcriteria ? styles.errortextarea : ''
        }`}
        placeholder="Excellent teamwork, problem-solving, and adaptability. Proficient in React, Express, PostgreSQL, and Agile methodologies. Fluent in English and intermediate Spanish. Meet job criteria in full-stack development and collaborative project execution."
        {...register('jobcriteria')}
        onBlur={handleBlur}
        required
      />

      <CharacterCount length={currentTextLength} limit={200} />

      {errors.jobcriteria && (
        <p className={styles.errortext}>{errors.jobcriteria.message}</p>
      )}
    </div>
  );
};

export default ProfileVsJob;
