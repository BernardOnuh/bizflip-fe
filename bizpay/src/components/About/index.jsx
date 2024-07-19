import React, { useEffect } from 'react';
import Header from 'components/header';
import Footer from '../Footer/footer';
import LearnMore from './LearnMore';

import styles from './styles.module.scss';

const AboutPage = () => {
  useEffect(() => {
    // Any other side effects you might need
  }, []); 

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div>
          <LearnMore />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
