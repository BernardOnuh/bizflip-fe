// components/Drawer.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomWallet from './CustomWallet';

const Drawer = ({ open, setOpen }) => {
  const closeDrawer = () => setOpen(false);
  const router = useRouter();

  const handleExternalLink = (url) => {
    closeDrawer();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
      ></div>
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-black p-4 transform transition-transform z-50 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 text-right">
          <button className="text-blue-gray-500" onClick={closeDrawer}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="pl-4 font-roboto font-semibold">
          <li>
            <CustomWallet/>
          </li>
          <li className="mt-6">
            <Link href="#Audit">
              <span onClick={closeDrawer} className="cursor-pointer text-white">
                Get a Valuation
              </span>
            </Link>
          </li>
          <li className="mt-6">
            <span
              onClick={() => handleExternalLink('https://drive.google.com/file/d/16e3M-ORNDLKlRyAVl30xZU-QTGkHKhXA/view')}
              className="cursor-pointer text-white"
            >
              Sell Now
            </span>
          </li>
          <li className="mt-6">
            <Link href="#Community">
              <span onClick={closeDrawer} className="cursor-pointer text-white">
                Bizflip Broker
              </span>
            </Link>
          </li>
          <li className="mt-6">
            <Link href="#Community">
              <span onClick={closeDrawer} className="cursor-pointer text-white">
                Road Map
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
