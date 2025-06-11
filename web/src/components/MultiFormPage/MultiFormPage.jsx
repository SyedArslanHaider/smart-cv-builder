import React, { useState, useEffect } from 'react';
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
import { useSubmitPersonalInfo } from '../../hooks/useSubmitPersonalInfo.js';
import styles from './MultiFormPage.module.css';
import { getFormData, saveFormData } from '../../../utils/saveData.js';
import LoadingState from '../LoadingState/LoadingState.jsx';

const steps = [
  'PERSONAL INFO',
  'PROFESSIONAL SUMMARY',
  'EXPERIENCE',
  'EDUCATION',
  'PROJECTS',
  'PROFILE VS JOB CRITERIA',
];
const MultiFormPage = () => {
  const [apiKey, setApiKey] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedData = getFormData();
    return {
      apiKey: savedData.apiKey || '',
      personalInfo: savedData.personalInfo || {},
      professionalSummary: savedData.professionalSummary || {},
      transferableExperience: savedData.transferableExperience || {},
      education: savedData.education || [
        {
          institution: '',
          program: '',
          startDate: '',
          endDate: '',
        },
      ],
      projects: savedData.projects || [
        {
          name: '',
          description: '',
          deployedWebsite: '',
          githubLink: '',
        },
      ],
      profileVsJobCriteria: savedData.profileVsJobCriteria || {},
    };
  });

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const { submitPersonalInfo, loading, error, successMessage, clearError } =
    useSubmitPersonalInfo();

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (error) {
      setCurrentStepIndex(0);
      const timer = setTimeout(() => {
        clearError();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    submitPersonalInfo(formData);
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
          />
        );
      case 'PROFESSIONAL SUMMARY':
        return (
          <ProfessionalSummary
            data={formData.professionalSummary}
            onSummaryChange={(data) =>
              setFormData((prev) => ({ ...prev, professionalSummary: data }))
            }
          />
        );
      case 'EXPERIENCE':
        return (
          <TransferableExperience
            data={formData.transferableExperience}
            onExperienceChange={(data) =>
              setFormData((prev) => ({ ...prev, transferableExperience: data }))
            }
          />
        );
      case 'EDUCATION':
        return (
          <Education
            data={
              formData.education[0] || {
                institution: '',
                program: '',
                startDate: '',
                endDate: '',
              }
            }
            onEducationChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                education: Array.isArray(data) ? data : [data],
              }))
            }
          />
        );
      case 'PROJECTS':
        return (
          <Project
            data={
              formData.projects[0] || {
                name: '',
                description: '',
                deployedWebsite: '',
                githubLink: '',
              }
            }
            onProjectChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                projects: Array.isArray(data) ? data : [data],
              }))
            }
          />
        );
      case 'PROFILE VS JOB CRITERIA':
        return (
          <ProfileVsJob
            data={formData.profileVsJobCriteria}
            onJobCriteriaChange={(data) =>
              setFormData((prev) => ({ ...prev, profileVsJobCriteria: data }))
            }
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
    <div className={styles.formcontainer}>
      {!apiKey && (
        <ApiKeyInput
          data={formData.apiKey}
          onApiKeySubmit={(key) => {
            setApiKey(key);
            setFormData((prev) => ({
              ...prev,
              apiKey: key,
            }));
          }}
        />
      )}

      {apiKey && (
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
              <Button onClick={handlePrevious}> Previous </Button>
            )}

                {currentStepIndex < steps.length - 1 ? (
                  <Button onClick={handleNext}>Next </Button>
                ) : (
                  <Button onClick={handleSubmit}> Submit </Button>
                )}
              </div>
            </div>
          </div>
      {loading && Overlay}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
  );
};

export default MultiFormPage;
