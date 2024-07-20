import React from 'react';
import { makeStyles } from '@mui/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles(() => ({
  arrow: {
    color: 'black',
  },
  tooltip: {
    backgroundColor: 'black',
    padding: '8px 16px',
    fontSize: 14,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'black',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'black',
    padding: '8px 16px',
    fontSize: 14,
  },
});

export default BootstrapTooltip;
