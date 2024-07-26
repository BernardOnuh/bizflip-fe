import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import styles from './styles.module.scss';
import { Categories } from '../constants/filter.constants';
import FilterActions from '../actions/filter.actions';

// Use dynamic import for the Card component if it's large or has heavy dependencies
const Card = dynamic(() => import('../NFTCard'), {
  ssr: false, // If the component requires client-side rendering only
});

const NFTsGrid = ({
  items,
  numPerRow,
  uploading,
  loading,
  showCreate,
  category,
  onCreate = () => {},
  onLike = () => {},
}) => {
  const n = numPerRow || 6;
  const className = cx(styles.nft, styles[`num${n}`]);

  return (
    <>
      {showCreate && (
        <div className={className}>
          <Card create onCreate={onCreate} />
        </div>
      )}
      {uploading &&
        new Array(n * 2).fill(0).map((_, idx) => (
          <div className={className} key={idx}>
            <Card loading />
          </div>
        ))}
      {(items || []).map(item => (
        <div
          className={className}
          key={
            item.items ? item._id : `${item.contractAddress}-${item.tokenID}`
          }
        >
          <Card item={item} onLike={onLike} />
        </div>
      ))}
      {loading &&
        new Array(n * 2).fill(0).map((_, idx) => (
          <div className={className} key={idx}>
            <Card loading />
          </div>
        ))}
      {!items.length && category !== null && category !== undefined && (
        <>
          <div style={{ display: 'flex' }}>
            No results found for the {Categories[category].label} category.
          </div>
          <div
            onClick={() => dispatch(FilterActions.updateCategoryFilter(null))}
            className={styles.link}
          >
            Select all categories
          </div>
        </>
      )}
    </>
  );
};

export default NFTsGrid;
