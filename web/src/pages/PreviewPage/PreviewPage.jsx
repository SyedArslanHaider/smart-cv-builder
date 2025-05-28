import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Header from '../../components/Header/Header.jsx';
import CVPreview from '../../components/CVPreview/CVPreview.jsx';
import styles from './PreviewPage.module.css';

const PreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();
  console.log('printRef:', printRef.current);

  let cvData = state?.cvData;

//   if (!cvData) {
//   navigate('/'); // or navigate('/') if that's your home
//   return null; // Don't render anything while navigating
// }

  // 👇 Provide fallback dummy data if cvData is missing
  if (!cvData) {
    console.warn('No CV data found in state. Using fallback sample.');
    cvData = {
      fullName: 'racheal ehiwe',
      contact: { email: 'email : racheal.ehiwe@gmail.com', phone: 'phone:122346789',github: 'racheal.github',
      linkedin: 'linkedin: racheal.linkedin.com',portfolio: 'racheal.com',},
      experience: [],
      projects: [],
      education: [],
      yourProfile_vs_jobCriteria: '',
    };
  }

  const handlePrint = useReactToPrint({
    content: () => {
      console.log('Attempting to print', printRef.current);
      return printRef.current;
    },
    documentTitle: `${cvData.fullName || 'CV'}`,
  });

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <CVPreview data={cvData} ref={printRef} />
        <div className={styles.downloadButtonContainer}>
          <button onClick={handlePrint} className={styles.button}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
