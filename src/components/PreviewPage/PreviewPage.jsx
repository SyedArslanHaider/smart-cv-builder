import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import styles from './PreviewPage.module.css';
import Header from '../../components/Header/Header.jsx';
import CVPreview from '../../components/CVPreview/CVPreview.jsx';
import { saveFormData, getFormData } from '../../utils/saveData.js';

const PreviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();

  const [isPrinting, setIsPrinting] = useState(false);
  const completeFormData = state?.formData || getFormData();
  const [formValues, setFormValues] = useState(
    () => completeFormData.personalInfo
  );
  const initialCvData = state?.cvData || getFormData();
  const [currentCvData, setCurrentCvData] = useState(initialCvData);
  const [isEditing, setIsEditing] = useState(false);
  const promiseResolveRef = useRef(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const handleCvSave = (updatedCvData) => {
    setCurrentCvData(updatedCvData);
    saveFormData(updatedCvData);
    setFormValues(updatedCvData);
    setIsEditing(false);
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
    },
  });

  const handleEditModeChange = (editing) => {
    setIsEditing(editing);
  };

  if (!currentCvData) {
    navigate('/');
    return null;
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <CVPreview
          ref={printRef}
          cvData={currentCvData}
          onSave={handleCvSave}
          personalInfo={formValues}
          onEditModeChange={handleEditModeChange}
        />
      </div>
      {!isEditing && (
        <div className={styles.downloadButtonContainer}>
          <button onClick={handlePrint} className={styles.button}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewPage;
