import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter } from 'next/router'; // Use Next.js router
import cx from 'classnames';
import { ClipLoader } from 'react-spinners';
import Modal from '@mui/material/Modal'; 
import Skeleton from 'react-loading-skeleton';
import { Oval } from 'react-loader-spinner';
import Select from 'react-dropdown-select';

import SuspenseImg from '../SuspenseImg';
import PriceInput from '../PriceInput';
// Removed useApi, useBundleSalesContract, useNFTContract, useTokens, useSalesContract, toast
// Removed all Web3-related hooks and contracts
import closeIcon from '../../../public/images/svgs/close.svg';
import styles from './styles.module.scss';
import commonStyles from '../Modal/common.module.scss';

const NFTItem = ({ item, selected, onClick }) => {
  // Removed useApi

  return (
    <div
      className={cx(styles.item, selected && styles.selected)}
      onClick={onClick}
    >
      <div className={styles.imageBox}>
        {!item ? (
          <Skeleton
            width="100%"
            height="100%"
            className={styles.mediaLoading}
          />
        ) : (
          (item?.imageURL || item?.thumbnailPath?.length > 10) && (
            <Suspense
              fallback={
                <Oval
                color="#007BFF"
               height={32}
               width={32}
              className={styles.loader}
            />
              }
            >
              <SuspenseImg
                src={item.imageURL}
                className={styles.media}
                alt={item.name}
              />
            </Suspense>
          )
        )}
      </div>
      <div className={styles.itemName}>
        {item ? item.name : <Skeleton width={150} height={24} />}
      </div>
    </div>
  );
};

const NewBundleModal = ({ visible, onClose, onCreateSuccess = () => {} }) => {
  // Removed useTokens, useWeb3React, useSalesContract, useParams, useApi, useNFTContract, useBundleSalesContract
  // Dummy data for tokens and static details
  const payTokens = [
    { symbol: 'ETH', address: '0x123', decimals: 18, icon: '/path/to/icon.png' },
  ];

  const router = useRouter();
  const { id: uid } = router.query; // Use Next.js router

  const rootRef = useRef(null);

  const selected = useRef([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [creating, setCreating] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);

  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(0);
  const tokens = useRef([]);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [paySelected, setPaySelected] = useState([]);
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenPriceInterval, setTokenPriceInterval] = useState();

  // Dummy authToken
  const authToken = 'dummyAuthToken';

  const fetchNFTs = async (step) => {
    if (fetching) return;

    setFetching(true);
    setCount(0);

    try {
      // Dummy data for NFTs
      const data = {
        tokens: [
          {
            name: 'NFT 1',
            imageURL: '/path/to/image1.png',
            contractAddress: '0xABC',
            tokenID: 1,
            holderSupply: 1,
          },
          {
            name: 'NFT 2',
            imageURL: '/path/to/image2.png',
            contractAddress: '0xDEF',
            tokenID: 2,
            holderSupply: 1,
          },
        ],
        total: 2,
      };
      setFetching(false);
      tokens.current.push(...data.tokens);
      setCount(data.total);
      setPage(step);
    } catch {
      setFetching(false);
    }
  };

  const loadNextPage = () => {
    if (fetching) return;
    if (tokens.current.length === count) return;

    fetchNFTs(page + 1);
  };

  useEffect(() => {
    if (visible) {
      selected.current = [];
      setName('');
      setPrice('');
      tokens.current = [];
      setCount(0);
      fetchNFTs(0);

      if (payTokens?.length) {
        setPaySelected([payTokens[0]]);
      }
    }
  }, [visible]);

  useEffect(() => {
    if (payTokens?.length) {
      setOptions(payTokens);
    }
  }, [payTokens]);

  const getTokenPrice = () => {
    if (tokenPriceInterval) clearInterval(tokenPriceInterval);
    const func = () => {
      // Dummy token price
      const price = 100; // Assume $100 for the token
      setTokenPrice(price);
    };
    func();
    setTokenPriceInterval(setInterval(func, 60 * 1000));
  };

  useEffect(() => {
    if (paySelected.length === 0) return;

    getTokenPrice();
  }, [paySelected]);

  const getContractApprovedStatus = () => {
    setLoadingStatus(true);
    setApproved(true);
    setLoadingStatus(false);
  };

  const isValid = () => {
    return name && price && parseFloat(price) > 0 && selected.current.length;
  };

  const closeModal = () => {
    onClose();
  };

  const handleScroll = (e) => {
    const obj = e.currentTarget;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      loadNextPage();
    }
  };

  const handleItemClick = (idx) => {
    const index = selected.current.indexOf(idx);
    if (index > -1) {
      selected.current.splice(index, 1);
    } else {
      selected.current.push(idx);
    }
    getContractApprovedStatus();
  };

  const onApprove = () => {
    setApproving(true);
    setApproved(true);
    setApproving(false);
  };

  const onCreate = () => {
    if (creating) return;

    setCreating(true);

    setTimeout(() => {
      setCreating(false);
      closeModal();
      onCreateSuccess();
    }, 2000); // Simulate bundle creation delay
  };

  if (!visible) return null;

  return (
    <div className={styles.root} ref={rootRef}>
      <Modal open className={styles.modal} container={() => rootRef.current}>
        <div className={styles.paper}>
          <div className={styles.header}>
            <div className={styles.title}>Create Bundle</div>
            <div className={styles.closeButton} onClick={onClose}>
              <img src={closeIcon} />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.formGroup}>
              <p className={styles.formLabel}>Name</p>
              <div className={styles.formInputCont}>
                <input
                  type="text"
                  className={styles.formInput}
                  maxLength={20}
                  placeholder="Bundle Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={creating}
                />
              </div>
              <div className={styles.lengthIndicator}>{name.length}/20</div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formLabel}>Price</div>
              <div className={styles.formInputCont}>
                <Select
                  options={options}
                  disabled={creating}
                  values={paySelected}
                  onChange={(tk) => {
                    setPaySelected(tk);
                  }}
                  className={commonStyles.select}
                  placeholder=""
                  itemRenderer={({ item, itemIndex, methods }) => (
                    <div
                      key={itemIndex}
                      className={commonStyles.token}
                      onClick={() => {
                        methods.clearAll();
                        methods.addItem(item);
                      }}
                    >
                      <img
                        src={item?.icon}
                        className={commonStyles.tokenIcon}
                      />
                      <div className={commonStyles.tokenSymbol}>
                        {item.symbol}
                      </div>
                    </div>
                  )}
                  contentRenderer={({ props: { values } }) =>
                    values.length > 0 ? (
                      <div className={commonStyles.selectedToken}>
                        <img
                          src={values[0]?.icon}
                          className={commonStyles.tokenIcon}
                        />
                        <div className={commonStyles.tokenSymbol}>
                          {values[0].symbol}
                        </div>
                      </div>
                    ) : (
                      <div className={commonStyles.selectedToken} />
                    )
                  }
                />
                <PriceInput
                  className={styles.formInput}
                  placeholder="0.00"
                  value={'' + price}
                  onChange={setPrice}
                  disabled={creating}
                />
              </div>
            </div>
            <div className={styles.nftItemsCont} onScroll={handleScroll}>
              {tokens.current.length ? (
                tokens.current.map((item, idx) => (
                  <NFTItem
                    item={item}
                    key={idx}
                    selected={selected.current.includes(idx)}
                    onClick={() => handleItemClick(idx)}
                  />
                ))
              ) : (
                <div className={styles.noNFTs}>
                  {fetching ? (
                    <>
                      <Skeleton className={styles.loadingItem} />
                      <Skeleton className={styles.loadingItem} />
                      <Skeleton className={styles.loadingItem} />
                      <Skeleton className={styles.loadingItem} />
                    </>
                  ) : (
                    'No items'
                  )}
                </div>
              )}
            </div>
            <div className={styles.btnCont}>
              <div
                className={cx(styles.btn, styles.primary)}
                onClick={onCreate}
              >
                <ClipLoader
                  color={'#ffffff'}
                  loading={creating}
                  size={18}
                />
                {!creating && 'Create'}
              </div>
              <div className={cx(styles.btn, styles.secondary)} onClick={onClose}>
                Cancel
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewBundleModal;
