import React, { useEffect, useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { ClipLoader } from 'react-spinners';
import Select from 'react-dropdown-select';
import cx from 'classnames';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Skeleton from 'react-loading-skeleton';
// import showToast from 'utils/toast'; // Dormant: to be integrated later

// import { formatNumber } from 'utils'; // Dormant: to be integrated later
// import useTokens from 'hooks/useTokens'; // Dormant: to be integrated later
// import { useSalesContract } from 'contracts'; // Dormant: to be integrated later
import PriceInput from '../PriceInput';
import Modal from '../Modal';
import styles from '../Modal/common.module.scss';
import InputError from '../InputError';

const OfferModal = ({
  visible,
  onClose,
  onMakeOffer,
  confirming,
  totalSupply,
  type = 'offer',
  offers,
  account,
}) => {
  const { tokens } = { tokens: [] }; // useTokens(); // Dormant: to be integrated later
  const { getSalesContract } = {}; // useSalesContract(); // Dormant: to be integrated later
  const title = type === 'offer' ? 'Place your offer' : 'Invest';
  const label = type === 'offer' ? 'Place Offer' : 'Invest';
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [endTime, setEndTime] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenPriceInterval, setTokenPriceInterval] = useState();
  const [inputError, setInputError] = useState(null);
  const [isEscrow, setIsEscrow] = useState(0);

  useEffect(() => {
    if (tokens?.length > 0) {
      setOptions(tokens);
    }
  }, [tokens]);

  useEffect(() => {
    if (visible) {
      setPrice('');
      setQuantity('1');
      setEndTime(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
      if (tokens?.length > 1) {
        setSelected([tokens[0]]);
      }
    }
  }, [visible]);

  const hasTokenOffer = () => {
    const result =
      offers.findIndex(
        offer =>
          offer.creator?.toLowerCase() === account?.toLowerCase() &&
          offer.deadline >= new Date().getTime()
      ) > -1;
    return result;
  };

  const CustomRadio = (props) => (
    <Radio
      {...props}
      sx={{
        color: '#1969FF',
        '&.Mui-checked': {
          color: '#1969FF',
        },
      }}
    />
  );

  const getTokenPrice = () => {
    if (tokenPriceInterval) clearInterval(tokenPriceInterval);
    const func = async () => {
      const tk = selected[0].address || ''; // ethers.constants.AddressZero; // Dormant: to be integrated later
      try {
        const salesContract = await getSalesContract();
        const price = await salesContract.getPrice(tk);
        setTokenPrice(parseFloat('0')); // ethers.utils.formatUnits(price, 18))); // Dormant: to be integrated later
      } catch {
        setTokenPrice(null);
      }
    };
    func();
    setTokenPriceInterval(setInterval(func, 60 * 1000));
  };

  useEffect(() => {
    if (selected.length === 0) return;
    getTokenPrice();
  }, [selected]);

  const handleQuantityChange = e => {
    const val = e.target.value;
    if (!val) {
      setQuantity('');
      return;
    }

    if (isNaN(val)) return;

    const _quantity = parseInt(val);
    setQuantity(Math.min(_quantity, totalSupply));
  };

  const handleMakeOffer = () => {
    let quant = 1;
    if (totalSupply > 1) {
      quant = parseInt(quantity);
    }

    if (hasTokenOffer()) {
      // showToast('error', 'You have already submitted the offer'); // Dormant: to be integrated later
      return;
    }

    onMakeOffer(selected[0], price, quant, endTime, tokenPrice, isEscrow);
  };

  const validateInput = () => {
    if (price.length === 0 || parseFloat(price) == 0) return false;
    if (totalSupply > 1 && quantity.length === 0) return false;
    if (endTime.getTime() < new Date().getTime()) return false;
    return true;
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onClose={onClose}
      submitDisabled={confirming || !validateInput() || inputError}
      submitLabel={confirming ? <ClipLoader color="#FFF" size={16} /> : label}
      onSubmit={() =>
        !confirming && validateInput() ? handleMakeOffer() : null
      }
    >
      {type === 'offer' && (
        <div className={styles.inputGroup}>
          <RadioGroup
            className={styles.inputWrapper}
            value={JSON.stringify(isEscrow)}
            onChange={e => setIsEscrow(e.currentTarget.value === 'true')}
          >
            <FormControlLabel
              classes={{
                root: cx(styles.option, !isEscrow && styles.active),
                label: styles.optionLabel,
              }}
              value="false"
              control={<CustomRadio />}
              label="Offer by token"
            />
            <FormControlLabel
              classes={{
                root: cx(styles.option, isEscrow && styles.active),
                label: styles.optionLabel,
              }}
              value="true"
              control={<CustomRadio />}
              label="Offer by Escrow"
            />
          </RadioGroup>
        </div>
      )}
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Price</div>
        <div className={styles.formInputCont}>
          <Select
            options={options}
            disabled={confirming}
            values={selected}
            onChange={tk => {
              setSelected(tk);
            }}
            className={styles.select}
            placeholder=""
            itemRenderer={({ item, itemIndex, methods }) => (
              <div
                key={itemIndex}
                className={styles.token}
                onClick={() => {
                  methods.clearAll();
                  methods.addItem(item);
                }}
              >
                <img src={item?.icon} className={styles.tokenIcon} />
                <div className={styles.tokenSymbol}>{item.symbol}</div>
              </div>
            )}
            contentRenderer={({ props: { values } }) =>
              values.length > 0 ? (
                <div className={styles.selectedToken}>
                  <img src={values[0]?.icon} className={styles.tokenIcon} />
                  <div className={styles.tokenSymbol}>{values[0].symbol}</div>
                </div>
              ) : (
                <div className={styles.selectedToken} />
              )
            }
          />
          <PriceInput
            className={styles.formInput}
            placeholder="0.00"
            decimals={selected[0]?.decimals || 0}
            value={'' + price}
            onChange={setPrice}
            disabled={confirming}
            onInputError={err => setInputError(err)}
          />
          <div className={styles.usdPrice}>
            {!isNaN(tokenPrice) && tokenPrice !== null ? (
              `$${'0.00'}` // formatNumber(((parseFloat(price) || 0) * tokenPrice).toFixed(2))}` // Dormant: to be integrated later
            ) : (
              <Skeleton width={100} height={24} />
            )}
          </div>
        </div>
        <InputError text={inputError} />
      </div>
      {totalSupply !== null && (
        <div className={styles.formGroup}>
          <div className={styles.formLabel}>Quantity</div>
          <div className={styles.formInputCont}>
            <input
              className={styles.formInput}
              placeholder={totalSupply}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={confirming || totalSupply === 1}
            />
          </div>
        </div>
      )}
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Offer Expiration</div>
        <div className={styles.formInputCont}>
          <Datetime
            value={endTime}
            onChange={val => setEndTime(val.toDate())}
            inputProps={{
              className: styles.formInput,
              onKeyDown: e => e.preventDefault(),
              disabled: confirming,
            }}
            closeOnSelect
            isValidDate={cur =>
              cur.valueOf() > new Date().getTime() - 1000 * 60 * 60 * 24
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default OfferModal;
