import React from 'react'; // Import React only once
import Link from 'next/link';
import { Card, CardContent, Typography } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import Footer from '../Footer/footer';
import styles from './styles.module.scss';

const dummyBrokerList = [
  {
    name: 'bizflip',
    specialist: 'E-Commerce asset digital assets, saas, digital businesses',
    address: 'United States',
    desc: 'We now offer our very own representation as well, premier premium service for all our users Representing businesses of all shapes and sizes.',
    id: '1',
    link: '/contactUs',
  },
  {
    name: 'VR Business Brokers',
    price: '$150,000 - $5,000,000',
    specialist: 'Brick & Motor Assets',
    address: 'United States',
    desc: 'Schedule an appointment with VR Business Broker of Charlotte Today',
    id: '2',
    link: 'https://www.vrbbcharlotte.com',
  },
  {
    name: 'Website Properties',
    price: '$250,000 - $5,000,000',
    specialist: 'E-Commerce, Saas, Services, Marketplace, Advertising',
    address: 'United States',
    desc: 'Website properties is the oldest and trusted digital business brokerage in North America, helping owners of digitally native and tech enabled businesses create their successful exit over 20 years',
    id: '3',
    link: 'https://websiteproperties.com',
  },
];

const BrokerPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.textContainer}>
              <Typography variant="h5" className={styles.bodyText}>
                PICK A BIZFLIP AFFILIATED BROKER TO GET STARTED.
              </Typography>
              <Typography variant="body1" className={styles.bodyText} sx={{ margin: '25px 0' }}>
                Take the stress out of selling, using a broker to help sell your
                asset is a great option for those who are time-poor or simply
                don&apos;t know where to start. A broker will present your asset
                in the best light possible to maximize your sale price.
              </Typography>
              {dummyBrokerList.map(item => (
                <Card variant="outlined" key={item.id} className={styles.dummyBrokerList}>
                  <CardContent className={styles.leftContainer}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography color="textSecondary">{item.address}</Typography>
                    <Typography sx={{ marginTop: '10px' }}>
                      <strong>Specialties:</strong>
                      <span style={{ color: '#63707E', marginLeft: '5px' }}>
                        {item.specialist}
                      </span>
                    </Typography>
                    {item.price && (
                      <Typography>
                        Representing businesses priced between:
                        <span style={{ color: '#63707E', marginLeft: '5px' }}>
                          {item.price}
                        </span>
                      </Typography>
                    )}
                    <Typography color="textSecondary" sx={{ marginTop: '10px' }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                  <CardContent className={styles.rightContainer}>
                    <div className={styles.buttonContainer}>
                      {item.id === '1' ? (
                        <Link href={item.link} legacyBehavior passHref>
                          <a className={styles.exploreButton}>
                            Learn more
                            <div className={styles.icon}>
                              <ChevronRight />
                            </div>
                          </a>
                        </Link>
                      ) : (
                        <a href={item.link} className={styles.exploreButton} target="_blank" rel="noopener noreferrer">
                          Learn more
                          <div className={styles.icon}>
                            <ChevronRight />
                          </div>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrokerPage;
