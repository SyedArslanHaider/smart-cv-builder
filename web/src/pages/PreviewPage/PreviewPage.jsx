import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import styles from './PreviewPage.module.css';
import Header from '../../components/Header/Header.jsx';
import CVPreview from '../../components/CVPreview.jsx';

const PreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  const [isPrinting, setIsPrinting] = useState(false);
  // Add state to manage the current CV data
  const [currentCvData, setCurrentCvData] = useState(state?.cvData);

  // We store the resolve Promise being used in `onBeforePrint` here
  const promiseResolveRef = useRef(null);

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  // Handler to update CV data when changes are saved
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
      // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null;
      setIsPrinting(false);
    }
  });

  if (!currentCvData) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {/* Pass the current CV data and the save handler */}
        <CVPreview 
          ref={printRef} 
          cvData={currentCvData} 
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