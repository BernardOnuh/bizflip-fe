import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const Jazzicon = dynamic(() => import('jazzicon'), { ssr: false });

const Identicon = ({ account, size = 16, ...rest }) => {
  const ref = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined' && account && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(
        Jazzicon(size, parseInt(account.slice(2, 10), 16))
      );
    }
  }, [account, size]);

  return <div ref={ref} {...rest} />;
};

export default Identicon;
