import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { Card } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Link from 'next/link';
import Footer from '../Footer/footer';
import FreeValuation from './freeValuation';
import styles from './styles.module.scss';

const ValuationContext = createContext();

const valuationList = [
  {
    id: '1',
    img: 'https://cdn-icons-png.flaticon.com/128/546/546310.png',
    title: 'Valuation List - Title 1',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: '2',
    img: 'https://cdn-icons-png.flaticon.com/128/5435/5435272.png',
    title: 'Valuation List - Title 2',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    id: '3',
    img: 'https://cdn-icons-png.flaticon.com/128/709/709510.png',
    title: 'Valuation List - Title 3',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
];

const faqs = [
  {
    id: '1',
    question: 'Do I have to pay for this evaluation?',
    answer:
      'Our evaluation tool is free to use, you can use the tool as many times as you like. If you`d like a fee based custom detailed evaluation, you can reach out to <a href="mailto:support@bizflip.io">support@bizflip.io</a>',
  },
  {
    id: '2',
    question: 'Is the bizflip valuation accurate?',
    answer:
      'Yes. Bizflip has more historical sales data than anyone else. If the information you provide is accurate, your bizflip valuation will be a good indicator of your assets monetary value.',
  },
  {
    id: '3',
    question: 'How do we come up with the valuation?',
    answer:
      'Bizflip uses your inputs and compares data to 1000 of similar assets that have sold publicity. We look at modeling, category, age, and many other factors. We will also consider how many buyers are interested in assets like yours along with proprietary processes to provide you with the best opinion of value of your asset.',
  },
  {
    id: '4',
    question: 'How do I sell my asset?',
    answer:
      'If you wish to list your asset for sale or chat with us about your asset, you can either start selling here or send a note to our team at <a href="mailto:support@bizflip.io">support@bizflip.io</a>. We will be happy to provide some additional guidance.',
  },
];

const ValuationProvider = ({ children }) => {
  const [sellUrl, setSellUrl] = useState('');
  const [activeTab, setActiveTab] = useState('free-valuation');

  return (
    <ValuationContext.Provider value={{ sellUrl, setSellUrl, activeTab, setActiveTab }}>
      {children}
    </ValuationContext.Provider>
  );
};

const ValuationPage = () => {
  const router = useRouter();
  const { sellUrl, setSellUrl, activeTab, setActiveTab } = useContext(ValuationContext);

  useEffect(() => {
    // Perform necessary side effects here
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    router.push('sell/generic');
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.mainLeft}>
            <div className={styles.textContainer}>
              <div className={styles.bodyText} style={{ marginTop: '50px' }}>
                HOW MUCH IS YOUR ASSET WORTH?
              </div>
              <div className={styles.valuationSection}>
                <div className={styles.valuationSectionHeading}>
                  <h1>Free evaluation.</h1>
                  <h5>
                    BizFlip makes it simple and effective to sell your asset.
                    Flexibility, choice and access to the world&lsquo;s largest
                    network of online asset buyers.
                  </h5>
                </div>
                <div className={styles.valuationToolsContainer}>
                  <div className={styles.m2}>
                    <div className={styles.tabs}>
                      {[
                        { label: 'Free Valuation', value: 'free-valuation' },
                        { label: 'Sell Directly', value: 'sell-directly' },
                        { label: 'Sell with a Broker', value: 'sell-with-a-broker' },
                      ].map((tab, i) => (
                        <a
                          key={`tab-${i}`}
                          className={classNames(styles.tab, activeTab === tab.value ? styles.active : '')}
                          href="#"
                          onClick={() => setActiveTab(tab.value)}
                        >
                          <div className="tab tab-lg-fixed-width h-100 font-weight-700 mr-2 py-2 tab-primary">
                            {tab.label}
                          </div>
                        </a>
                      ))}
                    </div>
                    {activeTab === 'sell-directly' ? (
                      <>
                        <form id="sell-directly" acceptCharset="UTF-8" onSubmit={onSubmit} className={'ng-pristine ng-valid'}>
                          <input name="utf8" type="hidden" value="✓" autoComplete="off" />
                          <div className={styles.inputContainer}>
                            <input
                              type="url"
                              name="url"
                              placeholder="e.g. mywebsite.com"
                              className="rounded border-0 w-100 p-3"
                              autoComplete="off"
                              value={sellUrl}
                              onChange={(e) => setSellUrl(e.target.value)}
                            />
                          </div>
                          <div className={styles.sellSubmitContainer}>
                            <button type="submit" disabled={!sellUrl} className={styles.sellSubmit}>
                              Continue →
                            </button>
                          </div>
                        </form>
                        <div className={styles.sellInputSubLabel}>
                          Use Play Store or App Store URL for mobile apps.
                        </div>
                      </>
                    ) : activeTab === 'free-valuation' ? (
                      <FreeValuation />
                    ) : (
                      <div className={styles.comingSoon}>
                        <div>Coming Soon</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.valuationFeatureContainer}>
                  <div className={styles.valuationFeatureList}>
                    <div className={styles.valuationFeature}>
                      <img className="mr-2" src="/static/images/icons/check-circle.svg" />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Lowest fees in the market
                      </span>
                    </div>
                    <div className={styles.valuationFeature}>
                      <img className="mr-2" src="/static/images/icons/check-circle.svg" />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Sell in under 30 days
                      </span>
                    </div>
                    <div className={styles.valuationFeature}>
                      <img className="mr-2" src="/static/images/icons/check-circle.svg" />
                      <span className="font-size-medium-small font-weight-bold mr-md-2 mr-lg-5">
                        Free Escrow service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.assetWorth}>
                <Card style={{ padding: '1rem', display: 'none' }} className={styles.assetCard}>
                  <div className={styles.leftContainer}>
                    <div className={styles.package}>package II</div>
                    <div>
                      Get extensive custom valuation with deep market research on what similar assets like yours have sold for, included is a broker&apos;s opinion of value tailored for your specific assets.
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <Link href={`/contactUs`} className={styles.contact}>
                      Contact Us
                      <ArrowCircleRightIcon className={styles.arrow} />
                    </Link>
                  </div>
                </Card>
              </div>
              <div className={styles.textContainer}>
                <div className={styles.bodyText} style={{ marginTop: '50px' }}>
                  FAQ&apos;s
                </div>
                <div className={styles.faqs}>
                  {faqs.map((item) => (
                    <Card key={item.id} style={{ padding: '1rem' }}>
                      <div className={styles.question}>{item.question}</div>
                      <div dangerouslySetInnerHTML={{ __html: item.answer }}></div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
      
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Valuation = () => (
  <ValuationProvider>
    <ValuationPage />
  </ValuationProvider>
);

export default Valuation;
