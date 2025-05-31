import { useState } from 'react';

export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const submitPersonalInfo = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitPersonalInfo, loading, error, successMessage };
};
