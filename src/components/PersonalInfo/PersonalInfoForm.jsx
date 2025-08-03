import styles from './PersonalInfo.module.css';
import { useFormContext } from 'react-hook-form';

const PersonalInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.form}>
      <h2>PERSONAL INFORMATION</h2>

      <label htmlFor="fullName">Full Name:</label>
      <input
        id="fullName"
        type="text"
        {...register('personalInfo.fullName')}
        placeholder="Full Name"
        className={styles.input}
      />
      {errors.personalInfo?.fullName && (
        <p className={styles.error}>{errors.personalInfo.fullName.message}</p>
      )}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        {...register('personalInfo.email')}
        placeholder="Email"
        className={styles.input}
      />
      {errors.personalInfo?.email && (
        <p className={styles.error}>{errors.personalInfo.email.message}</p>
      )}

      <label htmlFor="phone">Phone:</label>
      <input
        id="phone"
        type="tel"
        {...register('personalInfo.phone')}
        placeholder="Phone"
        className={styles.input}
      />
      {errors.personalInfo?.phone && (
        <p className={styles.error}>{errors.personalInfo.phone.message}</p>
      )}

      <label htmlFor="github">GitHub:</label>
      <input
        id="github"
        type="url"
        {...register('personalInfo.github')}
        placeholder="GitHub URL"
        className={styles.input}
      />
      {errors.personalInfo?.github && (
        <p className={styles.error}>{errors.personalInfo.github.message}</p>
      )}

      <label htmlFor="linkedin">LinkedIn:</label>
      <input
        id="linkedin"
        type="url"
        {...register('personalInfo.linkedin')}
        placeholder="LinkedIn URL"
        className={styles.input}
      />
      {errors.personalInfo?.linkedin && (
        <p className={styles.error}>{errors.personalInfo.linkedin.message}</p>
      )}

      <label htmlFor="portfolio">Portfolio:</label>
      <input
        id="portfolio"
        type="url"
        {...register('personalInfo.portfolio')}
        placeholder="Portfolio URL"
        className={styles.input}
      />
      {errors.personalInfo?.portfolio && (
        <p className={styles.error}>{errors.personalInfo.portfolio.message}</p>
      )}
    </div>
  );
};

export default PersonalInfoForm;
