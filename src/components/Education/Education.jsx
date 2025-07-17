import styles from './Education.module.css';
import { useFormContext } from 'react-hook-form';
import { formatToMonthYear, monthYearToYYYYMM } from '../../utils/date';

const Education = ({ data, onEducationChange, onErrorChange }) => {
  const {
    register,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleDateChange = (field, rawValue) => {
    if (field === 'endDate' && rawValue === '') {
      setValue(`education[0].endDate`, 'current', { shouldValidate: true });
    } else {
      const monthYear = formatToMonthYear(rawValue);
      setValue(`education[0].${field}`, monthYear, { shouldValidate: true });
    }
  };

  const handleBlur = async () => {
    const isValid = await trigger();
    onErrorChange?.(!isValid);

    if (isValid) {
      const raw = getValues([
        'education[0].institution',
        'education[0].program',
        'education[0].startDate',
        'education[0].endDate',
      ]);
      const formatted = {
        institution: raw[0],
        program: raw[1],
        startDate: raw[2],
        endDate: raw[3],
      };
      onEducationChange?.([formatted]);
    }
  };

  return (
    <div className={styles.form}>
      <h1>EDUCATION</h1>
      <h2>Tell us about your educational background.</h2>

      <label className={styles.label}>Institution:</label>
      <input
        className={styles.input}
        type="text"
        {...register('education[0].institution')}
        onBlur={handleBlur}
        defaultValue={data?.institution || ''}
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
        onBlur={handleBlur}
        defaultValue={data?.program || ''}
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
            defaultValue={monthYearToYYYYMM(data?.startDate)}
            onChange={(e) => {
              handleDateChange('startDate', e.target.value);
              handleBlur();
            }}
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
            defaultValue={
              data?.endDate?.toLowerCase?.() === 'current'
                ? ''
                : monthYearToYYYYMM(data?.endDate)
            }
            onChange={(e) => {
              handleDateChange('endDate', e.target.value);
              handleBlur();
            }}
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
