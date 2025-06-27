import React, { useEffect } from 'react';
import styles from './PersonalInfo.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonalInfoSchema } from '../../utils/schemaValidations.js';

const PersonalInfoForm = ({ data, onPersonalInfoChange, onErrorChange }) => {
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(PersonalInfoSchema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const handleBlur = async () => {
    const valid = await trigger();
    onErrorChange(!valid);
    if (valid) {
      onPersonalInfoChange(getValues());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(() => {})}>
      <h2>PERSONAL INFORMATION</h2>

      <label htmlFor="fullName">Full Name:</label>
      <input
        id="fullName"
        type="text"
        {...register('fullName')}
        onBlur={handleBlur}
        placeholder="Full Name"
        className={styles.input}
      />
      {errors.fullName && (
        <p className={styles.error}>{errors.fullName.message}</p>
      )}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        {...register('email')}
        onBlur={handleBlur}
        placeholder="Email"
        className={styles.input}
      />
      {errors.email && <p className={styles.error}>{errors.email.message}</p>}

      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="tel"
        {...register('phone')}
        onBlur={handleBlur}
        placeholder="Phone"
        className={styles.input}
      />
      {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

      <label htmlFor="github">GitHub:</label>
      <input
        id="github"
        type="url"
        {...register('github')}
        onBlur={handleBlur}
        placeholder="GitHub URL"
        className={styles.input}
      />
      {errors.github && <p className={styles.error}>{errors.github.message}</p>}

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        type="url"
        {...register('linkedin')}
        onBlur={handleBlur}
        placeholder="LinkedIn URL"
        className={styles.input}
      />
      {errors.linkedin && (
        <p className={styles.error}>{errors.linkedin.message}</p>
      )}

      <label htmlFor="portfolio">Portfolio:</label>
      <input
        id="portfolio"
        type="url"
        {...register('portfolio')}
        onBlur={handleBlur}
        placeholder="Portfolio URL"
        className={styles.input}
      />
      {errors.portfolio && (
        <p className={styles.error}>{errors.portfolio.message}</p>
      )}
    </form>
  );
};

export default PersonalInfoForm;
