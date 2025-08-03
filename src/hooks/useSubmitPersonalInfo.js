import { useState } from 'react';
import { saveFormData, getSettings } from '../../src/utils/saveData.js';

export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const submitPersonalInfo = async (formData, onSuccessNavigate) => {
    setLoading(true);
    setError(null);

    try {
      const { apiKey } = getSettings();

      const response = await fetch('/.netlify/functions/generateCv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          apiKey,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        saveFormData(data.CV);
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

  return {
    submitPersonalInfo,
    loading,
    error,
    successMessage,
    clearError,
  };
};
