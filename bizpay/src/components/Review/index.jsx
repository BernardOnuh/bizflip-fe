import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import ClipLoader from 'react-spinners/ClipLoader';
import { Container, Button, TextField, TextareaAutosize } from '@mui/material';

import { Categories } from '../constants/filter.constants';
import { ADMIN_ADDRESS } from '../constants/index';

import webIcon from '../../../public/images/svgs/web.svg';
import discordIcon from '../../../public/images/svgs/discord.svg';
import telegramIcon from '../../../public/images/svgs/telegram.svg';
import twitterIcon from '../../../public/images/svgs/twitter.svg';
import instagramIcon from '../../../public/images/svgs/instagram.svg';
import mediumIcon from '../../../public/images/svgs/medium.svg';
import nftIcon from '../../../public/images/svgs/nft_active.svg';

import styles from './styles.module.scss';

const CollectionCreate = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(null);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [collections, setCollections] = useState([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Dummy fetchCollections to simulate API call
    const fetchCollections = async () => {
      setLoading(true);
      // Simulate fetching data
      setTimeout(() => {
        setCollections([
          {
            logoImageHash: 'dummyhash',
            collectionName: 'Dummy Collection',
            description: 'This is a dummy description',
            royalty: '5%',
            feeRecipient: '0x123',
            categories: ['1', '2'],
            erc721Address: '0xabc',
            siteUrl: 'dummy.com',
            discord: 'dummyDiscord',
            twitterHandle: 'dummyTwitter',
            instagramHandle: 'dummyInstagram',
            mediumHandle: 'dummyMedium',
            telegram: 'dummyTelegram'
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchCollections();
  }, []);

  const selectedCategories = index !== null
    ? Categories.filter(cat => collections[index].categories.includes(cat.id.toString()))
    : [];

  const handleApprove = async () => {
    setApproving(true);
    // Simulate approval process
    setTimeout(() => {
      console.log('Collection Approved');
      setApproving(false);
    }, 1000);
  };

  const handleReject = async () => {
    setRejecting(true);
    // Simulate rejection process
    setTimeout(() => {
      console.log('Collection Rejected');
      setRejecting(false);
    }, 1000);
  };

  return (
    <Container className={styles.container}>
      {loading ? (
        <div className={styles.loadingPanel}>
          <ClipLoader color="#3D3D3D" size={40} />
        </div>
      ) : index === null ? (
        <div className={styles.inner}>
          {collections.map((collection, idx) => (
            <div
              className={styles.collection}
              key={idx}
              onClick={() => setIndex(idx)}
            >
              <img
                src={`https://cloudflare-ipfs.com/ipfs/${collection.logoImageHash}`}
                className={styles.collectionLogo}
              />
              <div className={styles.collectionName}>
                {collection.collectionName}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.inner}>
          <div className={styles.title}>Review Collection</div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Logo image</div>
            <div className={styles.inputWrapper}>
              <div className={styles.logoUploadBox}>
                <img
                  src={`https://cloudflare-ipfs.com/ipfs/${collections[index].logoImageHash}`}
                />
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle1}>Name</div>
            <div className={styles.inputWrapper}>
              <TextField
                className={styles.input}
                value={collections[index].collectionName}
                disabled
                fullWidth
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle1}>Description</div>
            <div className={styles.inputWrapper}>
              <TextareaAutosize
                className={cx(styles.input, styles.longInput)}
                value={collections[index].description}
                disabled
                minRows={4}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle1}>Royalty</div>
            <div className={styles.inputWrapper}>
              <TextField
                className={styles.input}
                value={collections[index].royalty}
                disabled
                fullWidth
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle1}>Fee Recipient</div>
            <div className={styles.inputWrapper}>
              <TextField
                className={styles.input}
                value={collections[index].feeRecipient}
                disabled
                fullWidth
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Category</div>
            <div className={cx(styles.inputWrapper, styles.categoryList)}>
              {selectedCategories.map((cat, idx) => (
                <div className={styles.selectedCategory} key={idx}>
                  <img src={cat.icon} className={styles.categoryIcon} />
                  <span className={styles.categoryLabel}>{cat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle}>Links</div>
            <div className={styles.inputWrapper}>
              <div className={styles.linksWrapper}>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={nftIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`https://explorer.com/address/${collections[index].erc721Address}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={webIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`https://${collections[index].siteUrl}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={discordIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`https://discord.gg/${collections[index].discord}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={twitterIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`@${collections[index].twitterHandle}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={instagramIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`@${collections[index].instagramHandle}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={mediumIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`@${collections[index].mediumHandle}`}
                  </div>
                </div>
                <div className={styles.linkItem}>
                  <div className={styles.linkIconWrapper}>
                    <img src={telegramIcon} className={styles.linkIcon} />
                  </div>
                  <div className={styles.inputPrefix}>
                    {`https://t.me/${collections[index].telegram}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputTitle1}>Reason</div>
            <div className={styles.inputWrapper}>
              <TextareaAutosize
                className={cx(styles.input, styles.longInput)}
                maxLength={500}
                placeholder="Tell them why you rejected their collection"
                value={reason}
                onChange={e => setReason(e.target.value)}
                minRows={4}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div className={styles.actionButton}>
            <Button
              className={styles.secondaryButton}
              disabled={approving || rejecting}
              onClick={handleReject}
            >
              {rejecting ? (
                <ClipLoader color="#FFFFFF" size={14} />
              ) : (
                'Reject'
              )}
            </Button>
            <Button
              className={styles.primaryButton}
              disabled={approving || rejecting}
              onClick={handleApprove}
            >
              {approving ? (
                <ClipLoader color="#FFFFFF" size={14} />
              ) : (
                'Approve'
              )}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CollectionCreate;
