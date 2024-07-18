import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Footer.module.scss';
import {
  BsDiscord,
  BsTwitter,
  BsInstagram,
  BsReddit,
  BsYoutube,
} from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
//import { Categories } from 'src/constants/filter.constants';
//import Chat from './Chatbox/chat'
import Image from 'next/image';
import logo from '../../../public/images/imgs/logo.png';

const Footer = ({ border }) => {
  const router = useRouter();

  const handleViewCategory = id => {
    // Implement your category filter update logic here
    // Example:
    // updateCategoryFilter(id === 'all' ? null : id);
    router.push('/explore');
  };

  const iframe =
    '<iframe frameborder="0" style="height:500px;width:99%;border:none;" src="https://forms.zohopublic.com/bizfip/form/EmailSubscription/formperma/HXUPLUQG9rlzmG0hSsEaP5JT9bz-ziky41irSYjKa_Q"></iframe>';

  function Iframe(props) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }}
      />
    );
  }

  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        
        <div className={styles.footerSocial}>
          <div className={styles.stayLoop}>
            <div>
              <form
                action="https://forms.zohopublic.com/bizfip/form/EmailSubscription/formperma/jJmYBW8BqrpFC0rrMXBsRuk4VcVjrCoasmaIN3_LG9Q/htmlRecords/submit"
                name="form"
                id="form"
                method="POST"
                acceptCharset="UTF-8"
                encType="multipart/form-data"
              >
                <input type="hidden" name="zf_referrer_name" value="" />
                <input type="hidden" name="zf_redirect_url" value="" />
                <input type="hidden" name="zc_gad" value="" />
                <h2 className='md:text-2xl text-xl text-white font-bold font-roboto py-5 '>Stay in the loop</h2>

                <div className={styles.newsLetter}>
                  <input
                    name="Email"
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter Email Address"
                  />
                  <button className={styles.button}>Sign up</button>
                </div>
                <p className='font-roboto py-5  w-[80%]'>
                  Join our mailing list to stay in the loop with bizflip newest
                  feature releases, new listings and insider tips and tricks
                </p>
              </form>
            </div>
          </div>
          <div className={styles.socialList}>
            <h3 className='text-[20px]'>Join the community</h3>
            <div className='flex gap-[8px] mt-2'>
              <div>
                <Link
                  href="https://discord.gg/9v2fmYqbYd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsDiscord />
                </Link>
              </div>
              <div>
                <Link
                  href="https://twitter.com/bizflipmarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsTwitter />
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.instagram.com/bizflip.io/?next=%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsInstagram />
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.Reddit.com/r/bizflip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsReddit />
                </Link>
              </div>
              <div>
                <Link
                  href="https://m.youtube.com/channel/UCaDnvGeQQFyIboVxEfIcKfQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <BsYoutube />
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.tiktok.com/@bizflip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footerIcons}
                >
                  <FaTiktok />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerCategories}>
        <div className={styles.footerLogo}>
          <Image src={logo} alt="logo" className={styles.logo} />
          <p>
            The world&apos;s first and best web3 based solution for asset
            acquisition. Join a community of dreamers, innovators and doers.
            From builders to investors, bring your dreams to fruition. Tap &
            swipe on assets available. You never know when you&apos;ll find the
            next hidden gem. Bizflip allows users to list assets in e-commerce,
            brick and mortar, dapps &amp; so much more. From cash flowing and
            profitable to pre-seed ventures, this is where you&apos;ll find it all.
          </p>
        </div>
          <div className={styles.footerList}>
            <h4>My Account</h4>
            <ul>
              <li>Profile</li>
              <li>Settings</li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <h4>Resources</h4>
            <ul>
              <li>Help center</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className={styles.footerList}>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>Careers</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerServices}>
          <div className={styles.footerCompany}>
            <p>© 2023 The Smile Guys Inc, All Rights Reserved.</p>
          </div>
          <div className={styles.footerServicePages}>
            <Link href="/privacy-policy" passHref>
              <span style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms-of-service" passHref>
              <span style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                Terms of Service
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
