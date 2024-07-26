import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';

const AccordionWrapper = styled(Accordion)({
  marginTop: '-1px !important',
  marginRight: '-1px !important',
  boxShadow: 'none',
  borderRadius: '0 !important',
  border: '1px solid #D9E1EE',
  overflow: 'hidden',
});

const AccordionHeader = styled(AccordionSummary)({
  height: 64,
  minHeight: '64px !important',
  backgroundColor: '#fff',
  boxShadow: 'none',
  padding: '0 24px',
});

const Heading = styled('span')({
  fontWeight: 700,
  fontSize: 16,
  flexShrink: 0,
  color: '#3D3D3D',
});

const AccordionBody = styled(AccordionDetails)({
  padding: '32px 24px',
  borderTop: '1px solid #D9E1EE',
  boxSizing: 'border-box',
  backgroundColor: '#D9E1EE1A',
});

const FilterWrapper = ({ title, classes: classnames, children }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionCollapse = (_, isExpanded) => {
    setExpanded(isExpanded);
  };

  return (
    <div>
      <AccordionWrapper
        expanded={expanded}
        onChange={handleAccordionCollapse}
      >
        <AccordionHeader
          expandIcon={<ExpandMoreIcon />}
        >
          <div>
            <Heading>{title}</Heading>
          </div>
        </AccordionHeader>
        <AccordionBody>
          {children}
        </AccordionBody>
      </AccordionWrapper>
    </div>
  );
};

export default FilterWrapper;
