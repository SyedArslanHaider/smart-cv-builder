// src/pages/SubmitAndRedirect.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubmitPersonalInfo } from '../hooks/useSubmitPersonalInfo'; // Custom hook
import PersonalInfoForm from '../components/PersonalInfo/PersonalInfoForm'; // Reused form
import Header from '../components/Header/Header'; // Reused header

const SubmitAndRedirect = () => {
    const { submitPersonalInfo, loading, error, successMessage } = useSubmitPersonalInfo();
    const navigate = useNavigate();

    const handleFormSubmit = async (formData) => {
    const generatedCV = await submitPersonalInfo(formData);
    if (generatedCV) {
        navigate('/preview', { state: { cvData: generatedCV } });
    }
    };

    return (
    <>
        <Header />
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
