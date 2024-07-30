import React, { useEffect, useRef } from 'react';
import blockies from 'ethereum-blockies';

const Identicon = ({ account, size = 16, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined' && account && ref.current) {
      const icon = blockies.create({
        seed: account.toLowerCase(),
        size: 8, // Number of blocks
        scale: size / 8, // Size of each block in pixels
      });
      ref.current.innerHTML = '';
      ref.current.appendChild(icon);
    }
  }, [account, size]);

  return <div ref={ref} {...rest} />;
};

export default Identicon;
