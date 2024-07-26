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
  import Loader from 'react-loader-spinner';
  import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
  import Skeleton from 'react-loading-skeleton';
  import ReactResizeDetector from 'react-resize-detector';
  import ReactPlayer from 'react-player';
  import { CopyToClipboard } from 'react-copy-to-clipboard';
  
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
  import Identicon from '../Identicon';
  //import { useNFTContract, useSalesContract, useAuctionContract, useBundleSalesContract } from 'contracts';
  //import { shortenAddress, formatNumber, formatError, getRandomIPFS } from 'utils';
  import NFTCard from '../NFTCard';
  import TxButton from '../TxButton';
  import TransferModal from '../TransferModal';
  import SellModal from '../SellModal';
  import OfferModal from '../OfferModal';
  import AuctionModal from '../AuctionModal';
  import BidModal from '../BidModal';
  import OwnersModal from '../OwnersModal';
  import LikesModal from '../LikesModal';

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
  
  const YourComponent = () => {
    const router = useRouter();
    const { id } = router.query;
    // ... your state and other hooks
  
    // Your useEffect and other functions
  
    return (
      <div className={styles.container}>
        {/* Your component JSX */}
      </div>
    );
  };
  
  export default YourComponent;
  