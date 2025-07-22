import { useState } from 'react';
import { saveFormData } from '../../src/utils/saveData.js';

export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const submitPersonalInfo = async (formData, onSuccessNavigate) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/generateCv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.warn('API response:', data);
      if (response.ok) {
        setSuccessMessage(data.message);
        saveFormData(data.CV);
        if (onSuccessNavigate) {
          onSuccessNavigate(data.CV);
        }
      } else {
        setError(data.errors[0] || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message);
      console.warn('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    submitPersonalInfo,
    loading,
    error,
    successMessage,
    clearError,
  };
};
