import { useEffect, useRef, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import axios from 'axios';
import { useResizeDetector } from 'react-resize-detector';

import StatusFilter from '../StatusFilter';
import CollectionsFilter from '../CollectionsFilter';
import CategoriesFilter from '../CategoriesFilter';
import ExploreFilterHeader from './Body/FilterHeader';
import NFTsGrid from '../NFTsGrid';
import Header from '../Header';
import useWindowDimensions from '../hooks/useWindowDimensions';
import usePrevious from '../hooks/usePrevious';

import iconCollapse from '../../../public/images/svgs/collapse.svg';
import styles from './styles.module.scss';

const ExploreAllPage = () => {
  const [tokens, setTokens] = useState([]);
  const [fetching, setFetching] = useState({ upFetching: false, downFetching: false });
  const [filters, setFilters] = useState({
    collections: [],
    groupType: null,
    category: null,
    sortBy: null,
    statusBuyNow: false,
    statusHasBids: false,
    statusHasOffers: false,
    statusOnAuction: false,
  });
  const [collapsed, setCollapsed] = useState(false);
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);

  const { width } = useWindowDimensions();
  const { width: gridWidth, ref } = useResizeDetector();
  const conRef = useRef();
  const prevNumPerRow = usePrevious(Math.floor(gridWidth / 240));
  const numPerRow = Math.floor(gridWidth / 240);
  const fetchCount = numPerRow <= 3 ? 18 : numPerRow === 4 ? 16 : numPerRow * 3;

  const { chain } = useNetwork();
  const { address: authToken } = useAccount();

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
  }, []);

  const updateCollections = async () => {
    try {
      const res = await axios.get('/api/collections');
      if (res.status === 200) {
        const verified = [];
        const unverified = [];
        res.data.forEach(item => {
          if (item.isVerified) verified.push(item);
          else unverified.push(item);
        });
        setFilters(prevFilters => ({ ...prevFilters, collections: [...verified, ...unverified] }));
      }
    } catch {
      console.error('Failed to fetch collections');
    }
  };

  const fetchNFTs = async (dir) => {
    if (cancelSource) {
      cancelSource.cancel();
    }
    if (isNaN(fetchCount)) return;

    try {
      const filterBy = [];
      if (filters.statusBuyNow) filterBy.push('buyNow');
      if (filters.statusHasBids) filterBy.push('hasBids');
      if (filters.statusHasOffers) filterBy.push('hasOffers');
      if (filters.statusOnAuction) filterBy.push('onAuction');

      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      let start;
      let _count = fetchCount;
      if (dir !== 0) {
        _count -= tokens.length % numPerRow;
        start = Math.max(dir < 0 ? 0 - _count : 0, 0);
      } else {
        start = 0;
        _count = fetchCount * 2;
      }
      if (start === tokens.length) {
        return;
      }

      setFetching(prev => ({ ...prev, upFetching: dir < 0, downFetching: dir > 0 }));

      const { data } = await axios.get('/api/tokens', {
        params: {
          start,
          count: _count,
          groupType: filters.groupType,
          collections: filters.collections,
          category: filters.category,
          sortBy: filters.sortBy,
          filterBy,
        },
        cancelToken: cancelTokenSource.token,
      });

      let newTokens = dir > 0 ? [...tokens, ...data.tokens] : dir < 0 ? [...data.tokens, ...tokens] : data.tokens;
      newTokens = newTokens.filter((tk, idx) => newTokens.findIndex(_tk => tk.id === _tk.id) === idx);

      const newCount = newTokens.length - tokens.length;
      setTokens(newTokens);

      if (dir === 0 && tokens.length) {
        // move scrollbar to middle
        const obj = width > 600 ? ref.current : conRef.current;
        obj.scrollTop = (obj.scrollHeight - obj.clientHeight) / 2;
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        console.error('Failed to fetch tokens');
      }
    } finally {
      setCancelSource(null);
    }
  };

  const handleScroll = e => {
    if (fetching.upFetching || fetching.downFetching) return;

    const obj = e.target;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      fetchNFTs(1);
    } else if (obj.scrollTop < 100) {
      fetchNFTs(-1);
    }
  };

  useEffect(() => {
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;
    fetchNFTs(0);
  }, [filters, chain, numPerRow]);

  const updateItems = async () => {
    try {
      if (!authToken) {
        return;
      }
      let missingTokens = tokens.map((tk, index) => ({
        index,
        isLiked: tk.isLiked,
        id: tk.id,
      }));

      if (missingTokens.length === 0) return;

      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      const { data, status } = await axios.post('/api/liked-items', {
        items: missingTokens,
        authToken,
      }, {
        cancelToken: cancelTokenSource.token,
      });

      if (status === 200) {
        const newTokens = [...tokens];
        missingTokens.forEach((tk, idx) => {
          newTokens[tk.index].isLiked = data[idx].isLiked;
        });
        setTokens(newTokens);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCancelSource(null);
    }
  };

  useEffect(() => {
    if (tokens.length) {
      updateItems();
    }
  }, [tokens, authToken]);

  return (
    <>
      <Header border />
      <div
        ref={conRef}
        className={styles.container}
        onScroll={width <= 600 ? handleScroll : null}
      >
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            {!collapsed && <div className={styles.sidebarTitle}>Filters</div>}
            <img
              src={iconCollapse}
              className={styles.iconCollapse}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className={styles.filterList}>
            <StatusFilter />
            <CollectionsFilter />
            <CategoriesFilter />
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.filterHeader}>
            <ExploreFilterHeader
              loading={fetching.upFetching || fetching.downFetching}
              category={filters.category}
            />
          </div>
          <div
            ref={ref}
            className={styles.exploreAll}
            onScroll={width > 600 ? handleScroll : null}
          >
            <NFTsGrid
              items={tokens}
              uploading={fetching.upFetching}
              loading={fetching.downFetching}
              numPerRow={numPerRow}
              category={filters.category}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreAllPage;
