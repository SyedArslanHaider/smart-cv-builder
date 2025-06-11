import React, { useState } from 'react';
import styles from './CVPreview.module.css'


const CVPreview = React.forwardRef(({ cvData, onSave }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(cvData || {});

    if (!cvData) return <p className={styles.noData}>No CV data available</p>;

    const handleInputChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleContactChange = (field, value) => {
        setEditedData(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value
            }
        }));
    };

    const handleArrayChange = (arrayName, index, field, value) => {
        setEditedData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleBulletPointChange = (expIndex, bulletIndex, value) => {
        setEditedData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) => 
                i === expIndex ? {
                    ...exp,
                    bulletPoints: exp.bulletPoints.map((point, j) => 
                        j === bulletIndex ? value : point
                    )
                } : exp
            )
        }));
    };

    const addExperience = () => {
        setEditedData(prev => ({
            ...prev,
            experience: [...(prev.experience || []), {
                position: '',
                company: '',
                date: '',
                bulletPoints: ['']
            }]
        }));
    };

    const addProject = () => {
        setEditedData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), {
                name: '',
                description: ''
            }]
        }));
    };

    const addEducation = () => {
        setEditedData(prev => ({
            ...prev,
            education: [...(prev.education || []), {
                degree: '',
                institution: '',
                year: ''
            }]
        }));
    };

    const removeItem = (arrayName, index) => {
        setEditedData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };

    const addBulletPoint = (expIndex) => {
        setEditedData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) => 
                i === expIndex ? {
                    ...exp,
                    bulletPoints: [...(exp.bulletPoints || []), '']
                } : exp
            )
        }));
    };

    const removeBulletPoint = (expIndex, bulletIndex) => {
        setEditedData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) => 
                i === expIndex ? {
                    ...exp,
                    bulletPoints: exp.bulletPoints.filter((_, j) => j !== bulletIndex)
                } : exp
            )
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        if (onSave) {
            onSave(editedData);
        }
    };

    const handleCancel = () => {
        setEditedData(cvData);
        setIsEditing(false);
    };

    const { fullName, contact, professionalSummary, experience, projects, education, yourProfile_vs_jobCriteria } = isEditing ? editedData : cvData;

    if (isEditing) {
        return (
            <div ref={ref} className={styles.cvContainer}>
                <div className={`${styles.buttonContainer} ${styles.noPrint}`}>
                    <button onClick={handleSave} className={styles.saveButton}>
                        Save Changes
                    </button>
                    <button onClick={handleCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Full Name:</label>
                    <input
                        type="text"
                        value={fullName || ''}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={styles.input}
                    />
                </div>

                <div className={styles.contactSection}>
                    <h3 className={styles.sectionTitle}>Contact Information</h3>
                    {['email', 'phone', 'linkedin', 'github', 'portfolio'].map(field => (
                        <div key={field} className={styles.smallFormGroup}>
                            <label className={styles.label}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}:
                            </label>
                            <input
                                type="text"
                                value={contact?.[field] || ''}
                                onChange={(e) => handleContactChange(field, e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Professional Summary:</label>
                    <textarea
                        value={professionalSummary || ''}
                        onChange={(e) => handleInputChange('professionalSummary', e.target.value)}
                        className={styles.textarea}
                    />
                </div>

                <div>
                    <h3 className={styles.sectionTitle}>Experience</h3>
                    {experience?.map((exp, index) => (
                        <div key={index} className={styles.sectionContainer}>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Position:</label>
                                <input
                                    type="text"
                                    value={exp.position || ''}
                                    onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Company:</label>
                                <input
                                    type="text"
                                    value={exp.company || ''}
                                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Date:</label>
                                <input
                                    type="text"
                                    value={exp.date || ''}
                                    onChange={(e) => handleArrayChange('experience', index, 'date', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Responsibilities:</label>
                                {exp.bulletPoints?.map((point, bulletIndex) => (
                                    <div key={bulletIndex} className={styles.bulletPointContainer}>
                                        <input
                                            type="text"
                                            value={point}
                                            onChange={(e) => handleBulletPointChange(index, bulletIndex, e.target.value)}
                                            className={styles.bulletPointInput}
                                        />
                                        <button 
                                            onClick={() => removeBulletPoint(index, bulletIndex)}
                                            className={styles.smallRemoveButton}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    onClick={() => addBulletPoint(index)}
                                    className={styles.addResponsibilityButton}
                                >
                                    Add Responsibility
                                </button>
                            </div>
                            <button 
                                onClick={() => removeItem('experience', index)}
                                className={styles.removeButton}
                            >
                                Remove Experience
                            </button>
                        </div>
                    ))}
                    <button onClick={addExperience} className={styles.addButton}>
                        Add Experience
                    </button>
                </div>

                <div>
                    <h3 className={styles.sectionTitle}>Projects</h3>
                    {projects?.map((project, index) => (
                        <div key={index} className={styles.sectionContainer}>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Project Name:</label>
                                <input
                                    type="text"
                                    value={project.name || ''}
                                    onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Description:</label>
                                <textarea
                                    value={project.description || ''}
                                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                                    className={styles.smallTextarea}
                                />
                            </div>
                            <button 
                                onClick={() => removeItem('projects', index)}
                                className={styles.removeButton}
                            >
                                Remove Project
                            </button>
                        </div>
                    ))}
                    <button onClick={addProject} className={styles.addButton}>
                        Add Project
                    </button>
                </div>

                <div>
                    <h3 className={styles.sectionTitle}>Education</h3>
                    {education?.map((edu, index) => (
                        <div key={index} className={styles.sectionContainer}>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Degree:</label>
                                <input
                                    type="text"
                                    value={edu.degree || ''}
                                    onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Institution:</label>
                                <input
                                    type="text"
                                    value={edu.institution || ''}
                                    onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.smallFormGroup}>
                                <label className={styles.label}>Year:</label>
                                <input
                                    type="text"
                                    value={edu.year || ''}
                                    onChange={(e) => handleArrayChange('education', index, 'year', e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <button 
                                onClick={() => removeItem('education', index)}
                                className={styles.removeButton}
                            >
                                Remove Education
                            </button>
                        </div>
                    ))}
                    <button onClick={addEducation} className={styles.addButton}>
                        Add Education
                    </button>
                </div>

                {yourProfile_vs_jobCriteria !== undefined && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Profile vs Job Criteria:</label>
                        <textarea
                            value={yourProfile_vs_jobCriteria || ''}
                            onChange={(e) => handleInputChange('yourProfile_vs_jobCriteria', e.target.value)}
                            className={styles.textarea}
                        />
                    </div>
                )}
            </div>
        );
    }

    // Display mode (original rendering logic with CSS classes)
    const renderArray = (array, type) => {
        if (!Array.isArray(array) || array.length === 0) {
            return <li className={styles.noData}>No {type} data available</li>;
        }

        return array.map((item, index) => {
            if (typeof item === 'string') return <li key={index}>{item}</li>;

            if (type === 'experience' && typeof item === 'object') {
                return (
                    <li key={index}>
                        <div className={styles.jobTitle}>{item.position}</div>
                        <div className={styles.companyInfo}>{item.company} ({item.date})</div>
                        {item.bulletPoints && (
                            <ul className={styles.bulletPoints}>
                                {item.bulletPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                );
            }

            if (type === 'projects' && typeof item === 'object') {
                return (
                    <li key={index}>
                        <div className={styles.projectName}>{item.name}</div>
                        <div className={styles.projectDescription}>{item.description}</div>
                    </li>
                );
            }

            if (type === 'education' && typeof item === 'object') {
                return (
                    <li key={index}>
                        <div className={styles.degreeInfo}>{item.degree}</div>
                        <div className={styles.institutionInfo}>{item.institution} ({item.year})</div>
                    </li>
                );
            }

            return <li key={index}>{JSON.stringify(item)}</li>;
        });
    };

    return (
        <div ref={ref} className={styles.cvContainer}>
            {/* This button container will be hidden in print/PDF */}
            <div className={`${styles.buttonContainer} ${styles.noPrint}`}>
                <button 
                    onClick={() => setIsEditing(true)}
                    className={styles.updateButton}
                >
                    Update CV
                </button>
            </div>

            <h1 className={styles.cvTitle}>{fullName}</h1>
            <p className={styles.contactInfo}>Email: {contact?.email}</p>
            <p className={styles.contactInfo}>Phone: {contact?.phone}</p>
            <p className={styles.contactInfo}>LinkedIn: {contact?.linkedin}</p>
            <p className={styles.contactInfo}>GitHub: {contact?.github}</p>
            <p className={styles.contactInfo}>Portfolio: {contact?.portfolio}</p>

            <h2 className={styles.sectionHeader}>Professional Summary</h2>
            <p>{professionalSummary}</p>

            <h2 className={styles.sectionHeader}>Experience</h2>
            <ul className={styles.experienceList}>{renderArray(experience, 'experience')}</ul>

            <h2 className={styles.sectionHeader}>Projects</h2>
            <ul className={styles.projectsList}>{renderArray(projects, 'projects')}</ul>

            <h2 className={styles.sectionHeader}>Education</h2>
            <ul className={styles.educationList}>{renderArray(education, 'education')}</ul>

            {yourProfile_vs_jobCriteria && (
                <div className={styles.profileCriteria}>
                    <h2 className={styles.sectionHeader}>Profile vs Job Criteria</h2>
                    <p>{yourProfile_vs_jobCriteria}</p>
                </div>
            )}
        </div>
    );
});

export default CVPreview;