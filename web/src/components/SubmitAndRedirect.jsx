import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitPersonalInfo } from '../hooks/useSubmitPersonalInfo';
import PersonalInfoForm from './PersonalInfo/PersonalInfoForm';
import Header from './Header/Header';

const SubmitAndRedirect = () => {
  const { submitPersonalInfo, loading, error, successMessage, cvData } = useSubmitPersonalInfo();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData) => {
    await submitPersonalInfo(formData);
    if (cvData) {
      navigate('/preview', { state: { cvData } });
    }
  };

  return (
    <>
      <Header /> {/* ✅ Add header here */}
      <PersonalInfoForm
        onSubmit={handleFormSubmit}
        loading={loading}
        error={error}
        successMessage={successMessage}
      />
    </>
  );
};

export default SubmitAndRedirect;
