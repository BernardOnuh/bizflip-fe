import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Select from 'react-dropdown-select';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';
import { ClipLoader } from 'react-spinners';
import styles from './styles.module.scss';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import BootstrapTooltip from '../BootstrapTooltip';
import PriceInput from '../PriceInput';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

// Other necessary imports

const PaintBoard = () => {
 

  const imageRef = useRef();

  const [selected, setSelected] = useState([]);
  const [collections, setCollections] = useState([]);
  const [nft, setNft] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState(null);
  const [fee, setFee] = useState(null);

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [royalty, setRoyalty] = useState('');
  const [xtra, setXtra] = useState('');
  const [supply, setSupply] = useState(0);
  const [hasUnlockableContent, setHasUnlockableContent] = useState(false);
  const [unlockableContent, setUnlockableContent] = useState('');
  const [nftType, setNftType] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [age, setAge] = useState('');
  const [netProfit, setNetProfit] = useState('');

  const [currentMintingStep, setCurrentMintingStep] = useState(0);
  const [isMinting, setIsMinting] = useState(false);

  const [lastMintedTnxId, setLastMintedTnxId] = useState('');

 

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => setImage(acceptedFiles[0]),
  });

  const removeImage = () => setImage(null);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.board}>
          <div {...getRootProps({ className: styles.uploadCont })}>
            <input {...getInputProps()} ref={imageRef} />
            {image ? (
              <>
                <img
                  className={styles.image}
                  src={URL.createObjectURL(image)}
                />
                <div className={styles.overlay}>
                  <CloseIcon className={styles.remove} onClick={removeImage} />
                </div>
              </>
            ) : (
              <>
                <div className={styles.uploadtitle}>
                  Drop files here or&nbsp;
                  <span
                    className={styles.browse}
                    onClick={() => imageRef.current?.click()}
                  >
                    browse
                  </span>
                </div>
                <div className={styles.uploadsubtitle}>
                  JPG, PNG, BMP, GIF Max 15mb.
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelInputs}>
            <div className={styles.panelLeft}>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Collection</p>
                <Select
                  options={collections}
                  disabled={isMinting}
                  values={selected}
                  onChange={([col]) => {
                    setSelected([col]);
                    setNft(col.erc721Address);
                    setType(col.type);
                  }}
                  className={styles.select}
                  placeholder="Choose Collection"
                  itemRenderer={({ item, methods }) => (
                    <div
                      key={item.erc721Address}
                      className={styles.collection}
                      onClick={() => {
                        methods.clearAll();
                        methods.addItem(item);
                      }}
                    >
                      <img
                        src={`${getRandomIPFS('', true)}${item.logoImageHash}`}
                        className={styles.collectionLogo}
                      />
                      <div className={styles.collectionName}>
                        {item.collectionName}
                      </div>
                    </div>
                  )}
                  contentRenderer={({ props: { values } }) =>
                    values.length > 0 ? (
                      <div className={styles.collection}>
                        <img
                          src={`https://cloudflare-ipfs.com/ipfs/${values[0].logoImageHash}`}
                          className={styles.collectionLogo}
                        />
                        <div className={styles.collectionName}>
                          {values[0].collectionName}
                        </div>
                      </div>
                    ) : (
                      <div className={styles.collection} />
                    )
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Name</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  maxLength={40}
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  disabled={isMinting}
                  inputProps={{ maxLength: 40 }}
                />
                <div className={styles.lengthIndicator}>{name.length}/40</div>
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Symbol</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  maxLength={20}
                  placeholder="Symbol"
                  value={symbol}
                  onChange={e => setSymbol(e.target.value)}
                  disabled={isMinting}
                  inputProps={{ maxLength: 20 }}
                />
                <div className={styles.lengthIndicator}>{symbol.length}/20</div>
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Asset type</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  maxLength={20}
                  placeholder="Asset Type"
                  value={nftType}
                  onChange={e => setNftType(e.target.value)}
                  disabled={isMinting}
                  inputProps={{ maxLength: 20 }}
                />
                <div className={styles.lengthIndicator}>
                  {nftType.length}/20
                </div>
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Description</p>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  maxLength={120}
                  placeholder="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  disabled={isMinting}
                  inputProps={{ maxLength: 120 }}
                />
                <div className={styles.lengthIndicator}>
                  {description.length}/120
                </div>
              </div>
            </div>

            <div className={styles.panelRight}>
              {type === 1155 && (
                <div className={styles.formGroup}>
                  <p className={styles.formLabel}>Supply</p>
                  <PriceInput
                    className={styles.formInput}
                    placeholder="Supply"
                    decimals={0}
                    value={'' + supply}
                    onChange={setSupply}
                    disabled={isMinting}
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>
                  Royalty (%)&nbsp;
                  <Tooltip
                    title="If you set a royalty here, you will get X percent of sales price each time an NFT is sold on our platform."
                    placement="top"
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                </p>
                <PriceInput
                  className={styles.formInput}
                  placeholder="Royalty"
                  decimals={2}
                  value={'' + royalty}
                  onChange={val =>
                    val[val.length - 1] === '.' ||
                    val[val.length - 1] === ','
                      ? setRoyalty(val)
                      : setRoyalty(parseFloat(val) || '')
                  }
                  disabled={isMinting}
                />
              </div>
             
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Revenue</p>
                <PriceInput
                  className={styles.formInput}
                  placeholder="Revenue"
                  decimals={10}
                  value={'' + revenue}
                  onChange={setRevenue}
                  disabled={isMinting}
                />
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Net Profit</p>
                <PriceInput
                  className={styles.formInput}
                  placeholder="Net Profit"
                  decimals={10}
                  value={'' + netProfit}
                  onChange={setNetProfit}
                  disabled={isMinting}
                />
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>Age</p>
                <PriceInput
                  className={styles.formInput}
                  placeholder="Age"
                  decimals={0}
                  value={'' + age}
                  onChange={setAge}
                  disabled={isMinting}
                />
              </div>
              <div className={styles.formGroup}>
                <p className={styles.formLabel}>
                  Has unlockable content&nbsp;
                  <Tooltip
                    title="Unlockable content allows you to add special content to your NFT. Only the NFT owner will be able to see it."
                    placement="top"
                  >
                    <HelpOutlineIcon />
                  </Tooltip>
                </p>
                <Checkbox
                  checked={hasUnlockableContent}
                  onChange={e => setHasUnlockableContent(e.target.checked)}
                  disabled={isMinting}
                />
              </div>
              {hasUnlockableContent && (
                <div className={styles.formGroup}>
                  <p className={styles.formLabel}>Unlockable content</p>
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    maxLength={280}
                    placeholder="Unlockable content"
                    value={unlockableContent}
                    onChange={e => setUnlockableContent(e.target.value)}
                    disabled={isMinting}
                  />
                  <div className={styles.lengthIndicator}>
                    {unlockableContent.length}/280
                  </div>
                </div>
              )}
                <div
          
          className={cx(
            styles.button,
            (isMinting ) && styles.disabled
          )}
          onClick={
            isMinting 
          }
        >
          {isMinting ? (
            <ClipLoader size="16" color="white"></ClipLoader>
          ) : (
            'Mint'
          )}
        </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};

export default PaintBoard;
