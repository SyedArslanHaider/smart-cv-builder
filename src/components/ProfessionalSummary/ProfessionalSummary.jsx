import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfessionalSummary.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';
import { ProfessionalSummarySchema } from '../../utils/schemaValidations.js';

const ProfessionalSummary = ({ data, onSummaryChange, onErrorChange }) => {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(ProfessionalSummarySchema),
    defaultValues: {
      summary: data?.summary || '',
    },
  });

  useEffect(() => {
    reset({ summary: data?.summary || '' });
  }, [data, reset]);

  const handleBlur = async () => {
    const isValid = await trigger();
    onErrorChange(!isValid);
    if (isValid) {
      onSummaryChange({ summary: getValues('summary') });
    }
  };

  const currentLength = getValues('summary')?.length || 0;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROFESSIONAL SUMMARY</h1>

      <label htmlFor="professional-summary" className={styles.label}>
        Tell us about your journey in tech?
      </label>
      <textarea
        id="professional-summary"
        className={`${styles.textarea} ${
          errors.summary ? styles.errortextarea : ''
        }`}
        placeholder="I am passionate about tech, focusing on building solutions with React and Express. Looking for a role to continue learning, developing impactful applications, and growing as a full-stack developer."
        {...register('summary')}
        onBlur={handleBlur}
        required
      />

      <CharacterCount length={currentLength} limit={150} />

      {errors.summary && (
        <p className={styles.errortext}>{errors.summary.message}</p>
      )}
    </div>
  );
};

export default ProfessionalSummary;
