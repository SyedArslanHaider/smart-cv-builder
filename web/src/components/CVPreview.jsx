// components/CVPreview.jsx
import React from 'react';

const CVPreview = React.forwardRef(({ cvData }, ref) => {
    if (!cvData) return <p>No CV data available</p>;

    const { fullName, contact, professional_summary, experience, projects, education } = cvData;

    return (
    <div ref={ref} style={{ padding: '2rem', fontFamily: 'Arial' }}>
        <h1>{fullName}</h1>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>LinkedIn: {contact.linkedin}</p>
        <p>GitHub: {contact.github}</p>
        <p>Portfolio: {contact.portfolio}</p>

        <h2>Professional Summary</h2>
        <p>{professional_summary}</p>

        <h2>Experience</h2>
        <ul>
            {experience.map((exp, index) => (
            <li key={index}>{exp}</li>
            ))}
        </ul>

        <h2>Projects</h2>
        <ul>
            {projects.map((proj, index) => (
            <li key={index}>{proj}</li>
        ))}
        </ul>

        <h2>Education</h2>
        <ul>
            {education.map((edu, index) => (
            <li key={index}>{edu}</li>
        ))}
        </ul>
    </div>
    );
});

export default CVPreview;
