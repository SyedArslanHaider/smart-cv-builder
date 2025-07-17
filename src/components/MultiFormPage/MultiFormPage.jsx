import React, { useState, useEffect, useCallback } from 'react';
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
import { getFormData, saveFormData } from '../../utils/saveData.js';
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

  const [apiKey, setApiKey] = useState(savedData.apiKey || null);
  const [formData, setFormData] = useState(savedData || {});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const defaultValues = savedData || {
    apiKey: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      github: '',
      linkedin: '',
      portfolio: '',
    },
    professionalSummary: {
      summary: '',
    },
    transferableExperience: {
      experience: '',
    },
    projects: [
      {
        name: '',
        description: '',
        deployedWebsite: '',
        githubLink: '',
      },
    ],
    education: [
      {
        institution: '',
        program: '',
        startDate: '',
        endDate: '',
      },
    ],
    profileVsJobCriteria: {
      jobcriteria: '',
    },
  };

  const methods = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(cvSchema),
  });

  const { trigger, getValues, watch, setValue, register } = methods;
  const { submitPersonalInfo, loading, error, successMessage, clearError } =
    useSubmitPersonalInfo();

  const watchedValues = watch();
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    register('apiKey');
  }, [register]);

  useEffect(() => {
    if (apiKey) {
      setValue('apiKey', apiKey);
    }
  }, [apiKey, setValue]);

  useEffect(() => {
    setFormData((prevData) => {
      if (JSON.stringify(prevData) !== JSON.stringify(watchedValues)) {
        return watchedValues;
      }
      return prevData;
    });
  }, [watchedValues]);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

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
      await submitPersonalInfo(data, (cvData) => {
        navigate('/preview', { state: { cvData, formData: data } });
      });
    } catch (err) {
      console.error('Form submission failed:', err);
      alert('There was an issue submitting the form. Please try again.');
    }
  };

  const handleProjectChange = useCallback(
    (data) => {
      const projectsArray = Array.isArray(data) ? data : [data];

      setFormData((prev) => ({
        ...prev,
        projects: projectsArray,
      }));

      setValue('projects', projectsArray);
    },
    [setFormData, setValue]
  );
  const handleEducationChange = useCallback(
    (data) => {
      setFormData((prev) => ({
        ...prev,
        education: Array.isArray(data) ? data : [data],
      }));
    },
    [setFormData]
  );

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    setFormData((prev) => ({ ...prev, apiKey: key }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'PERSONAL INFO':
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onPersonalInfoChange={(data) =>
              setFormData((prev) => ({ ...prev, personalInfo: data }))
            }
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      case 'PROFESSIONAL SUMMARY':
        return (
          <ProfessionalSummary
            data={formData.professionalSummary}
            onSummaryChange={(data) =>
              setFormData((prev) => ({ ...prev, professionalSummary: data }))
            }
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      case 'EXPERIENCE':
        return (
          <TransferableExperience
            data={formData.transferableExperience}
            onExperienceChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                transferableExperience: data,
              }))
            }
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      case 'EDUCATION':
        return (
          <Education
            data={formData.education?.[0]}
            onEducationChange={handleEducationChange}
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      case 'PROJECTS':
        return (
          <Project
            data={formData.projects?.[0]}
            onProjectChange={handleProjectChange}
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      case 'PROFILE VS JOB CRITERIA':
        return (
          <ProfileVsJob
            data={formData.profileVsJobCriteria}
            onJobCriteriaChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                profileVsJobCriteria: data,
              }))
            }
            onErrorChange={(hasError) => console.log('error?', hasError)}
          />
        );
      default:
        return null;
    }
  };

  const Overlay = (
    <div className={styles.overlay}>
      <LoadingState />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <div className={styles.formcontainer}>
        {!apiKey ? (
          <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
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

            {loading && Overlay}
            {successMessage && <p className="success">{successMessage}</p>}
          </>
        )}
      </div>
    </FormProvider>
  );
};

export default MultiFormPage;
