import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Image from "next/image"
import man from '../../../public/images/imgs/404_man.png'; // Move images to the public folder


import styles from './styles.module.scss';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Next.js does not use Redux directly for header actions
    // If you have global header state or context, update here
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.main}>
          <div className={styles.title}>404</div>
          <div className={styles.subtitle}>
            Oooooops! We couldn’t find the page you’re looking for :(
          </div>
          <div className='flex justify-center'>
          <Link href="/" passHref className={styles.button}>
           
              Back To Home
          </Link>
          </div>
        </div>
        <Image src={man.src} alt="man" className={styles.man} width={200} height={200} />
      </div>
    </div>
  );
};

export default NotFound;
