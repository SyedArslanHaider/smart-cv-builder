import { useFormContext } from 'react-hook-form';
import styles from './TransferableExperience.module.css';
import CharacterCount from '../CharacterCount/CharacterCount';

const TransferableExperience = ({ onExperienceChange, onErrorChange }) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const experienceValue = watch('transferableExperience.experience');
  const currentLength = experienceValue?.length || 0;

  const handleBlur = async () => {
    const valid = await trigger('transferableExperience.experience');
    onErrorChange(!valid);
    if (valid) {
      onExperienceChange({ experience: experienceValue });
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
        className={`${styles.textarea} ${
          errors.transferableExperience?.experience ? styles.errortextarea : ''
        }`}
        placeholder="During my role as a delivery rider in Barcelona (Jan 2024 – Apr 2025), I developed strong time management, navigation, and customer service skills while operating in a high-pressure environment. I was consistently recognized for maintaining a 95% on-time delivery rate and received excellent customer feedback, demonstrating my reliability, adaptability, and effective communication."
        {...register('transferableExperience.experience')}
        onBlur={handleBlur}
        required
      />

      <CharacterCount length={currentLength} limit={200} />

      {errors.transferableExperience?.experience && (
        <p className={styles.errortext}>
          {errors.transferableExperience.experience.message}
        </p>
      )}
    </div>
  );
};

export default TransferableExperience;
