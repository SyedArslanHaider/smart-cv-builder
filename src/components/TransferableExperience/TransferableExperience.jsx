import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './TransferableExperience.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';
import { TransferableExperienceSchema } from '../../utils/schemaValidations.js';

const TransferableExperience = ({
  data,
  onExperienceChange,
  onErrorChange,
}) => {
  const {
    register,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(TransferableExperienceSchema),
    defaultValues: {
      experience: data?.experience || '',
    },
  });

  const experience = watch('experience');

  useEffect(() => {
    reset({ experience: data?.experience || '' });
  }, [data, reset]);

  const handleBlur = async () => {
    const valid = await trigger('experience');
    onErrorChange(!valid);
    if (valid) {
      onExperienceChange({ experience });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>TRANSFERABLE EXPERIENCE</h1>

      <label htmlFor="transferable-experience" className={styles.label}>
        Which key experiences and accomplishments have significantly contributed
        to your professional skill set?
      </label>
      <textarea
        id="transferable-experience"
        className={`${styles.textarea} ${errors.experience ? styles.errortextarea : ''}`}
        placeholder="During my role as a delivery rider in Barcelona (Jan 2024 – Apr 2025), I developed strong time management, navigation, and customer service skills while operating in a high-pressure environment. I was consistently recognized for maintaining a 95% on-time delivery rate and received excellent customer feedback, demonstrating my reliability, adaptability, and effective communication."
        {...register('experience')}
        onBlur={handleBlur}
        required
      />

      <CharacterCount length={experience?.length || 0} limit={200} />

      {errors.experience && (
        <p className={styles.errortext}>{errors.experience.message}</p>
      )}
    </div>
  );
};

export default TransferableExperience;
