import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { useAccount, useContractRead } from 'wagmi';
import { formatUnits } from 'viem';
import Skeleton from 'react-loading-skeleton';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { Oval } from 'react-loader-spinner';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactPlayer from 'react-player';
import Image from 'next/image';
import SuspenseImg from '../../components/SuspenseImg';
import BootstrapTooltip from '../BootstrapTooltip';
import { formatNumber, getRandomIPFS } from '../utils';
import useTokens from '../hooks/useTokens';

import iconPlus from '../../../public/images/svgs/plus.svg';
import wFTMLogo from '../../../public/images/imgs/wftm.png';

import styles from './styles.module.scss';

const ONE_MIN = 60;
const ONE_HOUR = ONE_MIN * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;

const BaseCard = ({ item, loading, style, create, onCreate, onLike }) => {
  const { address: userAddress } = useAccount();
  const { getTokenByAddress } = useTokens();
  
  const [now, setNow] = useState(new Date());
  const [fetching, setFetching] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [info, setInfo] = useState(null);
  const [index, setIndex] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [liked, setLiked] = useState(0);
  const [auction, setAuction] = useState(null);

  const { collections } = useSelector(state => state.Collections);
  const { authToken } = useSelector(state => state.ConnectWallet);

  const collection = collections.find(
    col => col.address === item?.contractAddress
  );

  const { data: auctionData, isLoading: isAuctionLoading } = useContractRead({
    address: item.contractAddress,
    abi: [
      // ABI details for auction contract
    ],
    functionName: 'getAuction',
    args: [item.contractAddress, item.tokenID],
  });

  const getTokenURI = async tokenURI => {
    setFetching(true);
    try {
      tokenURI = getRandomIPFS(tokenURI);
      const { data } = await axios.get(tokenURI);
      if (data[Object.keys(data)[0]].image) {
        data.image = getRandomIPFS(data[Object.keys(data)[0]].image);
        data.name = data[Object.keys(data)[0]].name;
      }
      if (data.properties && data.properties.image) {
        data.image = getRandomIPFS(data.properties.image.description);
      }
      setInfo(data);
    } catch {
      setInfo(null);
    }
    setFetching(false);
  };

  useEffect(() => {
    async function fetchMyAPI() {
      if (item && !item.name) {
        await getTokenURI(item.tokenURI);
      }
      if (item) {
        if (item.imageURL) {
          // eslint-disable-next-line require-atomic-updates
          // item.imageURL = getRandomIPFS(item.imageURL);
        }
        setLiked(item.liked);
        if (item.items) {
          setAuction(null);
        } else {
          const token = getTokenByAddress(auctionData?.payToken);
          auctionData.reservePrice = parseFloat(
            formatUnits(auctionData.reservePrice, token.decimals)
          );
          auctionData.token = token;
          setAuction(auctionData);
        }
      }
    }
    fetchMyAPI();
  }, [item, auctionData]);

  useEffect(() => {
    if (item?.isLiked !== undefined) {
      setIsLike(item.isLiked);
    }
  }, [item?.isLiked]);

  useEffect(() => {
    setInterval(() => {
      setNow(new Date());
    }, 1000);
  }, []);

  const auctionStarted = now.getTime() / 1000 >= auction?.startTime;
  const auctionEnded = auction?.endTime <= now.getTime() / 1000;
  const auctionActive = auctionStarted && !auctionEnded;

  const toggleFavorite = async e => {
    e.preventDefault();
    if (isLiking) return;

    setIsLiking(true);
    try {
      if (item.items) {
        const { data } = await likeBundle(item._id, authToken);
        setLiked(data);
      } else {
        const { data } = await likeItem(
          item.contractAddress,
          item.tokenID,
          authToken
        );
        setLiked(data);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLike(!isLike);
    setIsLiking(false);

    onLike && onLike();
  };

  const formatDiff = diff => {
    if (diff >= ONE_MONTH) {
      const m = Math.ceil(diff / ONE_MONTH);
      return `${m} Month${m > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_DAY) {
      const d = Math.ceil(diff / ONE_DAY);
      return `${d} Day${d > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_HOUR) {
      const h = Math.ceil(diff / ONE_HOUR);
      return `${h} Hour${h > 1 ? 's' : ''}`;
    }
    if (diff >= ONE_MIN) {
      const h = Math.ceil(diff / ONE_MIN);
      return `${h} Min${h > 1 ? 's' : ''}`;
    }
    return `${diff} Second${diff > 1 ? 's' : ''}`;
  };

  const formatDuration = endTime => {
    const diff = endTime - Math.floor(now.getTime() / 1000);
    return formatDiff(diff);
  };

  const renderSlides = () => {
    return item.items.map((v, idx) => (
      <div className={styles.imageBox} key={idx}>
        {(v.imageURL || v.thumbnailPath?.length > 10) &&
          (v.imageURL?.includes('youtube') ? (
            <ReactPlayer
              className={styles.media}
              url={v.imageURL}
              controls={true}
              width="100%"
              height="100%"
            />
          ) : (
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
                src={
                  v.thumbnailPath?.length > 10
                    ? `${storageUrl}/image/${v.thumbnailPath}`
                    : v.imageURL
                }
                className={styles.media}
                alt={v.name}
              />
            </Suspense>
          ))}
      </div>
    ));
  };

  const renderDots = () => {
    return item.items.map((v, idx) => (
      <div className={cx(styles.dot)} key={idx} />
    ));
  };

  const renderContent = () => {
    return (
      <>
        <div className={cx(styles.cardHeader, isLike && styles.liking)}>
          {!item ? (
            <Skeleton width={80} height={20} />
          ) : (
            <>
              {isLike ? (
                <FavoriteIcon
                  className={styles.favIcon}
                  onClick={toggleFavorite}
                />
              ) : (
                <FavoriteBorderIcon
                  className={styles.favIcon}
                  onClick={toggleFavorite}
                />
              )}
              <span className={styles.favLabel}>{liked || 0}</span>
            </>
          )}
        </div>
        <div className={styles.mediaBox}>
          <div className={styles.mediaPanel}>
            {loading || fetching ? (
              <Skeleton
                width="100%"
                height="100%"
                className={styles.mediaLoading}
              />
            ) : item.items ? (
              <>
                <Carousel
                  className={styles.carousel}
                  selectedItem={index}
                  onChange={_index =>
                    setIndex(Math.min(Math.max(_index, 0), 2))
                  }
                >
                  {renderSlides()}
                </Carousel>
                <div className={styles.dots}>
                  {renderDots()}
                </div>
              </>
            ) : (
              <div className={styles.imageBox}>
                {(item?.imageURL ||
                  info?.image ||
                  item?.thumbnailPath?.length > 10 ||
                  item?.thumbnailPath === 'embed') &&
                  (item?.thumbnailPath?.includes('youtube') ? (
                    <ReactPlayer
                      className={styles.media}
                      url={item?.thumbnailPath}
                      controls={true}
                      width="100%"
                      height="100%"
                    />
                  ) : (
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
                        src={
                          item?.thumbnailPath?.length > 10
                            ? `${storageUrl}/image/${item.thumbnailPath}`
                            : item?.imageURL
                        }
                        className={styles.media}
                        alt={item.name}
                      />
                    </Suspense>
                  ))}
              </div>
            )}
          </div>
          <div className={styles.titleBox}>
            {!item ? (
              <Skeleton width={150} height={20} />
            ) : (
              <h3 className={styles.title}>{item.name || info?.name}</h3>
            )}
          </div>
          <div className={styles.content}>
            <Link href={`/collection/${collection?.slug}`}>
              <a className={styles.collectionLink}>{collection?.name}</a>
            </Link>
            <div className={styles.statBox}>
              <div className={styles.statItem}>
                <BootstrapTooltip title="Price">
                  <Image
                    src={wFTMLogo.src}
                    className={styles.statItemIcon}
                    alt="FTM"
                  />
                </BootstrapTooltip>
                <span className={styles.statItemLabel}>
                  {loading || !item
                    ? '---'
                    : `${formatNumber(item.price)} FTM`}
                </span>
              </div>
              <div className={styles.statItem}>
                <BootstrapTooltip title="Bid Status">
                  <CheckCircleIcon
                    className={styles.statItemIcon}
                    style={{
                      color: auctionActive ? '#4caf50' : '#f44336',
                    }}
                  />
                </BootstrapTooltip>
                <span className={styles.statItemLabel}>
                  {auctionActive ? 'Active' : 'Ended'}
                </span>
              </div>
              <div className={styles.statItem}>
                <BootstrapTooltip title="End Time">
                  <i className={cx('far fa-clock', styles.statItemIcon)} />
                </BootstrapTooltip>
                <span className={styles.statItemLabel}>
                  {loading || !auction?.endTime
                    ? '---'
                    : `${formatDuration(auction?.endTime)}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        {onCreate && (
          <div className={styles.createBtnBox}>
            <button
              className={styles.createBtn}
              onClick={() => onCreate(item)}
            >
              <Image src={iconPlus.src} alt="Create" />
              <span className={styles.createBtnLabel}>Create Bundle</span>
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={cx(styles.card, style)}>
      {renderContent()}
    </div>
  );
};

export default BaseCard;
