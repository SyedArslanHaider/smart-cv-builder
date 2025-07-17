import React, { useState, useEffect } from 'react';
import styles from './CVPreview.module.css';
import CVHeader from './CVHeader';
import CVSummary from './CVSummary';
import CVSkills from './CVSkills';
import CVExperience from './CVExperience';
import CVProjects from './CVProjects';
import CVEducation from './CVEducation';

const CVPreview = React.forwardRef(({ cvData, onSave, personalInfo }, ref) => {
  const [cvState, setCvState] = useState({});

  const parseCvData = (data) => {
    if (!data) return {};

    let parsedData = data;

    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (error) {
        console.error('Error parsing cvData:', error);
        return {};
      }
    }

    let experienceArray = [];
    if (Array.isArray(parsedData.experience)) {
      experienceArray = parsedData.experience.map((exp) => {
        if (typeof exp === 'string') {
          return { bulletPoints: [exp] };
        } else if (Array.isArray(exp.description)) {
          return { bulletPoints: exp.description };
        }
        return exp;
      });
    } else if (parsedData.transferableExperience) {
      if (Array.isArray(parsedData.transferableExperience)) {
        experienceArray = parsedData.transferableExperience.map((exp) => ({
          companyName: exp.company,
          jobTitle: exp.position,
          startDate: exp.startDate,
          endDate: exp.endDate,
          bulletPoints: exp.achievements || [],
        }));
      } else {
        experienceArray = [
          {
            companyName: parsedData.transferableExperience.company,
            jobTitle: parsedData.transferableExperience.position,
            startDate: parsedData.transferableExperience.startDate,
            endDate: parsedData.transferableExperience.endDate,
            bulletPoints: parsedData.transferableExperience.achievements || [],
          },
        ];
      }
    }

    let skillsData = [];
    if (Array.isArray(parsedData.skills)) {
      skillsData = parsedData.skills;
    } else if (parsedData.skills && typeof parsedData.skills === 'object') {
      skillsData = [
        ...(parsedData.skills.technical || []),
        ...(parsedData.skills.soft || []),
      ];
    }

    return {
      fullName:
        personalInfo.fullName ||
        personalInfo.name ||
        personalInfo.personalInfo?.fullName ||
        '',
      contact: {
        email:
          personalInfo.contact?.email ||
          personalInfo.email ||
          personalInfo.personalInfo?.email ||
          '',
        phone:
          personalInfo.contact?.phone ||
          personalInfo.phone ||
          personalInfo.personalInfo?.phone ||
          '',
        linkedin:
          personalInfo.contact?.linkedin ||
          personalInfo.linkedin ||
          personalInfo.personalInfo?.linkedin ||
          '',
        github:
          personalInfo.contact?.github ||
          personalInfo.github ||
          personalInfo.personalInfo?.github ||
          '',
        portfolio:
          personalInfo.contact?.portfolio ||
          personalInfo.portfolio ||
          personalInfo.personalInfo?.portfolio ||
          '',
      },
      professional_summary:
        parsedData.professionalSummary ||
        parsedData.professional_summary ||
        '',
      experience: experienceArray,
      projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
      education: Array.isArray(parsedData.education) ? parsedData.education : [],
      skills: skillsData,
    };
  };

  useEffect(() => {
    const parsedData = parseCvData(cvData);
    setCvState(parsedData);
  }, [cvData]);

  if (!cvData) return <p className={styles['no-data']}>No CV data available</p>;

  const parsedCvData = parseCvData(cvData);

  if (!parsedCvData || Object.keys(parsedCvData).length === 0) {
    return <p className={styles['no-data']}>Invalid or empty CV data format</p>;
  }

  const handleSave = (section, data) => {
    setCvState(prev => ({
      ...prev,
      [section]: data
    }));
    
    if (onSave) {
      onSave({
        ...cvState,
        [section]: data
      });
    }
  };

  const { fullName, contact, professional_summary, experience, projects, education, skills } = cvState;

  return (
    <div ref={ref} className={styles['cv-container']}>
      <CVHeader 
        fullName={fullName} 
        contact={contact} 
        onSave={(data) => handleSave('header', data)}
      />
      
      <CVSummary 
        professional_summary={professional_summary} 
        onSave={(data) => handleSave('professional_summary', data)}
      />
      
      {skills && skills.length > 0 && (
        <CVSkills 
          skills={skills} 
          onSave={(data) => handleSave('skills', data)}
        />
      )}
      
      <CVExperience 
        experience={experience} 
        onSave={(data) => handleSave('experience', data)}
      />
      
      {projects && projects.length > 0 && (
        <CVProjects 
          projects={projects} 
          onSave={(data) => handleSave('projects', data)}
        />
      )}
      
      {education && education.length > 0 && (
        <CVEducation 
          education={education} 
          onSave={(data) => handleSave('education', data)}
        />
      )}
    </div>
  );
});

export default CVPreview;