import { useState } from 'react';
import { saveFormData } from '../../utils/saveData';

export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [cvData, setCvData] = useState(null); // add this line



    const submitPersonalInfo = async (formData, onSuccessNavigate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
 

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setCvData(data.CV);
        saveFormData(data.CV);
        // Call navigate here with data.CV
        if (onSuccessNavigate) {
          onSuccessNavigate(data.CV);
        }
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { submitPersonalInfo, loading, error, successMessage, clearError };
};

