import React, { useEffect } from 'react';
import styles from './Education.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { EducationSchema } from '../../utils/schemaValidations.js';
import { formatToMonthYear, monthYearToYYYYMM } from '../../utils/date.js';

const Education = ({ data, onEducationChange, onErrorChange }) => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(EducationSchema),
    defaultValues: {
      institution: data?.institution || '',
      program: data?.program || '',
      startDate: monthYearToYYYYMM(data?.startDate) || '',
      endDate: monthYearToYYYYMM(data?.endDate) || '',
    },
  });

  useEffect(() => {
    reset({
      institution: data?.institution || '',
      program: data?.program || '',
      startDate: monthYearToYYYYMM(data?.startDate) || '',
      endDate: monthYearToYYYYMM(data?.endDate) || '',
    });
  }, [data, reset]);

  const handleBlur = async () => {
    const valid = await trigger();
    onErrorChange(!valid);
    if (valid) {
      const raw = getValues();
      const formatted = {
        ...raw,
        startDate: formatToMonthYear(raw.startDate),
        endDate:
          raw.endDate?.toLowerCase?.() === 'current'
            ? 'current'
            : formatToMonthYear(raw.endDate),
      };
      onEducationChange([formatted]);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(() => {})}>
      <h1>EDUCATION</h1>
      <h2>Tell us about your educational background.</h2>

      <label className={styles.label}>Institution:</label>
      <input
        className={styles.input}
        type="text"
        {...register('institution')}
        onBlur={handleBlur}
        placeholder="e.g. Udemy, CodeAcademy Bootcamp, Harvard"
      />
      {errors.institution && (
        <p className={styles.error}>{errors.institution.message}</p>
      )}

      <label className={styles.label}>Program:</label>
      <input
        className={styles.input}
        type="text"
        {...register('program')}
        onBlur={handleBlur}
        placeholder="e.g. Full-stack Web Dev Bootcamp"
      />
      {errors.program && (
        <p className={styles.error}>{errors.program.message}</p>
      )}

      <div className={styles.dateGroup}>
        <div className={styles.dateField}>
          <label className={styles.label}>
            Start Date: <span className={styles.hint}>(Format: June 2024)</span>
          </label>
          <input
            className={styles.input}
            type="month"
            {...register('startDate')}
            onBlur={handleBlur}
          />
          {errors.startDate && (
            <p className={styles.error}>{errors.startDate.message}</p>
          )}
        </div>

        <div className={styles.dateField}>
          <label className={styles.label}>
            End Date: <span className={styles.hint}>(Format: June 2025)</span>
          </label>
          <input
            className={styles.input}
            type="month"
            {...register('endDate')}
            onBlur={handleBlur}
          />
          {errors.endDate && (
            <p className={styles.error}>{errors.endDate.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Education;
