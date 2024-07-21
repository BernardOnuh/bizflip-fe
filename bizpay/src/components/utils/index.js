import { format } from 'date-fns';
import { Categories } from '../constants/filter.constants';
import { IPFSUris } from '../constants/ipfs.constants';
import MetamaskErrors from '../constants/errors';
import { useProvider } from 'wagmi';
import { parseUnits, getAddress, formatUnits } from 'viem';

export function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

function isValidCode(code) {
  return code in MetamaskErrors ? true : false;
}

export function shortenAddress(address, chars = 4) {
  if (!address) return '';

  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const useHigherGWEI = () => {
  const provider = useProvider();

  const getHigherGWEI = async () => {
    const gasPrice = await provider.request({ method: 'eth_gasPrice' });
    const higherGasPrice = parseUnits(formatUnits(gasPrice, 'wei')) * 2;

    return higherGasPrice;
  };

  return getHigherGWEI;
};

export const getRandomIPFS = (tokenURI, justURL = false) => {
  let random = Math.floor(Math.random() * IPFSUris.length);

  if (justURL) {
    return `${IPFSUris[random]}`;
  }

  if (
    tokenURI.includes('cloudflare') ||
    tokenURI.includes('ipfs.io') ||
    tokenURI.includes('ipfs.infura.io') ||
    tokenURI.includes('artion')
  ) {
    return `${IPFSUris[random]}${tokenURI.split('ipfs/')[1]}`;
  } else if (tokenURI.includes('ipfs://')) {
    return `${IPFSUris[random]}${tokenURI.split('ipfs://')[1]}`;
  }

  return tokenURI;
};

export const formatNumber = num => {
  if (isNaN(num) || num === null) return 0.0;
  let parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export const formatCategory = category => {
  return Categories.find(item => item.id === category).label;
};

export const formatError = error => {
  if (error.data) {
    if (isValidCode(error.data.code)) {
      return MetamaskErrors[String(error.data.code)];
    } else {
      return error.data.message;
    }
  } else {
    if (error.message) {
      let message = error.message;
      let startIndex = message.indexOf('data');

      if (startIndex < 0) {
        if (isValidCode(error.code)) {
          return MetamaskErrors[String(error.code)];
        }
      }

      let code = String(message.substr(startIndex + 14, 6));

      if (isValidCode(code)) {
        return MetamaskErrors[code];
      }
    }
  }

  return 'Error!';
};

const intlFormat = num => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

export const formatFollowers = num => {
  if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
  if (num >= 1000) return intlFormat(num / 1000) + 'k';
  return intlFormat(num);
};

export const calculateGasMargin = value => {
  const base = parseUnits('10000', 0);
  const margin = parseUnits('1000', 0);
  return value.mul(base.add(margin)).div(base);
};

export const formatDate = (date, dateFormat = 'yyyy-MMM-dd hh:mm') =>
  format(date, dateFormat);

export const getLastElementBySelector = selector => {
  try {
    let elements = document.querySelectorAll(selector);
    return elements[elements.length - 1];
  } catch (e) {
    return null;
  }
};

export const scrollToElement = element =>
  element?.scrollIntoView?.({ behavior: 'smooth' });
