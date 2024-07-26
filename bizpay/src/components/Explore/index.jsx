import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import cx from 'classnames';
import { useResizeDetector } from 'react-resize-detector';
import StatusFilter from '../StatusFilter';
import CollectionsFilter from '../CollectionsFilter';
import CategoriesFilter from '../CategoriesFilter';
import ExploreFilterHeader from './Body/FilterHeader';
import { FilterProvider } from '../../context/FilterContext';
import NFTsGrid from '../NFTsGrid';
import { useExplore, ExploreProvider } from '../../context/ExploreContext';
import useWindowDimensions from '../hooks/useWindowDimensions';
import usePrevious from '../hooks/usePrevious';
import iconCollapse from '../../../public/images/svgs/collapse.svg';
import styles from './styles.module.scss';

const fetchCollections = async () => {
  // Replace with your actual API endpoint
  const res = await axios.get('/api/collections');
  return res.data;
};

const fetchTokens = async (start, count, groupType, collections, category, sortBy, filterBy, cancelToken) => {
  // Replace with your actual API endpoint
  const res = await axios.get('/api/tokens', {
    params: { start, count, groupType, collections, category, sortBy, filterBy },
    cancelToken
  });
  return res.data;
};

const ExploreAllPage = () => {
  const { state, dispatch } = useExplore();
  const {
    authToken,
    upFetching,
    downFetching,
    tokens,
    count,
    from,
    to,
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
  } = state;

  const { width } = useWindowDimensions();  // Use the width from the custom hook
  const ref = useRef();  // Create a ref for the NFTsGrid container
  const conRef = useRef();
  const [collapsed, setCollapsed] = useState(false);
  const [fetchInterval, setFetchInterval] = useState(null);
  const [cancelSource, setCancelSource] = useState(null);
  const [likeCancelSource, setLikeCancelSource] = useState(null);
  const [prevNumPerRow, setPrevNumPerRow] = useState(null);

  const prevAuthToken = usePrevious(authToken);

  // Calculate numPerRow based on the width
  const numPerRow = Math.floor(width / 240);
  const fetchCount = numPerRow <= 3 ? 18 : numPerRow === 4 ? 16 : numPerRow * 3;

  useEffect(() => {
    if (fetchInterval) {
      clearInterval(fetchInterval);
    }

    updateCollections();
    setFetchInterval(setInterval(updateCollections, 1000 * 60 * 10));
  }, []);

  const updateCollections = async () => {
    try {
      const res = await fetchCollections();
      if (res.status === 'success') {
        const verified = [];
        const unverified = [];
        res.data.forEach(item => {
          if (item.isVerified) verified.push(item);
          else unverified.push(item);
        });
        dispatch({ type: 'SET_COLLECTIONS', payload: { collections: [...verified, ...unverified] } });
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
      if (statusBuyNow) filterBy.push('buyNow');
      if (statusHasBids) filterBy.push('hasBids');
      if (statusHasOffers) filterBy.push('hasOffers');
      if (statusOnAuction) filterBy.push('onAuction');

      const cancelTokenSource = axios.CancelToken.source();
      setCancelSource(cancelTokenSource);

      let start;
      let _count = fetchCount;
      if (dir !== 0) {
        _count -= tokens.length % numPerRow;
        start = Math.max(dir < 0 ? from - _count : to, 0);
      } else {
        start = from;
        _count = fetchCount * 2;
      }
      if (start === count) {
        return;
      }

      dispatch({ type: 'START_FETCHING', payload: { upFetching: dir > 0, downFetching: dir < 0 } });

      const { data } = await fetchTokens(
        start,
        _count,
        groupType,
        collections,
        category,
        sortBy,
        filterBy,
        cancelTokenSource.token
      );

      let newTokens = dir > 0
        ? [...tokens, ...data.tokens]
        : dir < 0
        ? [...data.tokens, ...tokens]
        : data.tokens;
      newTokens = newTokens.filter(
        (tk, idx) =>
          newTokens.findIndex(_tk =>
            tk.items
              ? tk._id === _tk._id
              : tk.contractAddress === _tk.contractAddress &&
                tk.tokenID === _tk.tokenID
          ) === idx
      );
      let _from = from;
      let _to = to;
      const newCount = newTokens.length - tokens.length;
      if (dir > 0) {
        _to += newCount;
      } else if (dir < 0) {
        _from -= newCount;
      } else {
        _to = _from + newTokens.length;
      }
      newTokens = dir > 0
        ? newTokens.slice(-fetchCount * 2)
        : newTokens.slice(0, fetchCount * 2);
      if (dir > 0) {
        _from = _to - newTokens.length;
      } else if (dir < 0) {
        _to = _from + newTokens.length;
      }

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: { tokens: newTokens, from: _from, to: _to, count: data.total },
      });

      if (dir === 0 && from) {
        const obj = width > 600 ? ref.current : conRef.current;
        obj.scrollTop = (obj.scrollHeight - obj.clientHeight) / 2;
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch({ type: 'FETCH_FAILED' });
      }
    } finally {
      setCancelSource(null);
    }
  };

  const handleScroll = (e) => {
    if (upFetching || downFetching) return;

    const obj = e.target;
    if (obj.scrollHeight - obj.clientHeight - obj.scrollTop < 100) {
      fetchNFTs(1);
    } else if (obj.scrollTop < 100 && from > 0) {
      fetchNFTs(-1);
    }
  };

  useEffect(() => {
    setPrevNumPerRow(numPerRow);
    if (isNaN(numPerRow) || (prevNumPerRow && prevNumPerRow !== numPerRow))
      return;
    fetchNFTs(0);
  }, [
    collections,
    groupType,
    category,
    sortBy,
    statusBuyNow,
    statusHasBids,
    statusHasOffers,
    statusOnAuction,
    numPerRow,
  ]);

  const updateItems = async () => {
    try {
      if (!authToken) {
        if (prevAuthToken) {
          dispatch({
            type: 'UPDATE_TOKENS',
            payload: { tokens: tokens.map(tk => ({ ...tk, isLiked: false })) },
          });
        }
        return;
      }
      let missingTokens = tokens.map((tk, index) =>
        tk.items
          ? { index, isLiked: tk.isLiked, bundleID: tk._id }
          : { index, isLiked: tk.isLiked, contractAddress: tk.contractAddress, tokenID: tk.tokenID }
      );
      if (prevAuthToken) {
        missingTokens = missingTokens.filter(tk => tk.isLiked === undefined);
      }

      if (missingTokens.length === 0) return;

      const cancelTokenSource = axios.CancelToken.source();
      setLikeCancelSource(cancelTokenSource);
      const { data, status } = await getItemsLiked(
        missingTokens,
        authToken,
        cancelTokenSource.token
      );
      if (status === 'success') {
        const newTokens = [...tokens];
        missingTokens.forEach((tk, idx) => {
          newTokens[tk.index].isLiked = data[idx].isLiked;
        });
        dispatch({ type: 'UPDATE_TOKENS', payload: { tokens: newTokens } });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLikeCancelSource(null);
    }
  };

  useEffect(() => {
    if (likeCancelSource) {
      likeCancelSource.cancel();
    }
    if (tokens.length) {
      updateItems();
    }
  }, [tokens, authToken]);

  return (
    <>
      
      <div
        ref={conRef}
        className={styles.container}
        onScroll={width <= 600 ? handleScroll : null}
      >
        <div className={cx(styles.sidebar, collapsed && styles.collapsed)}>
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
              loading={upFetching || downFetching}
              category={category}
            />
          </div>
          <div
            ref={ref}
            className={styles.exploreAll}
            onScroll={width > 600 ? handleScroll : null}
          >
            <NFTsGrid
              items={tokens}
              uploading={upFetching}
              loading={downFetching}
              numPerRow={numPerRow}
              category={category}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ExploreAllPageWrapper = () => (
  <FilterProvider>
  <ExploreProvider>
    <ExploreAllPage />
  </ExploreProvider>
  </FilterProvider>
);

export default ExploreAllPageWrapper;
