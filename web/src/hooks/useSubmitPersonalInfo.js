import { useState } from 'react';

export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [cvData, setCvData] = useState(null);

  const submitPersonalInfo = async (personalData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personalData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate CV');
      }

      const data = await response.json();
      setCvData(data);
      setSuccessMessage('CV generated successfully!');
      setLoading(false);

      // Return the data immediately so caller can use it
      return data;
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
      return null;
    }
  };

  return { submitPersonalInfo, loading, error, successMessage, cvData };
};
