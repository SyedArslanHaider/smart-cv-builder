import React, { useState, useEffect } from 'react';
import styles from './CVPreview.module.css';

const CVPreview = React.forwardRef(({ cvData, onSave, personalInfo ,onEditModeChange }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

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
        parsedData.professionalSummary || parsedData.professional_summary || '',
      experience: experienceArray,
      projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
      education: Array.isArray(parsedData.education)
        ? parsedData.education
        : [],
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
    if (onSave) onSave(editedData);
    if (onEditModeChange) onEditModeChange(false);
  };

  const handleCancel = () => {
    const parsedData = parseCvData(cvData);
    setEditedData({
      fullName: parsedData.fullName || '',
      contact: parsedData.contact || {},
      professional_summary: parsedData.professional_summary || parsedData.professionalSummary || '',
      experience: parsedData.experience || [],
      projects: parsedData.projects || [],
      education: parsedData.education || [],
      skills: parsedData.skills || [],
    });
    setIsEditing(false);
    if (onEditModeChange) onEditModeChange(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (onEditModeChange) onEditModeChange(true);
  };

  const displayData = isEditing ? editedData : parsedCvData;

  const normalizedData = {
    fullName: displayData.fullName || '',
    contact: displayData.contact || {},
    professional_summary:
      displayData.professional_summary || displayData.professionalSummary || '',
    experience: Array.isArray(displayData.experience)
      ? displayData.experience
      : [],
    projects: Array.isArray(displayData.projects) ? displayData.projects : [],
    education: Array.isArray(displayData.education)
      ? displayData.education
      : [],
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
        <div className={`${styles['button-container']} ${styles['no-print']}`}>
          <button onClick={handleSave} className={styles['save-button']}>
            Save Changes
          </button>
          <button onClick={handleCancel} className={styles['cancel-button']}>
            Cancel
          </button>
        </div>

        <div className={styles['form-group']}>
          <label className={styles.label}>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles['contact-section']}>
          <h3 className={styles['section-title']}>Contact Information</h3>
          {['email', 'phone', 'linkedin', 'github', 'portfolio'].map(
            (field) => (
              <div key={field} className={styles['small-form-group']}>
                <label className={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type="text"
                  value={contact[field] || ''}
                  onChange={(e) => handleContactChange(field, e.target.value)}
                  className={styles.input}
                />
              </div>
            )
          )}
        </div>

        <div className={styles['form-group']}>
          <label className={styles.label}>Professional Summary:</label>
          <textarea
            value={professional_summary}
            onChange={(e) =>
              handleInputChange('professional_summary', e.target.value)
            }
            className={styles.textarea}
          />
        </div>

        <div>
          <h3 className={styles['section-title']}>Experience</h3>
          {experience.map((exp, expIndex) => (
            <div key={expIndex} className={styles['section-container']}>
              <div className={styles['form-group']}>
                <label className={styles.label}>Company:</label>
                <input
                  value={exp.companyName || ''}
                  onChange={(e) =>
                    handleExperienceChange(
                      expIndex,
                      'companyName',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles.label}>Position:</label>
                <input
                  value={exp.jobTitle || ''}
                  onChange={(e) =>
                    handleExperienceChange(expIndex, 'jobTitle', e.target.value)
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles.label}>Start Date:</label>
                <input
                  value={exp.startDate || ''}
                  onChange={(e) =>
                    handleExperienceChange(
                      expIndex,
                      'startDate',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles.label}>End Date:</label>
                <input
                  value={exp.endDate || ''}
                  onChange={(e) =>
                    handleExperienceChange(expIndex, 'endDate', e.target.value)
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['form-group']}>
                <label className={styles.label}>Bullet Points:</label>
                {exp.bulletPoints?.map((point, bulletIndex) => (
                  <div
                    key={bulletIndex}
                    className={styles['bullet-point-container']}
                  >
                    <textarea
                      value={point}
                      onChange={(e) =>
                        handleBulletPointChange(
                          expIndex,
                          bulletIndex,
                          e.target.value
                        )
                      }
                      className={styles['small-textarea']}
                    />
                    <button
                      onClick={() => removeBulletPoint(expIndex, bulletIndex)}
                      className={styles['remove-button']}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addBulletPoint(expIndex)}
                  className={styles['add-button']}
                >
                  Add Bullet Point
                </button>
              </div>
              <button
                onClick={() => removeItem('experience', expIndex)}
                className={styles['remove-button']}
              >
                Remove Experience
              </button>
            </div>
          ))}
          <button onClick={addExperience} className={styles['add-button']}>
            Add Experience
          </button>
        </div>

        <div className={styles['form-group']}>
          <label className={styles.label}>Skills (comma separated):</label>
          <textarea
            value={skills.join(', ')}
            onChange={(e) => {
              const newSkills = e.target.value
                .split(',')
                .map((skill) => skill.trim())
                .filter((skill) => skill);
              handleInputChange('skills', newSkills);
            }}
            className={styles.textarea}
            placeholder="Enter skills separated by commas"
          />
        </div>

        <div>
          <h3 className={styles['section-title']}>Projects</h3>
          {projects.map((project, index) => (
            <div key={index} className={styles['section-container']}>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Project Name:</label>
                <input
                  type="text"
                  value={project.name || ''}
                  onChange={(e) =>
                    handleArrayChange('projects', index, 'name', e.target.value)
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Description:</label>
                <textarea
                  value={project.description || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'projects',
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  className={styles['small-textarea']}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Deployed Website:</label>
                <input
                  type="text"
                  value={project.deployedLink || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'projects',
                      index,
                      'deployedLink',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>GitHub Link:</label>
                <input
                  type="text"
                  value={project.githubLink || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'projects',
                      index,
                      'githubLink',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Technologies Used:</label>
                <input
                  type="text"
                  value={project.technologiesUsed?.join(', ') || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'projects',
                      index,
                      'technologiesUsed',
                      e.target.value.split(',').map((tech) => tech.trim())
                    )
                  }
                  className={styles.input}
                />
              </div>
              <button
                onClick={() => removeItem('projects', index)}
                className={styles['remove-button']}
              >
                Remove Project
              </button>
            </div>
          ))}
          <button onClick={addProject} className={styles['add-button']}>
            Add Project
          </button>
        </div>

        <div>
          <h3 className={styles['section-title']}>Education</h3>
          {education.map((edu, index) => (
            <div key={index} className={styles['section-container']}>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Program:</label>
                <input
                  type="text"
                  value={edu.program || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'education',
                      index,
                      'program',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Institution:</label>
                <input
                  type="text"
                  value={edu.institution || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'education',
                      index,
                      'institution',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>Start Date:</label>
                <input
                  type="text"
                  value={edu.startDate || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'education',
                      index,
                      'startDate',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>End Date:</label>
                <input
                  type="text"
                  value={edu.endDate || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'education',
                      index,
                      'endDate',
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
              </div>
              <div className={styles['small-form-group']}>
                <label className={styles.label}>highlights:</label>
                <textarea
                  value={edu.highlights || ''}
                  onChange={(e) =>
                    handleArrayChange(
                      'education',
                      index,
                      'highlights',
                      e.target.value
                    )
                  }
                  className={styles['small-textarea']}
                />
              </div>
              <button
                onClick={() => removeItem('education', index)}
                className={styles['remove-button']}
              >
                Remove Education
              </button>
            </div>
          ))}
          <button onClick={addEducation} className={styles['add-button']}>
            Add Education
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={styles['cv-container']}>
      <div className={`${styles['button-container']} ${styles['no-print']}`}>
        <button
          onClick={handleEditClick}
          className={styles['update-button']}
        >
          Update CV
        </button>
      </div>

      <div className={styles['name-section']}>
        <h1 className={styles['cv-title']}>
          {fullName || 'Professional Profile'}
        </h1>
        <div className={styles['personal-details']}>
          {contact.email && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>Email: </span>
              {contact.email}
            </p>
          )}
          {contact.phone && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>Phone: </span>
              +34 {contact.phone}
            </p>
          )}
          {contact.linkedin && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>LinkedIn: </span>
              <a
                href={
                  contact.linkedin.startsWith('http')
                    ? contact.linkedin
                    : `https://${contact.linkedin}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                {contact.linkedin.replace(
                  /^https?:\/\/(www\.)?linkedin\.com\//i,
                  'linkedin.com/'
                )}
              </a>
            </p>
          )}
          {contact.github && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>GitHub: </span>
              <a
                href={
                  contact.github.startsWith('http')
                    ? contact.github
                    : `https://github.com/${contact.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                {contact.github.replace(
                  /^https?:\/\/(www\.)?github\.com\//i,
                  'github.com/'
                )}
              </a>
            </p>
          )}
          {contact.portfolio && (
            <p className={styles['contact-info']}>
              <span className={styles['contact-label']}>Portfolio: </span>
              <a
                href={
                  contact.portfolio.startsWith('http')
                    ? contact.portfolio
                    : `https://${contact.portfolio}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-link']}
              >
                {contact.portfolio.replace(/^https?:\/\//i, '').split('/')[0]}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles['section-header']}>Professional Summary</h2>
        <div className={styles['summary-content']}>
          {professional_summary.split('\n').map((paragraph, index) => (
            <p key={index} className={styles['summary-paragraph']}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {skills && skills.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles['section-header']}>Skills</h2>
          <div className={styles['skills-container']}>
            <div className={styles['skills-column']}>
              <h3 className={styles['skills-subheader']}>Technical Skills</h3>
              <div className={styles['skills-list']}>
                {skills
                  .filter((skill) => !isSoftSkill(skill))
                  .map((skill, index) => (
                    <span
                      key={`technical-${index}`}
                      className={styles['skill-item']}
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>
            <div className={styles['skills-column']}>
              <h3 className={styles['skills-subheader']}>Soft Skills</h3>
              <div className={styles['skills-list']}>
                {skills.filter(isSoftSkill).map((skill, index) => (
                  <span key={`soft-${index}`} className={styles['skill-item']}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles['section-header']}>Professional Experience</h2>
        {experience && experience.length > 0 ? (
          experience.map((exp, index) => (
            <div key={index} className={styles['experience-item']}>
              <div className={styles['experience-header']}>
                <div>
                  <h3 className={styles['job-title']}>{exp.jobTitle}</h3>
                  <div className={styles['company-info']}>
                    <span className={styles['company-name']}>
                      {exp.companyName}
                    </span>
                    {(exp.startDate || exp.endDate) && (
                      <span className={styles['job-duration']}>
                        {exp.startDate} - {exp.endDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {exp.bulletPoints && exp.bulletPoints.length > 0 ? (
                <ul className={styles['responsibilities-list']}>
                  {exp.bulletPoints.map((point, i) => (
                    <li key={i} className={styles['responsibility-item']}>
                      {point}
                    </li>
                  ))}
                </ul>
              ) : exp.description ? (
                <div className={styles['job-description']}>
                  {exp.description.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className={styles['job-paragraph']}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p className={styles['no-data']}>No experience data available</p>
        )}
      </div>

      {projects && projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles['section-header']}>Projects</h2>
          <div className={styles['projects-list']}>
            {projects.map((project, index) => (
              <div key={index} className={styles['project-item']}>
                <h3 className={styles['project-name']}>
                  {project.name || 'Project Name Not Specified'}
                </h3>
                {project.description && (
                  <div className={styles['project-description']}>
                    {project.description
                      .split('\n')
                      .map((paragraph, pIndex) => (
                        <p key={pIndex} className={styles['project-paragraph']}>
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
                <div className={styles['project-links-container']}>
                  {project.deployedLink && (
                    <a
                      href={
                        project.deployedLink.startsWith('http')
                          ? project.deployedLink
                          : `https://${project.deployedLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['project-link']}
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={
                        project.githubLink.startsWith('http')
                          ? project.githubLink
                          : `https://github.com/${project.githubLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['project-link']}
                    >
                      GitHub
                    </a>
                  )}
                </div>
                {project.technologiesUsed &&
                  project.technologiesUsed.length > 0 && (
                    <div className={styles['technologies-container']}>
                      <span className={styles['technologies-label']}>
                        Technologies:{' '}
                      </span>
                      <div className={styles['technologies-list']}>
                        {project.technologiesUsed.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={styles['technology-tag']}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles['section-header']}>Education</h2>
          <div className={styles['education-list']}>
            {education.map((edu, index) => (
              <div key={index} className={styles['education-item']}>
                <h3 className={styles['degree-info']}>
                  {edu.program || 'Program Not Specified'}
                </h3>
                <div className={styles['institution-info']}>
                  {edu.institution || 'Institution Not Specified'}
                </div>
                <div className={styles['education-duration']}>
                  {edu.startDate && (
                    <span className={styles['education-date']}>
                      {edu.startDate}
                    </span>
                  )}
                  {edu.endDate && (
                    <>
                      <span className={styles['education-date-separator']}>
                        {' '}
                        -{' '}
                      </span>
                      <span className={styles['education-date']}>
                        {edu.endDate}
                      </span>
                    </>
                  )}
                </div>
                {edu.highlights && (
                  <div className={styles['education-highlights']}>
                    {edu.highlights.split('\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={styles['education-paragraph']}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default CVPreview;
