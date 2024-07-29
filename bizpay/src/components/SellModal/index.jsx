import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Select from 'react-dropdown-select';
import Skeleton from 'react-loading-skeleton';
import PriceInput from '../PriceInput';
import Modal from '../Modal';
import styles from '../Modal/common.module.scss';
import InputError from '../InputError';
import { ClipLoader } from 'react-spinners';


const SellModal = ({
  visible,
  onClose,
  onSell,
  startPrice,
  confirming,
  approveContract, 
  contractApproving,
  contractApproved,
  totalSupply,
}) => {
  const tokens =""
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [focused, setFocused] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenPriceInterval, setTokenPriceInterval] = useState();
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    setPrice(startPrice > 0 ? startPrice.toString() : '');
    setQuantity('1');
    if (visible && tokens?.length) {
      setSelected([tokens[0]]);
    }
  }, [visible, startPrice, tokens]);

  useEffect(() => {
    if (tokens?.length) {
      setOptions(tokens);
    }
  }, [tokens]);

  const getTokenPrice = () => {
    
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

  const handleSellItem = () => {
    let quant = 1;
    if (totalSupply > 1) {
      quant = parseInt(quantity);
    }
    onSell(selected[0], price, quant, alias, email);
  };

  const validateInput = () => {
    if (price.length === 0 || parseFloat(price) === 0) return false;
    if (totalSupply > 1 && quantity.length === 0) return false;
    if (selected.length === 0) return false;
    return true;
  };

  return (
    <Modal
      visible={visible}
      title={startPrice > 0 ? 'Update Your Listing' : 'Sell Your Item'}
      onClose={onClose}
      submitDisabled={
        contractApproving ||
        confirming ||
        (contractApproved && !validateInput()) ||
        inputError
      }
      submitLabel={
        contractApproved ? (
          confirming ? (
            <ClipLoader color="#FFF" size={16} />
          ) : startPrice > 0 ? (
            'Update Price'
          ) : (
            'List Item'
          )
        ) : contractApproving ? (
          'Approving Item'
        ) : (
          'Approve Item'
        )
      }
      onSubmit={() =>
        contractApproved
          ? !confirming && validateInput()
            ? handleSellItem()
            : null
          : approveContract()
      }
    >
      <div className={styles.formGroup}>
        <div className={styles.formLabel}>Price</div>
        <div className={cx(styles.formInputCont, focused && styles.focused)}>
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
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={contractApproving || confirming}
            onInputError={setInputError}
          />
          <div className={styles.usdPrice}>
            {!isNaN(tokenPrice) && tokenPrice !== null ? (
              `$${formatNumber(
                ((parseFloat(price) || 0) * tokenPrice).toFixed(2)
              )}`
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
              disabled={contractApproving || confirming || totalSupply === 1}
            />
          </div>
        </div>
      )}
      <div className={styles.formGroup}>
        <div>
          <div className={styles.formLabel}>Name</div>
          <div className={styles.formInputCont}>
            <input
              className={styles.formInput}
              placeholder="User Name"
              value={alias}
              onChange={e => setAlias(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.formGroup}>
        <div>
          <div className={styles.formLabel}>Email</div>
          <div className={styles.formInputCont}>
            <input
              className={styles.formInput}
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SellModal;
