import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './PreviewPage.module.css';
import Header from '../../components/Header/Header.jsx';

const PreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  const cvData = state?.cvData;

  if (!cvData) {
    navigate('/');
    return null;
  }

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${cvData.fullName}_CV`,
  });

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div ref={printRef} className={styles.preview}>
          <h1>{cvData.fullName}</h1>
          <p>{cvData.contact.email} | {cvData.contact.phone}</p>
          <p>{cvData.contact.linkedin}</p>
          <p>{cvData.contact.github}</p>
          <p>{cvData.contact.portfolio}</p>

          <h2>Summary</h2>
          <p>{cvData.professional_summary}</p>

          <h2>Experience</h2>
          <ul>
            {cvData.experience.map((exp, i) => <li key={i}>{exp}</li>)}
          </ul>

          <h2>Projects</h2>
          <ul>
            {cvData.projects.map((proj, i) => <li key={i}>{proj}</li>)}
          </ul>

          <h2>Education</h2>
          <ul>
            {cvData.education.map((edu, i) => <li key={i}>{edu}</li>)}
          </ul>

          <h2>Profile vs Job</h2>
          <p>{cvData.yourProfile_vs_jobCriteria}</p>
        </div>

        <div className={styles.downloadButtonContainer}>
          <button onClick={handlePrint} className={styles.button}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};



export default PreviewPage;
