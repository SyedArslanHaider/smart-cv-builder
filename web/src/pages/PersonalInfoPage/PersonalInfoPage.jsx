import React from 'react';
import Header from '../../components/Header/Header.jsx';
import PersonalInfoForm from '../../components/PersonalInfo/PersonalInfoForm';
import LeftPane from '../../components/LeftPane/LeftPane.jsx';
import styles from './PersonalInfoPage.module.css';

const PersonalInfoPage = () => {
  return (
    <>
      <div className={styles.headercontainer}>
        <Header />
      </div>

      <main className={styles.pagecontainer}>
        <div className={styles.leftcontainer}>
          <div>
            <LeftPane />
          </div>
        </div>

        <div className={styles.formcontainer}>
          <div>
            <PersonalInfoForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default PersonalInfoPage;
