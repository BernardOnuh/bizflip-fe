import React, { useEffect } from 'react';
import { Card } from '@mui/material';
import Footer from '../Footer/footer'
import Header from '../Header'
import styles from './styles.module.scss';

const BrochurePage = () => {
  useEffect(() => {
    // Equivalent actions to Redux
    toggleSearchbar(false);
    updateCategoryFilter(null);
  }, []);

  const toggleSearchbar = (isVisible) => {
    // Logic to hide the searchbar
  };

  const updateCategoryFilter = (filter) => {
    // Logic to update the category filter
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.contentArea}>
              <div className={styles.bodyText}>Estimated Valuation Range.</div>
              <div className={styles.bodyContentText}>$13,537,620</div>
              <Card variant="outlined" className={styles.dashboardCard}>
                <div>
                  <h1 className={styles.dashboardCardTitle}>
                    Your Business Dashboard
                  </h1>
                  <h2 style={{ textAlign: 'left' }}>Website</h2>
                  <p style={{ textAlign: 'left' }}>
                    A 5 year old content business in the home and garden
                    industry earning $462,962 per month.
                  </p>
                  <div className={styles.dashboardTags}>
                    <div className={styles.dashboardTag}>Content</div>
                    <div className={styles.dashboardTag}>Home And Garden</div>
                  </div>
                  <div className={styles.assetDetail}>
                    <div className={styles.assetItem}>
                      <p>Site Age</p>
                      <p>Monthly Profit</p>
                    </div>
                    <div className={styles.assetItem}>
                      <p>Monthly Profit</p>
                      <p>USD $458,333 /mo</p>
                    </div>
                    <div className={styles.assetItem}>
                      <p>Profit Margin</p>
                      <p>99%</p>
                    </div>
                    <div className={styles.assetItem}>
                      <p>Profit Multiple</p>
                      <p>2.5x</p>
                    </div>
                    <div className={styles.assetItem}>
                      <p>Revenue Multiple</p>
                      <p>2.4x</p>
                    </div>
                  </div>

                  <div className={styles.assetAbout}>
                    <h2>About the business</h2>
                    <p>
                      This 5 year old content business is earning $462,962 per
                      month.
                    </p>
                    <p>
                      With a profit margin of 99%, it is priced at a 2.5x
                      multiple.
                    </p>
                  </div>

                  <div className={styles.assetExpense}>
                    <h2>Primary expenses</h2>
                    <p>Expenses last month: USD $4,629 /month</p>
                    <p>
                      With a profit margin of 99%, it is priced at a 2.5x
                      multiple.
                    </p>
                  </div>

                  <div className={styles.finalStats}>
                    <h2>Financial Statistics</h2>
                    <div className={styles.annualStats}>
                      <div className={styles.annualData}>
                        <div>
                          <p>Annual Revenue</p>
                          <p>USD $5,555,544</p>
                        </div>
                        <div>
                          <p>Annual Profit</p>
                          <p>USD $5,499,996</p>
                        </div>
                      </div>
                      <div className={styles.annualData}>
                        <div>
                          <p>Profit Margin</p>
                          <p>99%</p>
                        </div>
                        <div>
                          <p>Profit Multiple</p>
                          <p>2.5x</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.annualStats}>
                      <div className={styles.annualData}>
                        <div>
                          <p>Monthly Revenue</p>
                          <p>USD $462,962 AVG</p>
                        </div>
                        <div>
                          <p>Monthly Profit</p>
                          <p>USD $458,333 AVG</p>
                        </div>
                      </div>
                      <div className={styles.annualData}>
                        <div>
                          <p>Revenue Multiple</p>
                          <p>2.4x</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrochurePage;
