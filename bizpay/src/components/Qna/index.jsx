import Footer from '../Footer/footer'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import styles from './styles.module.scss';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

const steps = [
  {
    label: 'What type of assets are you interested in?',
  },
  {
    label: 'What price range are you looking to acquire at?',
  },
  {
    label: 'Do you promise to act in good faith?',
  },
];

const myData = [
  { value: 0, label: 'Blockchain' },
  { value: 1, label: 'Brick & Mortar' },
  { value: 2, label: 'Ecommerce' },
  { value: 3, label: 'Hybrid' },
];

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{' '}
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const QnA = () => {
  const questionRef = useRef(null);
  const router = useRouter();
  const [activeStepProcess, setActiveStepProcess] = useState(0);
  const [answer1, setAnswer1] = useState([]);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [answer3, setAnswer3] = useState('');
  const { address } = useAccount();

  const handleNextProcess = () => {
    if (!address) {
      // Show connect wallet modal or some indication to the user
      alert('Please connect your wallet');
    } else {
      if (activeStepProcess === 0 && answer1.length === 0) {
        return;
      }
      if (activeStepProcess === 1 && (!min || !max)) {
        return;
      }
      if (activeStepProcess === 2 && !answer3) {
        return;
      }

      if (activeStepProcess === 2) {
        router.push({
          pathname: '/nft-swipe',
          query: {
            _types: answer1.map((item) => item.value).join(','),
            _min: min,
            _max: max,
            _res: answer3,
          },
        });
        return;
      }

      setActiveStepProcess((prevActiveStep) => prevActiveStep + 1);
      questionRef.current.className = styles.question_answer_goneRight;
      setTimeout(() => {
        questionRef.current.className = styles.question_answer_right;
      }, 400);
    }
  };

  const handleBackProcess = () => {
    setActiveStepProcess((prevActiveStep) => prevActiveStep - 1);
    questionRef.current.className = styles.question_answer_goneLeft;
    setTimeout(() => {
      questionRef.current.className = styles.question_answer_left;
    }, 400);
  };

  useEffect(() => {
    // Add any necessary side-effects here
  }, []);

  const handleChange = (event) => {
    setAnswer3(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <MobileStepper
          className={`${styles.bg_transpernt} ${styles.bg_liner}`}
          variant="progress"
          steps={3}
          position="static"
          activeStep={activeStepProcess}
          sx={{
            flexGrow: 1,
            justifyContent: 'center',
            height: '100px',
            '& .MuiLinearProgress-bar1': {
              backgroundImage:
                'linear-gradient(135deg, #3F5EFB 50%, #FC466B 100%)',
            },
            '& .MuiMobileStepper-progress': {
              height: '12px',
              borderRadius: '10px',
              width: '100%',
            },
          }}
        />
        <div className={styles.main}>
          <Box sx={{ flexGrow: 1 }}>
            <div className={styles.mainLeft}>
              <div className={styles.textContainer}>
                <div ref={questionRef} className={styles.question_answer_right}>
                  <div className={styles.bodyText} style={{ marginTop: '50px' }}>
                    {steps[activeStepProcess].label}
                  </div>
                  {activeStepProcess === 0 ? (
                    <ReactSelect
                      options={myData}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{ Option }}
                      onChange={(e) => setAnswer1(e)}
                      allowSelectAll={true}
                      value={answer1}
                      className={styles.dropdownmemue}
                    />
                  ) : activeStepProcess === 1 ? (
                    <>
                      <input
                        name="answer2"
                        type="text"
                        className={styles.formInput}
                        placeholder="Enter Min value"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                      />
                      <input
                        name="answer2"
                        type="text"
                        className={styles.formInput}
                        placeholder="Enter Max value"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </>
                  ) : (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={answer3}
                        onChange={handleChange}
                      >
                        <div className={styles.yes_no}>
                          <FormControlLabel
                            value="Yes"
                            control={<Radio color="default" />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="No"
                            control={<Radio color="default" />}
                            label="No"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                  )}
                </div>
              </div>
              <div
                className={styles.flex}
                style={{
                  marginTop: '50px',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {activeStepProcess !== 0 && (
                  <button
                    className={styles.button}
                    type="submit"
                    onClick={handleBackProcess}
                    disabled={activeStepProcess === 0}
                  >
                    <WestIcon fontSize="large" />
                  </button>
                )}
                {activeStepProcess !== 2 && (
                  <button
                    className={styles.button}
                    type="submit"
                    onClick={handleNextProcess}
                    disabled={activeStepProcess === 2}
                  >
                    <EastIcon fontSize="large" />
                  </button>
                )}
              </div>
            </div>
          </Box>
        </div>
        {activeStepProcess === 2 && (
          <button
            className={`${styles.button} ${styles.mx_auto}`}
            type="button"
            onClick={handleNextProcess}
          >
            Next
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QnA;
