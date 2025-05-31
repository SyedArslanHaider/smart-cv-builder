import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitPersonalInfo } from '../hooks/useSubmitPersonalInfo';
import PersonalInfoForm from './PersonalInfo/PersonalInfoForm';
import Header from './Header/Header';

const SubmitAndRedirect = () => {
  const { submitPersonalInfo, loading, error, successMessage } = useSubmitPersonalInfo();
  const navigate = useNavigate();

   const handleFormSubmit = async (formData) => {
    // Pass the navigation callback to the hook
    await submitPersonalInfo(formData, (cvData) => {
      navigate('/preview', { state: { cvData } });
    });
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
