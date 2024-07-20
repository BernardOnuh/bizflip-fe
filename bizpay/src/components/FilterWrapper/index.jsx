import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  wrapper: {
    marginTop: '-1px !important',
    marginRight: '-1px !important',
    boxShadow: 'none',
    borderRadius: '0 !important',
    border: '1px solid #D9E1EE',
    overflow: 'hidden',
  },
  header: {
    height: 64,
    minHeight: '64px !important',
    backgroundColor: '#fff',
    boxShadow: 'none',
    padding: '0 24px',
  },
  heading: {
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
    color: '#3D3D3D',
  },
  arrowIcon: {
    color: '#3D3D3D',
    opacity: '0.6',
  },
  body: {
    padding: '32px 24px',
    borderTop: '1px solid #D9E1EE',
    boxSizing: 'border-box',
    backgroundColor: '#D9E1EE1A',
  },
  statusSvgDiv: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const FilterWrapper = ({ title, classes: classnames, children }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleAccordionCollapse = (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <div className={`${classes.root} ${classnames?.root || ''}`}>
      <Accordion
        className={classes.wrapper}
        expanded={expanded}
        onChange={handleAccordionCollapse}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.arrowIcon} />}
          className={classes.header}
        >
          <div className={classes.statusSvgDiv}>
            <span className={classes.heading}>{title}</span>
          </div>
        </AccordionSummary>
        <AccordionDetails className={`${classes.body} ${classnames?.body || ''}`}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterWrapper;
