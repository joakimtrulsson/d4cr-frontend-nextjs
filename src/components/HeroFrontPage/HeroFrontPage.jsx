import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import {
  CloseIcon,
  VideoPlayer,
  PrimaryButton,
  SecondaryButton,
  ShareForm,
  SlackForm,
} from '../index.js';

import { ensureValidUrl } from '../../utils/index.js';

const HeroFrontPage = ({ prop }) => {
  const url1 = prop.ctaOneUrl && ensureValidUrl(prop.ctaOneUrl);
  const url2 = prop.ctaTwoUrl && ensureValidUrl(prop.ctaTwoUrl);

  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnCTA1() {
    setShareOrSlack(url1);
    setIsClicked(true);
  }
  function clickedBtnCTA2() {
    setShareOrSlack(url2);
    setIsClicked(true);
  }
  function exitModal() {
    setSlideOut(true);
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }
  return (
    <main>
      <div className='hero-container'>
        <div className='text-div'>
          <h1 className='title'>{prop.heroTitle}</h1>
          <h4 className='preamble'>
            <DocumentRenderer document={prop.heroPreamble.document} />
          </h4>
          <div className='buttons-bottom flex flex-row'>
            {(prop.ctaTwoUrl || prop.ctaOneUrl) && (
              <nav className='button-container flex margin-tb--xxxs'>
                {url1 === 'share' || url1 === 'slack' ? (
                  <>
                    <SecondaryButton
                      title={prop.ctaOneAnchorText}
                      onClick={clickedBtnCTA1}
                    />
                  </>
                ) : url1.startsWith('/') ? (
                  <Link href={url1}>
                    <PrimaryButton title={prop.ctaOneAnchorText} />
                  </Link>
                ) : (
                  <Link href={url1} rel='noopener noreferrer' target='_blank'>
                    <PrimaryButton title={prop.ctaOneAnchorText} />
                  </Link>
                )}

                {url2 === 'share' || url2 === 'slack' ? (
                  <>
                    <SecondaryButton
                      title={prop.ctaTwoUrlAnchorText}
                      onClick={clickedBtnCTA2}
                    />
                  </>
                ) : url2.startsWith('/') ? (
                  <Link className='no-decoration' href={url2}>
                    <SecondaryButton title={prop.ctaTwoUrlAnchorText} />
                  </Link>
                ) : (
                  <Link
                    href={url2}
                    className='margin-r--xxxs'
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <PrimaryButton title={prop.ctaTwoUrlAnchorText} />
                  </Link>
                )}
              </nav>
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
                  {/* X */}
                  <CloseIcon />
                </button>
                <div className='box'>
                  {shareOrSlack === 'slack' && <SlackForm />}
                  {shareOrSlack === 'share' && <ShareForm />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='video-div'>
          <div className='ball-1'></div>
          <div className='ball-3'></div>
          <div className='ball-2'></div>

          {prop.heroVideo && (
            <Suspense fallback={<p>Loading...</p>}>
              <VideoPlayer video={prop.heroVideo} />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
};

export default HeroFrontPage;
