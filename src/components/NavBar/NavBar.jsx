'use client';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  CloseIcon,
  HamburgerMenu,
  SecondaryButton,
  SlackForm,
  ShareForm,
  ChevronDownSvg,
  ChevronUpSvg,
  ChevronRightSvg,
} from '../index.js';
import { ensureValidUrl } from '../../utils/index.js';
import MenuContext from '../../context/MenuContext.js';
import Icon from '../../styles/assets/graphics/icons/d4cr-icon.png';

export default function NavBar() {
  const menuContext = useContext(MenuContext);
  const data = menuContext ? menuContext.mainMenu : null;

  const url = data?.ctaUrl && ensureValidUrl(data.ctaUrl);
  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnCTA1(e) {
    e.stopPropagation();
    e.preventDefault();
    setShareOrSlack(url);
    setIsClicked(true);
  }

  function clickedBtnMenuIfOnlyOne(url) {
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

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveDropdownIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function toggleDropdown(index) {
    setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
  }

  function handleSecondaryButtonClick() {
    url && (window.location.href = url);
  }

  return (
    <>
      {data && data.navigation && (
        <HamburgerMenu
          groups={data.navigation}
          ctaAnchorText={data.ctaAnchorText}
          ctaUrl={data.ctaUrl}
        />
      )}

      <div className='navbar-background'>
        <header
          ref={menuRef}
          className='navbar flex flex-row flex-justify-between flex-align-center padding-tb--xs  bg-white'
        >
          <div className='navbar-icon'>
            <Link className='pointer' href='/'>
              <Image src={Icon} width={150} height={42} alt='D4CR' />
            </Link>
          </div>

          <nav className='flex flex-row flex-align-center'>
            {data &&
              data.navigation &&
              data.navigation.map((group, index) => (
                <React.Fragment key={index}>
                  {group.links.length === 1 ? (
                    <div key={index}>
                      {group.links[0].url === 'share' ||
                      group.links[0].url === 'slack' ? (
                        <>
                          <button
                            className={`nav-button ${
                              activeDropdownIndex === -1
                                ? 'color-orange-500'
                                : 'color-grey-500'
                            }`}
                            onMouseEnter={() => setHoveredButton(-1)}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={(e) =>
                              clickedBtnMenuIfOnlyOne(group.links[0].url, e)
                            }
                          >
                            {group.links[0].anchorText}
                          </button>
                          <div className='progressbar-container'>
                            <div
                              className={`progressbar ${
                                activeDropdownIndex === -1 || hoveredButton === -1
                                  ? 'progressbar-active'
                                  : 'progressbar-deactive'
                              }`}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <Link href={group.links[0].url}>
                          <button
                            className={`nav-button ${
                              activeDropdownIndex === -1
                                ? 'color-orange-500'
                                : 'color-grey-500'
                            }`}
                            onMouseEnter={() => setHoveredButton(-1)}
                            onMouseLeave={() => setHoveredButton(null)}
                          >
                            {group.links[0].anchorText}
                          </button>
                          <div className='progressbar-container'>
                            <div
                              className={`progressbar ${
                                activeDropdownIndex === -1 || hoveredButton === -1
                                  ? 'progressbar-active'
                                  : 'progressbar-deactive'
                              }`}
                            ></div>
                          </div>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div key={index}>
                      <button
                        className={`nav-button ${
                          activeDropdownIndex === index
                            ? 'color-orange-500'
                            : 'color-grey-500'
                        }`}
                        onClick={() => {
                          toggleDropdown(index);
                        }}
                        onMouseEnter={() => setHoveredButton(index)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        {group.groupTitle}{' '}
                        {activeDropdownIndex === index ? (
                          <ChevronUpSvg />
                        ) : (
                          <ChevronDownSvg
                            color={hoveredButton === index ? '#FC7C37' : '#2D2D2D'}
                          />
                        )}
                      </button>

                      <div className='progressbar-container'>
                        <div
                          className={`progressbar ${
                            activeDropdownIndex === index || hoveredButton === index
                              ? 'progressbar-active'
                              : 'progressbar-deactive'
                          }`}
                        ></div>
                      </div>
                      {activeDropdownIndex === index && (
                        <div
                          className={`dropdown-container bg-yellow-300 padding-tb--xxs`}
                        >
                          <ul className='no-bullets flex flex-column'>
                            {group.links.map((link, key) =>
                              link.url === 'share' || link.url === 'slack' ? (
                                <>
                                  <div key={key} className='no-decoration link-div'>
                                    <li
                                      className='dropdown-item padding-tb--xxs padding-l--xs
                             flex flex-row color-yellow-800'
                                      onClick={(e) => {
                                        setActiveDropdownIndex(null);
                                        clickedBtnMenuIfOnlyOne(link.url, e);
                                      }}
                                      onMouseEnter={() => setHoveredItem(key)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      <div
                                        className={`icon-wrapper ${
                                          hoveredItem === key ? 'margin-r--xxs' : ''
                                        }`}
                                      >
                                        <ChevronRightSvg
                                          className={`fa-icon ${
                                            hoveredItem === key ? '' : 'invisible'
                                          }`}
                                        />
                                      </div>
                                      {link.anchorText}
                                    </li>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <Link
                                    key={key}
                                    className='no-decoration'
                                    href={link.url}
                                  >
                                    <li
                                      className='dropdown-item padding-tb--xxs padding-l--xs
                           flex flex-row color-yellow-800'
                                      onClick={() => setActiveDropdownIndex(null)}
                                      onMouseEnter={() => setHoveredItem(key)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      <div
                                        className={`icon-wrapper ${
                                          hoveredItem === key ? 'margin-r--xxs' : ''
                                        }`}
                                      >
                                        <ChevronRightSvg
                                          className={`fa-icon ${
                                            hoveredItem === key ? '' : 'invisible'
                                          }`}
                                        />
                                      </div>

                                      {link.anchorText}
                                    </li>
                                  </Link>
                                </>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            {data &&
              data.ctaAnchorText &&
              url &&
              (url === 'share' || url === 'slack' ? (
                <SecondaryButton
                  className='margin-lr--m'
                  title={data.ctaAnchorText}
                  onClick={clickedBtnCTA1}
                />
              ) : url.startsWith('/') ? (
                <SecondaryButton
                  className='margin-lr--m'
                  title={data.ctaAnchorText}
                  onClick={handleSecondaryButtonClick}
                />
              ) : (
                <Link
                  href={url}
                  className='no-decoration'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <SecondaryButton className='margin-lr--m' title={data.ctaAnchorText} />
                </Link>
              ))}
          </nav>
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
        </header>
      </div>
    </>
  );
}
