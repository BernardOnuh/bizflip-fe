import React from 'react';


const TxButton = ({ onClick, children, ...rest }) => {


  const handleClick = e => {
   
  };

  return (
    <div {...rest} onClick={handleClick}>
      {children}
    </div>
  );
};

export default TxButton;
