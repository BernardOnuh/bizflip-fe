import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  Suspense,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
//import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Skeleton from 'react-loading-skeleton';
import ReactResizeDetector from 'react-resize-detector';
import ReactPlayer from 'react-player';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import cx from 'classnames';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
  Line,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
import { Menu, MenuItem } from '@mui/material';
import {
  People as PeopleIcon,
  ViewModule as ViewModuleIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Timeline as TimelineIcon,
  LocalOffer as LocalOfferIcon,
  Toc as TocIcon,
  Label as LabelIcon,
  Ballot as BallotIcon,
  Loyalty as LoyaltyIcon,
  VerticalSplit as VerticalSplitIcon,
  Subject as SubjectIcon,
  Redeem as RedeemIcon,
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';

import Panel from '../Panel';
//import Identicon from '../Identicon';
//import { useNFTContract, useSalesContract, useAuctionContract, useBundleSalesContract } from 'contracts';
import { shortenAddress, formatNumber, formatError, getRandomIPFS } from '../utils';
import NFTCard from '../NFTCard';
import TxButton from '../TxButton';
import TransferModal from '../TransferModal';
import SellModal from '../SellModal';
import OfferModal from '../OfferModal';
import AuctionModal from '../AuctionModal';
import BidModal from '../BiModal';
//import OwnersModal from '../OwnersModal';
//import LikesModal from '../LikesModal';

import SuspenseImg from '../SuspenseImg';
import useTokens from '../hooks/useTokens';
import usePrevious from '../hooks/usePrevious';
import webIcon from '../../../public/images/svgs/web.svg'
import discordIcon from '../../../public/images/svgs/discord.svg';
import telegramIcon from '../../../public/images/svgs/telegram.svg';
import twitterIcon from '../../../public/images/svgs/twitter.svg';
import mediumIcon from '../../../public/images/svgs/medium.svg';
import filterIcon from '../../../public/images/svgs/filter.svg';
import checkIcon from '../../../public/images/svgs/check.svg';
import shareIcon from '../../../public/images/svgs/share.svg';
import iconArtion from '../../../public/images/svgs/logo_small_blue.svg';
import iconFacebook from '../../../public/images/imgs/facebook.png';
import iconTwitter from '../../../public/images/svgs/twitter_blue.svg';

import styles from './styles.module.scss';

const ONE_MIN = 60;
const ONE_HOUR = ONE_MIN * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_MONTH = ONE_DAY * 30;
const filters = ['Trade History', 'Transfer History'];

const NFTItem = () => {

  const [bundleID, setbundleID] = useState()
  const [previewIndex, setPreviewIndex] = useState(0);
  const [minBid, setMinBid] = useState(0);
  const [bundleInfo, setBundleInfo] = useState();
  const [creator, setCreator] = useState();
  const [creatorInfo, setCreatorInfo] = useState();
  const [creatorInfoLoading, setCreatorInfoLoading] = useState(false);
  const [info, setInfo] = useState();
  const [owner, setOwner] = useState();
  const [ownerInfo, setOwnerInfo] = useState();
  const [ownerInfoLoading, setOwnerInfoLoading] = useState(false);
  const [tokenOwnerLoading, setTokenOwnerLoading] = useState(false);
  const tokenType = useRef();
  const contentType = useRef();
  const [tokenInfo, setTokenInfo] = useState();
  const [holders, setHolders] = useState([]);
  const likeUsers = useRef([]);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState();
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [fetchInterval, setFetchInterval] = useState(null);
  const [collectionRoyalty, setCollectionRoyalty] = useState(null);
  

  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [auctionModalVisible, setAuctionModalVisible] = useState(false);
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [ownersModalVisible, setOwnersModalVisible] = useState(false);
  const [likesModalVisible, setLikesModalVisible] = useState(false);

  const [transferring, setTransferring] = useState(false);
  const [listingItem, setListingItem] = useState(false);
  const [listingConfirming, setListingConfirming] = useState(false);
  const [cancelingListing, setCancelingListing] = useState(false);
  const [cancelListingConfirming, setCancelListingConfirming] = useState(false);
  const [priceUpdating, setPriceUpdating] = useState(false);
  const [offerPlacing, setOfferPlacing] = useState(false);
  const [offerConfirming, setOfferConfirming] = useState(false);
  const [offerCanceling, setOfferCanceling] = useState(false);
  const [offerAccepting, setOfferAccepting] = useState(false);
  const [buyingItem, setBuyingItem] = useState(false);
  const [auctionStarting, setAuctionStarting] = useState(false);
  const [auctionStartConfirming, setAuctionStartConfirming] = useState(false);
  const [auctionUpdating, setAuctionUpdating] = useState(false);
  const [auctionUpdateConfirming, setAuctionUpdateConfirming] = useState(false);
  const [auctionCanceling, setAuctionCanceling] = useState(false);
  const [auctionCancelConfirming, setAuctionCancelConfirming] = useState(false);
  const [bidPlacing, setBidPlacing] = useState(false);
  const [bidWithdrawing, setBidWithdrawing] = useState(false);
  const [resulting, setResulting] = useState(false);
  const [resulted, setResulted] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [likeUsersFetching, setLikeUsersFetching] = useState(false);
  const [likeFetching, setLikeFetching] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [liked, setLiked] = useState();
  const [itemOffers, setItemOffers] = useState([]);
  const [itemNfts, setItemNfts] = useState([]);
  const [hasUnlockable, setHasUnlockable] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [unlockableContent, setUnlockableContent] = useState('');

  const [bid, setBid] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winningToken, setWinningToken] = useState(null);
  const [winningBid, setWinningBid] = useState(null);
  const [views, setViews] = useState();
  const [now, setNow] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const auction = useRef(null);
  const listings = useRef([]);
  const bundleListing = useRef(null);
  const bundleItems = useRef([]);
  const offers = useRef([]);
  const tradeHistory = useRef([]);
  const transferHistory = useRef([]);
  const moreItems = useRef([]);
  const [prices, setPrices] = useState({});
  const [priceInterval, setPriceInterval] = useState(null);

  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [filter, setFilter] = useState(0);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const prevSalesContract = useRef(null);
  const prevAuctionContract = useRef(null);
  const [salesContractApproved, setSalesContractApproved] = useState(false);
  const [salesContractApproving, setSalesContractApproving] = useState(false);
  const [
    bundleSalesContractApproved,
    setBundleSalesContractApproved,
  ] = useState({});
  const [auctionContractApproved, setAuctionContractApproved] = useState(false);
  const auctionStarted = now.getTime() / 1000 >= auction.current?.startTime;
  const [auctionContractApproving, setAuctionContractApproving] = useState(
    false
  );
  const explorerUrl ="https://etherscan.io/"
  const address = ""
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const bestListing = (() => {
    if (bundleID) return bundleListing.current;
    let idx = 0;
    while (
      idx < listings.current.length &&
      listings.current[idx].owner.toLowerCase() === account?.toLowerCase()
    ) {
      idx++;
    }
    if (idx < listings.current.length) return listings.current[idx];
    return null;
  })();

  const isMine = bundleID
  const isLoggedIn = () => {
  };

  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleMenuOpen = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setShareAnchorEl(null);
  };

  const handleCopyLink = () => {
    handleClose();
    showToast('success', 'Link copied to clipboard!');
  };

  const handleShareOnFacebook = () => {
    handleClose();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      '_blank'
    );
  };

  const handleShareToTwitter = () => {
    handleClose();
    window.open(
      `https://twitter.com/intent/tweet?text=Check%20out%20this%20item%20on%20Artion&url=${currentUrl}`,
      '_blank'
    );
  };

  const handleTransfer = async (to, quantity) => {}

  const hasListing = (() => {})
  const handleUpdateListing = async (token, _price, quantity) => {}
  const myListing = () => {}
  const handleApproveSalesContract = async () => {}
  const handleMakeOffer = async (token, _price, quantity, endTime) => {}
  const handleStartAuction = async (
    token,
    _price,
    _startTime,
    _endTime,
    minBidReserve
  ) => {}
  const handleApproveAuctionContract = async () => {}
  const handlePlaceBid = async _price => {}
const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
    classes={{
      paper: styles.filtermenu,
      list: styles.menuList,
    }}
  >
    <div className={styles.menuTitle}>Filter By</div>
    {filters.map((_filter, idx) => (
      <div
        key={idx}
        className={cx(styles.menu, filter === idx && styles.active)}
        onClick={() => handleSelectFilter(idx)}
      >
        {_filter}
        <img src={checkIcon} />
      </div>
    ))}
  </Menu>
);

const renderMedia = (image, contentType) => {
  if (contentType === 'video' || image?.includes('youtube')) {
    return (
      <ReactPlayer
        className={styles.content}
        url={image}
        controls={true}
        width="100%"
        height="100%"
      />
    );
  } else if (contentType === 'embed') {
    return <iframe className={styles.content} src={image} />;
  } else if (contentType === 'image' || contentType === 'gif') {
    return (
      <Suspense
        fallback={
          <Loader
            type="Oval"
            color="#007BFF"
            height={32}
            width={32}
            className={styles.loader}
          />
        }
      >
        <SuspenseImg className={styles.content} src={image} />
      </Suspense>
    );
  }
};

const renderProperties = properties => {
  const res = [];
  Object.keys(properties).map((key, idx) => {
    if (!['address', 'createdAt'].includes(key)) {
      res.push(
        <div key={idx} className={styles.property}>
          <div className={styles.propertyLabel}>{key} : </div>
          <div className={styles.propertyValue}>
            {key === 'recipient' ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${explorerUrl}/address/${properties[key]}`}
              >
                {shortenAddress(properties[key])}
              </a>
            ) : key === 'IP_Rights' ? (
              properties[key] ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={properties[key]}
                >
                  {properties[key]}
                </a>
              ) : (
                'Not available'
              )
            ) : (
              properties[key]
            )}
            {key === 'royalty' ? '%' : ''}
          </div>
        </div>
      );
    }
  });
  return res;
};

const renderItemInfo = () => (
  <>
    <div className={styles.itemMenu}>
      {isMine && !bundleID && (
        <div className={styles.itemMenuBtn} onClick={onTransferClick}>
          <RedeemIcon src={shareIcon} className={styles.itemMenuIcon} />
        </div>
      )}
      <div
        className={styles.itemMenuBtn}
        onClick={e => setShareAnchorEl(e.currentTarget)}
      >
        <img src={shareIcon} className={styles.itemMenuIcon} />
      </div>
    </div>
    <div
      className={styles.itemCategory}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        history.push('/explore');
        collection?.erc721Address &&
          dispatch(
            FilterActions.updateCollectionsFilter([collection.erc721Address])
          );
      }}
    >
      {collection?.collectionName || collection?.name || ''}
    </div>
    <div className={styles.itemName}>
      {(bundleID ? bundleInfo?.name : info?.name) || ''}
    </div>
    {info?.description && (
      <div className={styles.itemDescription}>{info.description}</div>
    )}
    <div className={styles.itemStats}>
      {(ownerInfoLoading || tokenOwnerLoading || owner || tokenInfo) && (
        <div className={styles.itemOwner}>
          {ownerInfoLoading || tokenOwnerLoading ? (
            <Skeleton width={150} height={20} />
          ) : tokenType.current === 721 || bundleID ? (
            <>
              <div className={styles.ownerAvatar}>
                {ownerInfo?.imageHash ? (
                  <img
                    src={`https://cloudflare-ipfs.com/ipfs/${ownerInfo.imageHash}`}
                    className={styles.avatar}
                  />
                ) : (
                  <Identicon
                    account={owner}
                    size={32}
                    className={styles.avatar}
                  />
                )}
              </div>
              Owned by&nbsp;
              <Link to={`/account/${owner}`} className={styles.ownerName}>
                {isMine ? 'Me' : ownerInfo?.alias || shortenAddress(owner)}
              </Link>
            </>
          ) : tokenInfo ? (
            <>
              <div
                className={cx(styles.itemViews, styles.clickable)}
                onClick={() => setOwnersModalVisible(true)}
              >
                <PeopleIcon style={styles.itemIcon} />
                &nbsp;{formatNumber(holders.length)}
                &nbsp;owner{holders.length > 1 && 's'}
              </div>
              <div className={styles.itemViews}>
                <ViewModuleIcon style={styles.itemIcon} />
                &nbsp;{formatNumber(tokenInfo.totalSupply)} total
              </div>
            </>
          ) : null}
        </div>
      )}
      <div className={styles.itemViews}>
        <FontAwesomeIcon icon={faEye} color="#A2A2AD" />
        &nbsp;
        {isNaN(views) ? (
          <Skeleton width={80} height={20} />
        ) : (
          `${formatNumber(views)} view${views !== 1 ? 's' : ''}`
        )}
      </div>
      <div
        className={cx(
          styles.itemViews,
          styles.clickable,
          isLike && styles.liking
        )}
      >
        {isNaN(liked) || likeFetching ? (
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
            &nbsp;
            <span onClick={liked ? showLikeUsers : null}>
              {formatNumber(liked || 0)} favorite{liked !== 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>
    </div>
    {hasUnlockable && (
      <div className={styles.bestBuy}>
        <div
          className={styles.unlockableLabel}
        >{`This item has unlockable content.${
          !isMine ? ' Only owners can see the content.' : ''
        }`}</div>
        {isMine ? (
          unlockableContent ? (
            <textarea
              className={styles.unlockableContent}
              value={unlockableContent}
              readOnly
            />
          ) : (
            <div
              className={cx(styles.revealBtn, revealing && styles.disabled)}
              onClick={handleRevealContent}
            >
              {revealing ? (
                <ClipLoader color="#FFF" size={16} />
              ) : (
                `Reveal Content`
              )}
            </div>
          )
        ) : null}
      </div>
    )}

    {bestListing && (
      <div className={styles.bestBuy}>
        <div className={styles.currentPriceLabel}>Current price</div>
        <div className={styles.currentPriceWrapper}>
          <div className={styles.tokenLogo}>
            <img src={bestListing.token?.icon} />
          </div>
          <div className={styles.currentPrice}>
            {formatNumber(bestListing.price)}
          </div>
          <div className={styles.currentPriceUSD}>
            (
            {prices[bestListing.token?.address] ? (
              `$${formatNumber(
                (
                  bestListing.price * prices[bestListing.token?.address]
                ).toFixed(3)
              )}`
            ) : (
              <Skeleton width={80} height={24} />
            )}
            )
          </div>
        </div>
        {bestListing.owner.toLocaleLowerCase() !==
          account?.toLocaleLowerCase() && (
          <TxButton
            className={cx(styles.buyNow, buyingItem && styles.disabled)}
            onClick={
              bundleID ? handleBuyBundle : () => handleBuyItem(bestListing)
            }
          >
            {buyingItem ? <ClipLoader color="#FFF" size={16} /> : 'Buy Now'}
          </TxButton>
        )}
      </div>
    )}
  </>
);

const handleSellModal = () => {
  if (!user?.email) {
    showToast('info', 'Please add your Email and Name in Account Settings.');
  } else {
    setSellModalVisible(true);
  }
};

const renderBundleItem = (item, idx) => {
  if (!item) {
    return (
      <div className={styles.bundleItem} key={idx}>
        <div className={styles.bundleItemImage}>
          <Skeleton width={60} height={60} />
        </div>
        <div className={styles.bundleItemInfo}>
          <div>
            <Skeleton width={180} height={22} />
          </div>
          <div>
            <Skeleton width={180} height={22} />
          </div>
        </div>
        <div className={styles.bundleItemSupply}>
          <Skeleton width={80} height={20} />
        </div>
      </div>
    );
  }

  const collection = item
    ? collections.find(col => col.erc721Address === item.contractAddress)
    : null;
  return (
    <Link
      to={`/explore/${item.contractAddress}/${item.tokenID}`}
      className={styles.bundleItem}
      key={idx}
    >
      <div className={styles.bundleItemImage}>
        <Suspense
          fallback={
            <Loader type="Oval" color="#007BFF" height={32} width={32} />
          }
        >
          <SuspenseImg
            src={
              item.thumbnailPath.length > 10
                ? `${storageUrl}/image/${item.thumbnailPath}`
                : item.metadata.image
            }
          />
        </Suspense>
      </div>
      <div className={styles.bundleItemInfo}>
        <div className={styles.bundleItemCategory}>
          {collection?.collectionName || collection?.name}
        </div>
        <div className={styles.bundleItemName}>{item.name}</div>
      </div>
      <div className={styles.bundleItemSupply}>x{item.supply}</div>
    </Link>
  );
};

const renderBundleInfoPanel = () => (
  <Panel title="Bundle Description" icon={SubjectIcon} expanded>
    <div className={styles.panelBody}>
      {creatorInfoLoading ? (
        <Skeleton width={150} height={20} />
      ) : (
        <div className={styles.itemOwner}>
          <div className={styles.ownerAvatar}>
            {creatorInfo?.imageHash ? (
              <img
                src={`https://cloudflare-ipfs.com/ipfs/${creatorInfo.imageHash}`}
                className={styles.avatar}
              />
            ) : (
              <Identicon
                account={creator}
                size={24}
                className={styles.avatar}
              />
            )}
          </div>
          Created by&nbsp;
          <Link to={`/account/${creator}`} className={styles.ownerName}>
            {creator?.toLowerCase() === account?.toLowerCase()
              ? 'Me'
              : creatorInfo?.alias || shortenAddress(creator)}
          </Link>
        </div>
      )}
    </div>
  </Panel>
);

const renderAboutPanel = () => (
  <Panel
    icon={VerticalSplitIcon}
    title={
      <div className={styles.panelTitle}>
        About&nbsp;
        {collectionLoading ? (
          <Skeleton width={80} height={20} />
        ) : (
          collection?.collectionName || collection?.name
        )}
      </div>
    }
  >
    <div className={styles.panelBody}>
      <div className={styles.collectionDescription}>
        {collection?.description || 'Unverified Collection'}
      </div>

      <div className={styles.socialLinks}>
        {collection?.siteUrl?.length > 0 && (
          <a
            href={collection?.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={webIcon} />
          </a>
        )}
        {collection?.twitterHandle?.length > 0 && (
          <a
            href={collection?.twitterHandle}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={twitterIcon} />
          </a>
        )}
        {collection?.mediumHandle?.length > 0 && (
          <a
            href={collection?.mediumHandle}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={mediumIcon} />
          </a>
        )}
        {collection?.telegram?.length > 0 && (
          <a
            href={collection?.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={telegramIcon} />
          </a>
        )}
        {collection?.discord?.length > 0 && (
          <a
            href={collection?.discord}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src={discordIcon} />
          </a>
        )}
      </div>
    </div>
  </Panel>
);

const renderCollectionPanel = () => (
  <Panel title="Chain Info" icon={BallotIcon}>
    <div className={styles.panelBody}>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Collection</div>
        <a
          href={`${explorerUrl}/token/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.panelValue}
        >
          {shortenAddress(address)}
        </a>
      </div>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Network</div>
        <div className={styles.panelValue}>Ethereum</div>
      </div>
      <div className={styles.panelLine}>
        <div className={styles.panelLabel}>Chain ID</div>
        <div className={styles.panelValue}>1</div>
      </div>
    </div>
  </Panel>
);

const renderRoyaltyPanel = () =>
  collectionRoyalty && (
    <Panel title="Royalty" icon={LoyaltyIcon}>
      <div className={styles.panelBody}>
        <div className={styles.panelLine}>
          <div className={styles.panelLabel}>Royalty</div>
          <div className={styles.panelValue}>
            {collectionRoyalty.royalty}%
          </div>
        </div>
        <div className={styles.panelLine}>
          <div className={styles.panelLabel}>Fee Recipient</div>
          <div className={styles.panelValue}>
            {collectionRoyalty.feeRecipient}
          </div>
        </div>
      </div>
    </Panel>
  );

return (
  <div className={styles.container}>
    
    {isLoggedIn() && (
      <div className={styles.header}>
        {isMine && (
          <>
            {auction.current?.resulted === false ? (
              <div
                className={cx(
                  styles.headerButton,
                  auctionCanceling && styles.disabled
                )}
                onClick={cancelCurrentAuction}
              >
                {auctionCancelConfirming ? (
                  <ClipLoader color="#FFF" size={16} />
                ) : (
                  'Cancel Auction'
                )}
              </div>
            ) : null}
            {!bundleID &&
              (!auction.current || !auction.current.resulted) &&
              !hasListing &&
              tokenType.current !== 1155 && (
                <div
                  className={cx(
                    styles.hide,
                    styles.headerButton,
                    (auctionStarting || auctionUpdating || auctionEnded) &&
                      styles.disabled
                  )}
                  onClick={() => {
                    !auctionEnded && setAuctionModalVisible(true);
                  }}
                >
                  {auctionStartConfirming || auctionUpdateConfirming ? (
                    <ClipLoader color="#FFF" size={16} />
                  ) : auction.current ? (
                    'Update Auction'
                  ) : (
                    'Start Auction'
                  )}
                </div>
              )}
            {(!auction.current || auction.current.resulted) && (
              <>
                {hasListing ? (
                  <div
                    className={cx(
                      styles.headerButton,
                      cancelingListing && styles.disabled
                    )}
                    onClick={cancelList}
                  >
                    {cancelListingConfirming ? (
                      <ClipLoader color="#FFF" size={16} />
                    ) : (
                      'Cancel Listing'
                    )}
                  </div>
                ) : null}
                <div
                  className={cx(
                    styles.hide,
                    styles.headerButton,
                    (listingItem || priceUpdating) && styles.disabled
                  )}
                  onClick={() =>
                    !(listingItem || priceUpdating) ? handleSellModal() : null
                  }
                >
                  {listingConfirming ? (
                    <ClipLoader color="#FFF" size={16} />
                  ) : hasListing ? (
                    'Update Listing'
                  ) : (
                    'Sell'
                  )}
                </div>
              </>
            )}
          </>
        )}
        {(!isMine ||
          (tokenType.current === 1155 &&
            myHolding.supply < tokenInfo.totalSupply)) &&
          (!auction.current || auction.current.resulted) && (
            <TxButton
              className={cx(
                styles.headerButton,
                (offerPlacing || offerCanceling) && styles.disabled
              )}
              onClick={
                hasMyOffer ? handleCancelOffer : () => handleMakeOfferModal()
              }
            >
              {offerConfirming ? (
                <ClipLoader color="#FFF" size={16} />
              ) : hasMyOffer ? (
                'Withdraw Offer'
              ) : (
                'Make Offer'
              )}
            </TxButton>
          )}
      </div>
      
    )}
    <div className={styles.inner}>
      <div className={styles.topContainer}>
        <div className={styles.itemSummary}>
        <div className={styles.itemMedia}>
            <div className={styles.media}>
              {loading ? (
                <Oval
                  color="#007BFF"
                  height={32}
                  width={32}
                  className={styles.loader}
                />
              ) : !bundleID || bundleItems.current.length ? (
                bundleID ? (
                  renderMedia(
                    bundleItems.current[previewIndex].metadata?.image,
                    bundleItems.current[previewIndex].contentType
                  )
                ) : (
                  renderMedia(info?.image, contentType.current)
                )
              ) : null}
            </div>
            {bundleID && (
              <div className={styles.previewList}>
                {(loading ? [null, null, null] : bundleItems.current).map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className={cx(
                        styles.preview,
                        !loading && idx === previewIndex && styles.active
                      )}
                      onClick={() => setPreviewIndex(idx)}
                    >
                      {item ? (
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
                              item.thumbnailPath?.length > 10
                                ? `${storageUrl}/image/${item.thumbnailPath}`
                                : item.metadata?.image
                            }
                          />
                        </Suspense>
                      ) : (
                        <Skeleton width={72} height={72} />
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className={styles.itemInfo}>{renderItemInfo()}</div>
          <div className={styles.itemInfoCont}>
            
          </div>
        </div>
        <div className={styles.itemMain}>
          <div className={styles.itemInfoWrapper}>{renderItemInfo()}</div>
          {info?.properties && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
            
            </div>
          )}
          {bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderBundleInfoPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderAboutPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderCollectionPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderRoyaltyPanel()}
            </div>
          )}
          {(winner || auction.current?.resulted === false) && (
            <div className={styles.panelWrapper}>
          
            </div>
          )}
          {!bundleID && (
            <div className={styles.panelWrapper}>
     
            </div>
          )}
          <div className={styles.panelWrapper}>
            
          </div>
          <div className={styles.panelWrapper}>
            
          </div>
          {bundleID && (
            <div className={styles.panelWrapper}>
             
            </div>
          )}
        </div>
      </div>
      <div className={styles.tradeHistoryWrapper}>
        <div className={styles.tradeHistoryHeader}>
          <div className={styles.tradeHistoryTitle}>{filters[filter]}</div>
          {!bundleID && (
            <div className={styles.filter} onClick={handleMenuOpen}>
              <img src={filterIcon} className={styles.filterIcon} />
            </div>
          )}
        </div>
        <div className={styles.histories}>
          <div className={cx(styles.history, styles.heading)}>
            {filter === 0 && <div className={styles.historyPrice}>Price</div>}
            {tokenType.current === 1155 && (
              <div className={styles.quantity}>Quantity</div>
            )}
            <div className={styles.from}>From</div>
            <div className={styles.to}>To</div>
            <div className={styles.saleDate}>Date</div>
          </div>
          {(historyLoading
            ? [null, null, null]
            : filter === 0
            ? tradeHistory.current
            : transferHistory.current
          ).map((history, idx) => {
            const saleDate = history ? new Date(history.createdAt) : null;
            return (
              <div className={styles.history} key={idx}>
                {filter === 0 && (
                  <div className={styles.historyPrice}>
                    {history ? (
                      <>
                        <img
                          src={history.token?.icon}
                          className={styles.tokenIcon}
                        />
                        {formatNumber(history.price)}
                        &nbsp;( ${formatNumber(
                          history.priceInUSD.toFixed(3)
                        )}{' '}
                        )
                      </>
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </div>
                )}
                {tokenType.current === 1155 && (
                  <div className={styles.quantity}>
                    {history ? (
                      formatNumber(history.value)
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}
                  </div>
                )}
                <div className={styles.from}>
                  {history ? (
                    <Link to={`/account/${history.from}`}>
                      <div className={styles.userAvatarWrapper}>
                        {history.fromImage ? (
                          <img
                            src={`https://cloudflare-ipfs.com/ipfs/${history.fromImage}`}
                            className={styles.userAvatar}
                          />
                        ) : (
                          <Identicon
                            account={history.from}
                            size={24}
                            className={styles.userAvatar}
                          />
                        )}
                      </div>
                      {history.fromAlias || history.from?.substr(0, 6)}
                    </Link>
                  ) : (
                    <Skeleton width={180} height={20} />
                  )}
                </div>
                <div className={styles.to}>
                  {history ? (
                    <Link to={`/account/${history.to}`}>
                      <div className={styles.userAvatarWrapper}>
                        {history.toImage ? (
                          <img
                            src={`https://cloudflare-ipfs.com/ipfs/${history.toImage}`}
                            className={styles.userAvatar}
                          />
                        ) : (
                          <Identicon
                            account={history.to}
                            size={24}
                            className={styles.userAvatar}
                          />
                        )}
                      </div>
                      {history.toAlias || history.to?.substr(0, 6)}
                    </Link>
                  ) : (
                    <Skeleton width={180} height={20} />
                  )}
                </div>
                <div className={styles.saleDate}>
                  {saleDate ? (
                    formatDate(saleDate)
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {!bundleID && (
          <div className={styles.panelWrapper}>
        
          </div>
        )}
      </div>
    </div>

    {renderMenu}

    <Menu
      id="simple-menu"
      anchorEl={shareAnchorEl}
      keepMounted
      open={Boolean(shareAnchorEl)}
      onClose={handleClose}
      classes={{ paper: styles.shareMenu, list: styles.shareMenuList }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <CopyToClipboard text={currentUrl} onCopy={handleCopyLink}>
        <MenuItem classes={{ root: styles.menuItem }}>
          <img src={iconArtion} />
          Copy Link
        </MenuItem>
      </CopyToClipboard>
      <MenuItem
        classes={{ root: styles.menuItem }}
        onClick={handleShareOnFacebook}
      >
        <img src={iconFacebook} />
        Share on Facebook
      </MenuItem>
      <MenuItem
        classes={{ root: styles.menuItem }}
        onClick={handleShareToTwitter}
      >
        <img src={iconTwitter} />
        Share to Twitter
      </MenuItem>
    </Menu>
    <TransferModal
      visible={transferModalVisible}
      totalSupply={tokenType.current === 1155 ? myHolding?.supply : null}
      transferring={transferring}
      onTransfer={handleTransfer}
      onClose={() => setTransferModalVisible(false)}
    />
    <SellModal
      visible={sellModalVisible}
      onClose={() => setSellModalVisible(false)}
      onSell={hasListing ? handleUpdateListing : handleListItem}
      startPrice={
        bundleID ? bundleListing.current?.price || 0 : myListing()?.price || 0
      }
      confirming={listingItem || priceUpdating}
      approveContract={
        bundleID
          ? handleApproveBundleSalesContract
          : handleApproveSalesContract
      }
      contractApproving={salesContractApproving}
      contractApproved={
        bundleID ? isBundleContractApproved : salesContractApproved
      }
      totalSupply={tokenType.current === 1155 ? myHolding?.supply : null}
    />
    <OfferModal
      visible={offerModalVisible}
      onClose={() => setOfferModalVisible(false)}
      onMakeOffer={handleMakeOffer}
      confirming={offerPlacing}
      totalSupply={tokenType.current === 1155 ? maxSupply() : null}
      offers={itemOffers}
    />
    <AuctionModal
      visible={auctionModalVisible}
      onClose={() => setAuctionModalVisible(false)}
      onStartAuction={
        auction.current ? handleUpdateAuction : handleStartAuction
      }
      auction={auction.current}
      auctionStarted={auctionStarted}
      confirming={auctionStarting || auctionUpdating}
      approveContract={handleApproveAuctionContract}
      contractApproving={auctionContractApproving}
      contractApproved={auctionContractApproved}
    />
  <BidModal
      visible={bidModalVisible}
      onClose={() => setBidModalVisible(false)}
      onPlaceBid={handlePlaceBid}
      minBidAmount={bid?.bid ? bid?.bid : minBid}
      confirming={bidPlacing}
      token={auction.current?.token}
      firstBid={bid?.bid ? false : minBid > 0 ? true : false}
    />
    {/*<OwnersModal
      visible={ownersModalVisible}
      onClose={() => setOwnersModalVisible(false)}
      holders={holders}
    />
    <LikesModal
      visible={likesModalVisible}
      onClose={() => setLikesModalVisible(false)}
      users={likeUsersFetching ? new Array(5).fill(null) : likeUsers.current}
    />*/}
  </div>
);
};

export default NFTItem;
