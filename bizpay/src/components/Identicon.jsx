import React, { useEffect, useRef } from 'react';
import Jazzicon from 'jazzicon';

const Identicon = ({ account, size = 16, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(size, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account, size]);

  return <div ref={ref} {...rest} />;
};

export default Identicon;
