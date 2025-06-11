import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './PreviewPage.module.css';
import Header from '../../components/Header/Header.jsx';
import CVPreview from '../../components/CVPreview/CVPreview.jsx';

const PreviewPage = () => {
  const { state } = useLocation();
  const printRef = useRef();

  const [isPrinting, setIsPrinting] = useState(false);
  const { cvData, personalInfo } = state || {};

  const [currentCvData, setCurrentCvData] = useState(() => cvData || null);
  const [currentPersonalInfo] = useState(() => personalInfo || {});
  const promiseResolveRef = useRef(null);


  if (!currentCvData) {
  return (
    <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>
      <h2>Something went wrong.</h2>
      <p>We couldn’t load your enhanced CV. Please try again.</p>
    </div>
  );
}
  const transformedCvData = {
  fullName: currentPersonalInfo?.fullName || '',
  contact: {
    email: currentPersonalInfo?.email || '',
    phone: currentPersonalInfo?.phone || '',
    linkedin: currentPersonalInfo?.linkedin || '',
    github: currentPersonalInfo?.github || '',
    portfolio: currentPersonalInfo?.portfolio || ''
  },
  professional_summary: currentCvData?.professionalSummary || '',
  skills: currentCvData?.skills || [],
  experience: currentCvData?.experience || [],
  projects: currentCvData?.projects || [],
  education: currentCvData?.education || [],
  yourProfile_vs_jobCriteria: currentCvData?.yourProfile_vs_jobCriteria || ''
};


  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handleCvSave = (updatedCvData) => {
    setCurrentCvData(updatedCvData);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${currentCvData?.fullName || 'CV'}_CV`,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      promiseResolveRef.current = null;
      setIsPrinting(false);
    }
  });

  if (!currentCvData) return null;

  return (
    <div>
      <Header />
      <div className={styles.container}>
      <CVPreview 
        ref={printRef} 
        cvData={transformedCvData}
        personalInfo={currentPersonalInfo}
        onSave={handleCvSave}
      />
      </div>
      <div className={styles.downloadButtonContainer}>
        <button onClick={handlePrint} className={styles.button}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
