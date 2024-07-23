import React, { useState } from 'react';
import Card from './Children/Card';
import styles from './styles.module.scss';

const Data = [
  {
    id: 1,
    Plan_status: 'Best Value',
    Total_month: 12,
    Monthly_price: 4.17,
    Saving: 'SAVE 58%',
    days: 'mth',
    Total_price: 49.99,
  },
  {
    id: 2,
    Plan_status: 'Most Popular',
    Total_month: 6,
    Monthly_price: 6.33,
    Saving: 'SAVE 37%',
    days: 'mth',
    Total_price: 37.99,
  },
  {
    id: 3,
    Plan_status: '',
    Total_month: 1,
    Monthly_price: 9.99,
    Saving: 'SAVE 0%',
    days: 'mth',
    Total_price: 9.99,
  },
];

const Subscription = () => {
  const [active, setActive] = useState(2);

  const setActivediv = id => {
    setActive(id);
  };

  const selectPlan = async () => {
    console.log("Selected Plan ID:", active);
    alert("API connection logic is currently disabled.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.subscriptioncard}>
          <div className={styles.card}>
            <div className={styles.subscription_title}>
              <div className={styles.sub_title}>
                Uh-Oh..your swiped out, refuel?
              </div>
              <div>
                <span>Flexible</span> &nbsp;Plans
              </div>
            </div>
            <div className={styles.subscription_details}>
              {Data.map(item => (
                <Card
                  key={item.id}
                  data={item}
                  setActive={setActivediv}
                  activediv={active}
                />
              ))}
            </div>
            <div className={styles.continue_btn}>
              <button onClick={selectPlan}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
