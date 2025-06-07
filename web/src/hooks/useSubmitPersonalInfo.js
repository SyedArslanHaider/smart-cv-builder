import React, { useState } from 'react';

// useSubmitPersonalInfo.js
export const useSubmitPersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [cvData, setCvData] = useState(null);

  const submitPersonalInfo = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("usesubmitPersonalInfo" , data)

      if (response.ok) {
        const cleanedResponse = data.CV
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
        const cvJson= JSON.parse(cleanedResponse);
        console.log(data.cv)
        console.log(cvJson) 
        setSuccessMessage(data.message);
        setCvData(cvJson);
        return cvJson; // ✅ return CV data to the component
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitPersonalInfo, loading, error, successMessage, cvData };
};
