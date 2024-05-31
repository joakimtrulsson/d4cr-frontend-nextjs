import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { getColorCode } from '../../utils/index.js';
import { ArrowRightSvg, ShareForm, SlackForm } from '../index.js';

const FooterMenuLink = ({ url, anchorText }) => {
  const rightArrowIcon = { width: '16', height: '14', color: getColorCode('') };

  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnCTA1(e) {
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
            {shareOrSlack === 'share' && <ShareForm />}
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterMenuLink;
