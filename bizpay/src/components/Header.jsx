import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Drawermob from './Drawermob'; // Ensure this is properly imported

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
      <div className="w-[91%] 3xl:max-w-[1836px] mx-auto mt-[27px] relative">
        <nav className={`top-[27px] fixed nav-bg-top w-[91%] 3xl:max-w-[1836px] z-[99] rounded-[60px] px-[16px] sm:px-2 md:px-8 mx-auto ${showSecondNavbar ? 'show' : ''}`}>
          <div className="flex flex-wrap items-center justify-between mx-auto py-3">
            <Link href="#" passHref>
              <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
                <Image src="/images/Logo.svg" width={48} height={48} alt="Flowbite Logo" />
                <span className="self-center f-f-sm text-tiny whitespace-nowrap text-white">PuppyLove</span>
              </div>
            </Link>
            <button onClick={openDrawer} data-collapse-toggle="navbar-default" type="button" className="mr-3 inline-flex items-center justify-center text-sm md:hidden" aria-controls="navbar-default" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 17 14">
                <path stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row space-x-8 lg:space-x-11 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
                <li>
                  <Link href="#Presale" passHref>
                    <div className="block py-2 px-3 text-white f-f-m text-tiny rounded md:bg-transparent md:p-0 cursor-pointer" aria-current="page">Presale</div>
                  </Link>
                </li>
                <li>
                  <Link href="#Community" passHref>
                    <div className="block py-2 px-3 text-white f-f-m text-tiny rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 cursor-pointer">Community</div>
                  </Link>
                </li>
                <li>
                  <Link href="#Audit" passHref>
                    <div className="block py-2 px-3 text-white f-f-m text-tiny rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 cursor-pointer">
                      <ul className="inline-flex items-center">
                        <li>Audit</li>
                        <li className="ml-3">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 12.75L12.75 5.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.25 5.25H12.75V12.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="https://drive.google.com/file/d/16e3M-ORNDLKlRyAVl30xZU-QTGkHKhXA/view" passHref>
                    <div className="block py-2 px-3 text-white f-f-m text-tiny rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 cursor-pointer">
                      <ul className="inline-flex items-center">
                        <li>Whitepaper</li>
                        <li className="ml-3">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.25 12.75L12.75 5.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.25 5.25H12.75V12.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Drawermob open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
