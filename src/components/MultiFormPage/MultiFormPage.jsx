import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header.jsx';
import LeftPane from '../LeftPane/LeftPane.jsx';
import PersonalInfoForm from '../PersonalInfo/PersonalInfoForm.jsx';
import ProfessionalSummary from '../ProfessionalSummary/ProfessionalSummary.jsx';
import TransferableExperience from '../TransferableExperience/TransferableExperience.jsx';
import Education from '../Education/Education.jsx';
import Project from '../Project/Project.jsx';
import ProfileVsJob from '../ProfileVsJob/ProfileVsJob.jsx';
import IconSlide from '../IconSlide/IconSlide.jsx';
import Button from '../Button/Button.jsx';
import ApiKeyInput from '../ApiKeyInput/ApiKeyInput.jsx';
import ErrorState from '../ErrorState/ErrorState.jsx';
import LoadingState from '../LoadingState/LoadingState.jsx';

import { useSubmitPersonalInfo } from '../../hooks/useSubmitPersonalInfo.js';
import {
  getFormData,
  saveFormData,
  getSettings,
} from '../../utils/saveData.js';
import cvSchema from '../../../netlify/utils/schemaValidation.js';

import styles from './MultiFormPage.module.css';

const steps = [
  'PERSONAL INFO',
  'PROFESSIONAL SUMMARY',
  'EXPERIENCE',
  'EDUCATION',
  'PROJECTS',
  'PROFILE VS JOB CRITERIA',
];

const fieldPaths = {
  'PERSONAL INFO': [
    'personalInfo.fullName',
    'personalInfo.email',
    'personalInfo.phone',
    'personalInfo.github',
    'personalInfo.linkedin',
    'personalInfo.portfolio',
  ],
  'PROFESSIONAL SUMMARY': ['professionalSummary.summary'],
  EXPERIENCE: ['transferableExperience.experience'],
  EDUCATION: ['education'],
  PROJECTS: ['projects'],
  'PROFILE VS JOB CRITERIA': ['profileVsJobCriteria.jobcriteria'],
};

const MultiFormPage = () => {
  const navigate = useNavigate();
  const savedData = getFormData();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(null);

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: savedData || {},
    resolver: yupResolver(cvSchema),
  });

  const { trigger, getValues, watch } = methods;
  const watchedValues = watch();

  const { submitPersonalInfo, loading, error, successMessage, clearError } =
    useSubmitPersonalInfo();

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    const settings = getSettings();
    setHasApiKey(!!settings?.apiKey?.trim());
  }, []);

  const onApiKeySaved = () => setHasApiKey(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveFormData(watchedValues);
    }, 500);
    return () => clearTimeout(timer);
  }, [watchedValues]);

  useEffect(() => {
    if (error) {
      setCurrentStepIndex(0);
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleNext = async () => {
    const valid = await trigger(fieldPaths[currentStep]);
    if (!valid) {
      alert('Please fix the errors before continuing.');
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const valid = await trigger(fieldPaths[currentStep]);
    if (!valid) {
      alert('Please fix the errors before submitting.');
      return;
    }

    try {
      const data = getValues();
      const settings = getSettings();
      await submitPersonalInfo(data, (cvData) => {
        navigate('/preview', {
          state: {
            cvData,
            formData: data,
            settings,
          },
        });
      });
    } catch (err) {
      console.error('Form submission failed:', err);
      alert('There was an issue submitting the form. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'PERSONAL INFO':
        return <PersonalInfoForm />;
      case 'PROFESSIONAL SUMMARY':
        return <ProfessionalSummary />;
      case 'EXPERIENCE':
        return <TransferableExperience />;
      case 'EDUCATION':
        return <Education />;
      case 'PROJECTS':
        return <Project />;
      case 'PROFILE VS JOB CRITERIA':
        return <ProfileVsJob />;
      default:
        return null;
    }
  };

  if (hasApiKey === null) return null;

  return (
    <FormProvider {...methods}>
      <div className={styles.formcontainer}>
        {!hasApiKey ? (
          <ApiKeyInput onApiKeySaved={onApiKeySaved} />
        ) : (
          <>
            <Header />

            {error && (
              <div className={styles.overlay}>
                <ErrorState message={error} />
              </div>
            )}

            <div className={styles.gridcontainer}>
              <div className={styles.leftpane}>
                <LeftPane currentStep={currentStep} />
              </div>

              <div className={styles.mobileonly}>
                <IconSlide currentStep={currentStepIndex} />
              </div>

              <div className={styles.formcontent}>
                {renderStep()}

                <div className={styles.buttonrow}>
                  {currentStepIndex > 0 && (
                    <Button onClick={handlePrevious}>Previous</Button>
                  )}
                  {currentStepIndex < steps.length - 1 ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : (
                    <Button onClick={handleSubmit}>Submit</Button>
                  )}
                </div>
              </div>
            </div>

            {loading && (
              <div className={styles.overlay}>
                <LoadingState />
              </div>
            )}
            {successMessage && <p className="success">{successMessage}</p>}
          </>
        )}
      </div>
    </FormProvider>
  );
};

export default MultiFormPage;
