// import iconArt from 'assets/svgs/rainbow.svg';
import blockChain from '../../../public/images/imgs/blockchain.png';
import brickAndMotors from '../../../public/images/imgs/brick_mortar.png';
import ecommerce from '../../../public/images/imgs/ecommerce.png';
import hybrid from '../../../public/images/imgs/hybrid.png';
// import iconTrading from 'assets/svgs/cardboard.svg';
// import iconVirtual from 'assets/svgs/monster.svg';
// import iconDomain from 'assets/svgs/domain.svg';

export const GroupFilters = [
  {
    value: 'all',
    label: 'All Items',
  },
  {
    value: 'single',
    label: 'Single Items',
  },
  // {
  //   value: 'bundle',
  //   label: 'Bundles',
  // },
];

export const Categories = [
  {
    id: 0,
    icon: blockChain,
    label: 'Blockchain Assets',
    color: '#16a34a',
  },
  {
    id: 1,
    icon: ecommerce,
    label: 'E-commerce assets',
    color: '#888',
  },
  {
    id: 2,
    icon: brickAndMotors,
    label: 'Brick and mortar assets',
    color: '#FC466B',
  },
  {
    id: 3,
    icon: hybrid,
    label: 'Hybrid assets',
    color: '#1969ff',
  },
  // {
  //   id: 4,
  //   icon: all,
  //   label: 'Trading Cards',
  // },
  // {
  //   id: 5,
  //   icon: iconVirtual,
  //   label: 'Virtual Worlds',
  // },
  // {
  //   id: 6,
  //   icon: iconDomain,
  //   label: 'Domain Names',
  // },
];

export const SortByOptions = [
  {
    id: 'createdAt',
    label: 'Recently Created',
  },
  {
    id: 'oldest',
    label: 'Oldest',
  },
  {
    id: 'listedAt',
    label: 'Recently Listed',
  },
  {
    id: 'soldAt',
    label: 'Recently Sold',
  },
  {
    id: 'saleEndsAt',
    label: 'Ending Soon',
  },
  {
    id: 'price',
    label: 'Highest Price',
  },
  {
    id: 'cheapest',
    label: 'Lowest Price',
  },
  {
    id: 'lastSalePrice',
    label: 'Highest Last Sale',
  },
  {
    id: 'viewed',
    label: 'Mostly Viewed',
  },
];

const FilterConstants = {
  UPDATE_STATUS_FILTER: 'UPDATE_STATUS_FILTER',
  UPDATE_COLLECTIONS_FILTER: 'UPDATE_COLLECTIONS_FILTER',
  UPDATE_CATEGORIES_FILTER: 'UPDATE_CATEGORIES_FILTER',
  UPDATE_GROUP_TYPE_FILTER: 'UPDATE_GROUP_TYPE_FILTER',
  UPDATE_SORT_BY_FILTER: 'UPDATE_SORT_BY_FILTER',
};

export default FilterConstants;
