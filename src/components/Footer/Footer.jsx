'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fab } from '@fortawesome/free-brands-svg-icons';

import {
  TopWave,
  Banner,
  SlackForm,
  ShareForm,
  CloseIcon,
  ArrowRightSvg,
  SocialMediaLink,
  FooterMenuLink,
} from '../index.js';
import { getColorCode } from '../../utils/index.js';

import Icon from '../../styles/assets/graphics/icons/d4cr-icon.png';

import MenuContext from '../../context/MenuContext';

export default function Footer() {
  const menuContext = useContext(MenuContext);
  const [hoveredItem, setHoveredItem] = React.useState({ index: null, key: null });
  const { library } = require('@fortawesome/fontawesome-svg-core');
  library.add(fab);

  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnMenu(url, e) {
    e.stopPropagation();
    e.preventDefault();
    setShareOrSlack(url);
    setIsClicked(true);
  }

  function exitModal() {
    setSlideOut(true);
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }
  if (!menuContext) {
    return null;
  }
  const {
    mainMenu: mainMenuContent,
    footerBanner: bannerContent,
    footerJoinUs: joinUsContent,
    footerMenu: footerMenuContent,
  } = menuContext;

  const rightArrowIcon = { width: '16', height: '14', color: getColorCode('') };

  const urlIconPairs = [];
  for (let i = 1; i <= 4; i++) {
    urlIconPairs.push({ url: joinUsContent[`url${i}`], icon: joinUsContent[`icon${i}`] });
  }
  return (
    <footer className='site-footer full-width-height flex flex-column flex-justify-center flex-align-center'>
      {bannerContent && <Banner content={bannerContent} />}

      <div className='margin-b--xxxs-negative full-width-height'>
        <TopWave fillColorCode={getColorCode('grey-700')} />
      </div>

      <div className='bg-grey-700 full-width-height'>
        <div className='site-footer__content'>
          <div className='flex flex-column full-width-height'>
            <div className='site-footer__mobile flex flex-row flex-justify-between flex-align-start padding-t--xxxl padding-b--s'>
              <div className='site-footer__logo margin-b--m'>
                <Image src={Icon} width={160} height={50} alt='D4CR' />

                <div className='site-footer__joincontainer flex flex-column margin-t--xl margin-b--m '>
                  <p className='site-footer_jointitle color-orange-400 padding-l--xs semibold margin--zero margin-b--xxs'>
                    Join us
                  </p>
                  <nav className='footer__social-links flex flex-justify-center flex-align-center'>
                    {urlIconPairs.map((pair, index) => (
                      <SocialMediaLink key={index} {...pair} />
                    ))}
                  </nav>
                </div>
              </div>

              <div className='menu-footer flex flex-row flex-justify-end'>
                {mainMenuContent &&
                  mainMenuContent.navigation &&
                  mainMenuContent.navigation.map((group, index) => (
                    <nav key={index} className='margin-l--m'>
                      <p className='color-orange-400 semibold margin--zero margin-b--xxs'>
                        {group.groupTitle}
                      </p>

                      <ul className='no-bullets flex flex-column'>
                        {group.links &&
                          group.links.map((link, key) =>
                            link.url === 'share' || link.url === 'slack' ? (
                              <div key={key} className='no-decoration'>
                                <li
                                  className='margin-tb--xxs color-orange-50 width--40'
                                  onMouseEnter={() =>
                                    setHoveredItem({ index: index, key: key })
                                  }
                                  onMouseLeave={() =>
                                    setHoveredItem({ index: null, key: null })
                                  }
                                >
                                  <button
                                    className='button color-orange-50 flex flex-row'
                                    onClick={(e) => clickedBtnMenu(link.url, e)}
                                  >
                                    <span
                                      className={`${
                                        hoveredItem === key
                                          ? 'margin-r--xs'
                                          : 'margin-r--xxs'
                                      }`}
                                    >
                                      {link.anchorText}
                                    </span>
                                    <div className='icon-wrapper'>
                                      <ArrowRightSvg
                                        width={rightArrowIcon.width}
                                        height={rightArrowIcon.height}
                                        color={rightArrowIcon.color}
                                      />
                                    </div>
                                  </button>
                                </li>
                              </div>
                            ) : (
                              <Link key={key} className='no-decoration' href={link.url}>
                                <li
                                  className='margin-tb--xxs color-orange-50 width--40'
                                  onMouseEnter={() =>
                                    setHoveredItem({ index: index, key: key })
                                  }
                                  onMouseLeave={() =>
                                    setHoveredItem({ index: null, key: null })
                                  }
                                >
                                  <button className='button color-orange-50 flex flex-row'>
                                    <span
                                      className={`${
                                        hoveredItem === key
                                          ? 'margin-r--xs'
                                          : 'margin-r--xxs'
                                      }`}
                                    >
                                      {link.anchorText}
                                    </span>
                                    <div className='icon-wrapper'>
                                      <ArrowRightSvg
                                        width={rightArrowIcon.width}
                                        height={rightArrowIcon.height}
                                        color={rightArrowIcon.color}
                                      />
                                    </div>
                                  </button>
                                </li>
                              </Link>
                            )
                          )}
                      </ul>
                    </nav>
                  ))}
              </div>
            </div>

            <nav className='footer-submenu margin-b--xxl  flex flex-row'>
              {footerMenuContent &&
                footerMenuContent.navigation &&
                footerMenuContent.navigation.map((link, index) => (
                  <FooterMenuLink key={index} {...link} />
                ))}
            </nav>
          </div>
        </div>
      </div>
      <div
        className={` ${isClicked ? 'clicked' : 'not-clicked'} ${
          slideOut ? 'clicked-exit' : ''
        }`}
      >
        <div
          className={`modal flex flex-column flex-align-center ${
            slideOut ? 'slide-out' : ''
          }`}
        >
          <button onClick={exitModal} className='btn-exit-video'>
            <CloseIcon />
          </button>
          <div className='box'>
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <ShareForm />}
          </div>
        </div>
      </div>
    </footer>
  );
}
