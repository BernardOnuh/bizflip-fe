import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const imgCache = {
  __cache: {},
  read(src) {
    if (!src) {
      return;
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
        setTimeout(() => resolve({}), 7000);
      }).then(() => {
        this.__cache[src] = true;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  },
  clearImg: src => {
    delete this.__cache[src];
  },
};

const SuspenseImg = ({ src, alt = '', ...rest }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        await imgCache.read(src);
        setImageLoaded(true);
      } catch {
        setImageLoaded(true);
      }
    };

    loadImage();
  }, [src]);

  if (!imageLoaded) {
    return null; // or a loading spinner component
  }

  return <Image src={src} alt={alt} {...rest} />;
};

export default SuspenseImg;
