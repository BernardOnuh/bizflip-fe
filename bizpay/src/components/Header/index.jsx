import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Drawer from './Drawermob'; // Ensure this is properly imported
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CustomWallet from './CustomWallet';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showSecondNavbar, setShowSecondNavbar] = useState(false);

  const openDrawer = () => setOpen(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowSecondNavbar(scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-[100%]  mx-auto  relative bg-black z-[2]">
        <nav className={`fixed nav-bg-top w-[100%]  bg-black  px-[16px] sm:px-2 md:px-8 mx-auto ${showSecondNavbar ? 'show' : ''}`}>
          <div className="flex flex-wrap items-center justify-between mx-auto py-3">
            <Link href="/" passHref>
              <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <Image src="/images/icon.png" width={48} height={48} alt="Flowbite Logo" />
                <span className="self-center font-roboto font-semibold text-lg whitespace-nowrap text-white">bizflip.io</span>
              </div>
            </Link>
            <button onClick={openDrawer} data-collapse-toggle="navbar-default" type="button" className="mr-3 inline-flex items-center justify-center text-sm md:hidden" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 17 14">
                <path stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto my-auto" id="navbar-default">
              <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row space-x-8 lg:space-x-11 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent items-center">
                <li>
                  <Link href="/get-a-valuation" passHref>
                    <div className="block py-2 px-3 text-white  rounded md:bg-transparent md:p-0 cursor-pointer font-roboto font-semibold text-lg" aria-current="page">
                      Get a Valuation
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="#Community" passHref>
                    <div className="block py-2 px-3 text-white font-roboto font-semibold text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 cursor-pointer">
                      Sell Now
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="#Audit" passHref>
                    <div className="block py-2 px-3 text-white font-roboto font-semibold text-lg rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 cursor-pointer">
                      <ul className="inline-flex items-center">
                        <li>Resources</li>
                      </ul>
                  </div>
                </Link>
              </li>
              <li>
                <CustomWallet/>
              </li>
            </ul>
          </div>
          </div>
        </nav>
        <Drawer open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
