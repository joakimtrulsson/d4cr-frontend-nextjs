'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getColorCode from '../../utils/colorCode';
import Icon from '../../styles/assets/graphics/icons/d4cr-icon.png';
import TopWave from '../TopWave/TopWave';
import Banner from '../Banner/Banner';
import { ArrowRightSvg } from '../SvgIcons/SvgIcons';
import SlackForm from '../SlackForm/SlackForm';
import PopupForm from '../ShareForm/ShareForm';
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
    console.log('clicked');
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
            <div
              className='flex flex-row flex-justify-between flex-align-start 
                                padding-t--xxxl padding-b--s'
            >
              <div className='margin-b--m'>
                <Image src={Icon} width={160} height={50} alt='D4CR' />

                <div className='flex flex-column margin-t--xl margin-b--m '>
                  <p className='color-orange-400 padding-l--xs semibold margin--zero margin-b--xxs'>
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

            <nav className='margin-b--xxl  flex flex-row'>
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
            X
          </button>
          <div className='box'>
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <PopupForm />}
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterMenuLink = ({ url, anchorText }) => {
  const rightArrowIcon = { width: '16', height: '14', color: getColorCode('') };

  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnCTA1(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('clicked');
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
  return (
    <>
      {url === 'share' || url === 'slack' ? (
        <div className='color-orange-50 margin-r--xs no-decoration'>
          <button
            className='button color-orange-50 flex flex-row'
            onClick={clickedBtnCTA1}
          >
            <span className='margin-r--xxs'>{anchorText}</span>
            <div className='icon-wrapper'>
              <ArrowRightSvg
                width={rightArrowIcon.width}
                height={rightArrowIcon.height}
                color={rightArrowIcon.color}
              />
            </div>
          </button>
        </div>
      ) : (
        <Link href={url} className='color-orange-50 margin-r--xs no-decoration'>
          <button className='button color-orange-50 flex flex-row'>
            <span className='margin-r--xxs'>{anchorText}</span>
            <div className='icon-wrapper'>
              <ArrowRightSvg
                width={rightArrowIcon.width}
                height={rightArrowIcon.height}
                color={rightArrowIcon.color}
              />
            </div>
          </button>
        </Link>
      )}
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
            X
          </button>
          <div className='box'>
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <PopupForm />}
          </div>
        </div>
      </div>
    </>
  );
};

const SocialMediaLink = ({ url, icon }) => {
  const socialplatformIcons = {
    width: '28',
    height: '30',
    color: getColorCode('turquoise-600'),
  };

  const fullUrl =
    url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  return (
    <a
      href={fullUrl}
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-justify-center flex-align-center no-decoration borderradius--half 
                  margin--xxs padding--xs bg-turquoise-50'
    >
      {icon && icon.iconName && (
        <FontAwesomeIcon
          icon={['fab', `${icon.iconName}`]}
          style={{
            width: socialplatformIcons.width,
            height: socialplatformIcons.height,
            color: socialplatformIcons.color,
          }}
        />
      )}
    </a>
  );
};
