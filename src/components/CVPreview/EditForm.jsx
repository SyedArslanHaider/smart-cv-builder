import styles from './CVPreview.module.css';

const EditForm = ({
  fullName,
  contact,
  professional_summary,
  experience,
  projects,
  education,
  skills,
  editingSection,
  handleInputChange,
  handleContactChange,
  handleArrayChange,
  handleBulletPointChange,
  handleExperienceChange,
  addExperience,
  addProject,
  addEducation,
  removeItem,
  addBulletPoint,
  removeBulletPoint,
  handleSave,
  handleCancel,
  isSoftSkill,
}) => {
  return (
    <>
      <div className={`${styles['button-container']} ${styles['no-print']}`}>
        <button onClick={handleSave} className={styles['save-button']}>
          Save Changes
        </button>
        <button onClick={handleCancel} className={styles['cancel-button']}>
          Cancel
        </button>
      </div>

      {(editingSection === 'header' || editingSection === null) && (
        <>
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
        </>
      )}

      {(editingSection === 'summary' || editingSection === null) && (
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
      )}

      {(editingSection === 'experience' || editingSection === null) && (
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
                    handleExperienceChange(
                      expIndex,
                      'jobTitle',
                      e.target.value
                    )
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
                    handleExperienceChange(
                      expIndex,
                      'endDate',
                      e.target.value
                    )
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
      )}

      {(editingSection === 'skills' || editingSection === null) && (
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
      )}

      {(editingSection === 'projects' || editingSection === null) && (
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
                    handleArrayChange(
                      'projects',
                      index,
                      'name',
                      e.target.value
                    )
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
      )}

      {(editingSection === 'education' || editingSection === null) && (
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
                <label className={styles.label}>Highlights:</label>
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
      )}
    </>
  );
};

export default EditForm;