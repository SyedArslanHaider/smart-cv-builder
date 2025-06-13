import React, { useState, useEffect, useCallback } from 'react';
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
import { useNavigate } from 'react-router';

const steps = [
  'PERSONAL INFO',
  'PROFESSIONAL SUMMARY',
  'EXPERIENCE',
  'EDUCATION',
  'PROJECTS',
  'PROFILE VS JOB CRITERIA',
];
const MultiFormPage = () => {
  const savedData = getFormData();
  const [apiKey, setApiKey] = useState(savedData.apiKey || null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(() => {
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

  const [formErrors, setFormErrors] = useState({
    personalInfo: false,
    professionalSummary: false,
    transferableExperience: false,
    education: false,
    projects: false,
    profileVsJobCriteria: false,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveFormData(formData);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [formData]);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const { submitPersonalInfo, loading, error, successMessage, clearError } =
    useSubmitPersonalInfo();
  const navigate = useNavigate();

  const updateFormError = (step, hasError) => {
    setFormErrors((prev) => ({ ...prev, [step]: hasError }));
  };

  const currentStep = steps[currentStepIndex];

  const isStepValid = () => {
    switch (currentStep) {
      case 'PERSONAL INFO': {
        const info = formData.personalInfo;
        return (
          info.fullName &&
          info.email &&
          info.phone &&
          info.github &&
          info.linkedin &&
          info.portfolio &&
          !formErrors.personalInfo
        );
      }

      case 'PROFESSIONAL SUMMARY': {
        return (
          formData.professionalSummary.summary?.trim().length >= 150 &&
          !formErrors.professionalSummary
        );
      }

      case 'EXPERIENCE': {
        const experienceText =
          formData.transferableExperience?.experience || '';
        return (
          experienceText.trim().length >= 200 &&
          !formErrors.transferableExperience
        );
      }

      case 'EDUCATION': {
        const isValidData = formData.education.every((edu) => {
          return (
            edu.institution.trim() &&
            edu.program.trim() &&
            edu.startDate &&
            edu.endDate
          );
        });
        return isValidData && !formErrors.education;
      }

      case 'PROJECTS': {
        const isValidData = formData.projects.every((project) => {
          return (
            project.name.trim() &&
            project.description.trim() &&
            project.githubLink.trim() &&
            !formErrors.projects
          );
        });
        return isValidData;
      }

      case 'PROFILE VS JOB CRITERIA': {
        const criteria = formData.profileVsJobCriteria?.jobcriteria;
        return (
          criteria?.trim().length > 200 && !formErrors.profileVsJobCriteria
        );
      }

      default:
        return true;
    }
  };

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
    if (!isStepValid()) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid()) {
      alert('Please fill in all required fields before proceeding.');
      return;
    }
    try {
      await submitPersonalInfo(formData, (cvData) => {
        navigate('/preview', { state: { cvData, formData } });
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('There was an issue submitting the form. Please try again.');
    }
  };

  const handleProjectChange = useCallback(
    (data) => {
      setFormData((prev) => ({
        ...prev,
        projects: Array.isArray(data) ? data : [data],
      }));
    },
    [setFormData]
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

  const renderStep = () => {
    switch (currentStep) {
      case 'PERSONAL INFO':
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onPersonalInfoChange={(data) =>
              setFormData((prev) => ({ ...prev, personalInfo: data }))
            }
            onErrorChange={(hasError) =>
              updateFormError('personalInfo', hasError)
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
            onErrorChange={(hasError) =>
              updateFormError('professionalSummary', hasError)
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
            onErrorChange={(hasError) =>
              updateFormError('transferableExperience', hasError)
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
            onErrorChange={(hasError) => updateFormError('education', hasError)}
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
            onErrorChange={(hasError) => updateFormError('projects', hasError)}
          />
        );

      case 'PROFILE VS JOB CRITERIA':
        return (
          <ProfileVsJob
            data={formData.profileVsJobCriteria}
            onJobCriteriaChange={(data) =>
              setFormData((prev) => ({ ...prev, profileVsJobCriteria: data }))
            }
            onErrorChange={(hasError) =>
              updateFormError('profileVsJobCriteria', hasError)
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
        </>
      )}
      ;
    </div>
  );
};

export default MultiFormPage;
