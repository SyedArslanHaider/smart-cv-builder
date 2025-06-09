import React, { useState } from 'react';
import Header from '../Header/Header.jsx';
import LeftPane from '../LeftPane/LeftPane.jsx';
import PersonalInfoForm from '../PersonalInfo/PersonalInfoForm.jsx';
import ProfessionalSummary from '../ProfessionalSummary/ProfessionalSummary.jsx';
import TransferableExperience from '../TransferableExperience/TransferableExperience.jsx';
import Education from '../Education/Education.jsx';
import Project from '../Project/Project.jsx';
import ProfileVsJob from '../ProfileVsJob/ProfileVsJob.jsx';
import Button from '../Button/Button.jsx';
import { useSubmitPersonalInfo } from '../../hooks/useSubmitPersonalInfo.js';
import styles from './MultiFormPage.module.css';

const steps = [
  'PERSONAL INFO',
  'PROFESSIONAL SUMMARY',
  'EXPERIENCE',
  'EDUCATION',
  'PROJECTS',
  'PROFILE VS JOB CRITERIA',
];
const MultiFormPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    professionalSummary: {},
    transferableExperience: {},
    education: [
      {
        institution: '',
        program: '',
        startDate: '',
        endDate: '',
      },
    ],
    projects: [
      {
        name: '',
        description: '',
        deployedWebsite: '',
        githubLink: '',
      },
    ],
    profileVsJobCriteria: {},
  });

  const { submitPersonalInfo, loading, error, successMessage } =
    useSubmitPersonalInfo();

  const currentStep = steps[currentStepIndex];

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
              setFormData({ ...formData, personalInfo: data })
            }
          />
        );
      case 'PROFESSIONAL SUMMARY':
        return (
          <ProfessionalSummary
            data={formData.professionalSummary}
            onSummaryChange={(data) =>
              setFormData({ ...formData, professionalSummary: data })
            }
          />
        );
      case 'EXPERIENCE':
        return (
          <TransferableExperience
            data={formData.transferableExperience}
            onExperienceChange={(data) =>
              setFormData({ ...formData, transferableExperience: data })
            }
          />
        );
      case 'EDUCATION':
        return (
          <Education
            data={formData.education}
            onEducationChange={(data) =>
              setFormData((prevState) => ({
                ...prevState,
                education: Array.isArray(data) ? data : [data],
              }))
            }
          />
        );
      case 'PROJECTS':
        return (
          <Project
            data={formData.projects}
            onProjectChange={(data) =>
              setFormData((prevState) => ({
                ...prevState,
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
              setFormData({ ...formData, profileVsJobCriteria: data })
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.formcontainer}>
      <Header />

      <div className={styles.gridcontainer}>
        <LeftPane currentStep={currentStep} />
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

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default MultiFormPage;
