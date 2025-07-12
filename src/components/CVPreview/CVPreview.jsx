import React, { useState, useEffect } from 'react';
import styles from './CVPreview.module.css';
import CVHeader from './CVHeader';
import CVSummary from './CVSummary';
import CVSkills from './CVSkills';
import CVExperience from './CVExperience';
import CVProjects from './CVProjects';
import CVEducation from './CVEducation';
import EditForm from './EditForm';

const CVPreview = React.forwardRef(({ cvData, onSave, personalInfo, onEditModeChange }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editingSection, setEditingSection] = useState(null);

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
    setEditedData(parsedData);
  }, [cvData]);

  if (!cvData) return <p className={styles['no-data']}>No CV data available</p>;

  const parsedCvData = parseCvData(cvData);

  if (!parsedCvData || Object.keys(parsedCvData).length === 0) {
    return <p className={styles['no-data']}>Invalid or empty CV data format</p>;
  }

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [arrayName]:
        prev[arrayName]?.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ) || [],
    }));
  };

  const handleBulletPointChange = (expIndex, bulletIndex, value) => {
    setEditedData((prev) => ({
      ...prev,
      experience:
        prev.experience?.map((exp, i) =>
          i === expIndex
            ? {
                ...exp,
                bulletPoints:
                  exp.bulletPoints?.map((point, j) =>
                    j === bulletIndex ? value : point
                  ) || [],
              }
            : exp
        ) || [],
    }));
  };

  const handleExperienceChange = (expIndex, field, value) => {
    setEditedData((prev) => {
      const newExperience = [...prev.experience];
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        [field]: value,
      };
      return {
        ...prev,
        experience: newExperience,
      };
    });
  };

  const addExperience = () => {
    setEditedData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          companyName: '',
          jobTitle: '',
          startDate: '',
          endDate: '',
          bulletPoints: [''],
        },
      ],
    }));
  };

  const addProject = () => {
    setEditedData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          name: '',
          description: '',
          deployedWebsite: '',
          githubLink: '',
          technologiesUsed: [],
        },
      ],
    }));
  };

  const addEducation = () => {
    setEditedData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          program: '',
          institution: '',
          duration: '',
          highlights: '',
        },
      ],
    }));
  };

  const removeItem = (arrayName, index) => {
    setEditedData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName]?.filter((_, i) => i !== index) || [],
    }));
  };

  const addBulletPoint = (expIndex) => {
    setEditedData((prev) => ({
      ...prev,
      experience:
        prev.experience?.map((exp, i) =>
          i === expIndex
            ? {
                ...exp,
                bulletPoints: [...(exp.bulletPoints || []), ''],
              }
            : exp
        ) || [],
    }));
  };

  const removeBulletPoint = (expIndex, bulletIndex) => {
    setEditedData((prev) => ({
      ...prev,
      experience:
        prev.experience?.map((exp, i) =>
          i === expIndex
            ? {
                ...exp,
                bulletPoints:
                  exp.bulletPoints?.filter((_, j) => j !== bulletIndex) || [],
              }
            : exp
        ) || [],
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingSection(null);
    if (onSave) onSave(editedData);
    if (onEditModeChange) onEditModeChange(false);
  };

  const handleCancel = () => {
    const parsedData = parseCvData(cvData);
    setEditedData({
      fullName: parsedData.fullName || '',
      contact: parsedData.contact || {},
      professional_summary:
        parsedData.professional_summary || parsedData.professionalSummary || '',
      experience: parsedData.experience || [],
      projects: parsedData.projects || [],
      education: parsedData.education || [],
      skills: parsedData.skills || [],
    });
    setIsEditing(false);
    setEditingSection(null);
    if (onEditModeChange) onEditModeChange(false);
  };

  const handleEditClick = (section) => {
    setIsEditing(true);
    setEditingSection(section);
    if (onEditModeChange) onEditModeChange(true);
  };

  const displayData = isEditing ? editedData : parsedCvData;

  const normalizedData = {
    fullName: displayData.fullName || '',
    contact: displayData.contact || {},
    professional_summary:
      displayData.professional_summary || displayData.professionalSummary || '',
    experience: Array.isArray(displayData.experience) ? displayData.experience : [],
    projects: Array.isArray(displayData.projects) ? displayData.projects : [],
    education: Array.isArray(displayData.education) ? displayData.education : [],
    skills: Array.isArray(displayData.skills) ? displayData.skills : [],
  };

  const {
    fullName,
    contact,
    professional_summary,
    experience,
    projects,
    education,
    skills,
  } = normalizedData;

  const isSoftSkill = (skill) => {
    const skillStr = typeof skill === 'string' ? skill.toLowerCase() : '';
    const softSkills = [
      'communication',
      'teamwork',
      'leadership',
      'problem-solving',
      'adaptability',
      'creativity',
      'time management',
      'collaboration',
      'interpersonal',
      'negotiation',
      'critical thinking',
      'emotional intelligence',
      'team player',
      'active listening',
      'conflict resolution',
      'presentation',
      'mentoring',
      'coaching',
      'decision making',
      'strategic thinking',
    ];
    return softSkills.some((softSkill) =>
      skillStr.includes(softSkill.toLowerCase())
    );
  };

  if (isEditing) {
    return (
      <div ref={ref} className={styles['cv-container']}>
        <EditForm
          fullName={fullName}
          contact={contact}
          professional_summary={professional_summary}
          experience={experience}
          projects={projects}
          education={education}
          skills={skills}
          editingSection={editingSection}
          handleInputChange={handleInputChange}
          handleContactChange={handleContactChange}
          handleArrayChange={handleArrayChange}
          handleBulletPointChange={handleBulletPointChange}
          handleExperienceChange={handleExperienceChange}
          addExperience={addExperience}
          addProject={addProject}
          addEducation={addEducation}
          removeItem={removeItem}
          addBulletPoint={addBulletPoint}
          removeBulletPoint={removeBulletPoint}
          handleSave={handleSave}
          handleCancel={handleCancel}
          isSoftSkill={isSoftSkill}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={styles['cv-container']}>
      <CVHeader 
        fullName={fullName} 
        contact={contact} 
        onEditClick={() => handleEditClick('header')}
      />
      
      <CVSummary 
        professional_summary={professional_summary} 
        onEditClick={() => handleEditClick('summary')}
      />
      
      {skills && skills.length > 0 && (
        <CVSkills 
          skills={skills} 
          isSoftSkill={isSoftSkill} 
          onEditClick={() => handleEditClick('skills')}
        />
      )}
      
      <CVExperience 
        experience={experience} 
        onEditClick={() => handleEditClick('experience')}
      />
      
      {projects && projects.length > 0 && (
        <CVProjects 
          projects={projects} 
          onEditClick={() => handleEditClick('projects')}
        />
      )}
      
      {education && education.length > 0 && (
        <CVEducation 
          education={education} 
          onEditClick={() => handleEditClick('education')}
        />
      )}
    </div>
  );
});

export default CVPreview;