import { useFormContext } from 'react-hook-form';
import styles from './ProfessionalSummary.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const ProfessionalSummary = ({ onSummaryChange, onErrorChange }) => {
  const {
    register,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext();

  const summaryValue = watch('professionalSummary.summary');
  const currentLength = summaryValue?.length || 0;

  const handleBlur = async () => {
    const isValid = await trigger();
    onErrorChange(!isValid);
    if (isValid) {
      onSummaryChange({ summary: getValues('summary') });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>PROFESSIONAL SUMMARY</h1>

      <label htmlFor="professional-summary" className={styles.label}>
        Tell us about your journey in tech?
      </label>
      <textarea
        id="professional-summary"
        className={`${styles.textarea} ${
          errors.professionalSummary?.summary ? styles.errortextarea : ''
        }`}
        placeholder="I am passionate about tech, focusing on building solutions with React and Express. Looking for a role to continue learning, developing impactful applications, and growing as a full-stack developer."
        {...register('professionalSummary.summary')}
        onBlur={handleBlur}
        required
      />

      <CharacterCount length={currentLength} limit={150} />

      {errors.professionalSummary?.summary && (
        <p className={styles.errortext}>
          {errors.professionalSummary.summary.message}
        </p>
      )}
    </div>
  );
};

export default ProfessionalSummary;
