import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import TopWave from '../TopWave/TopWave.jsx';
import BottomWave from '../BottomWave/BottomWave.jsx';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import SecondaryButton from '../SecondaryButton/SecondaryButton.jsx';
import PopupForm from '../ShareForm/ShareForm.jsx';
import SlackForm from '../SlackForm/SlackForm.jsx';
import getColorCode from '../../utils/colorCode.js';
import { ensureValidUrl } from '../../utils/modalFunctions.js';

export default function TextMediaComponent({ content }) {
  const url1 = content.cta1?.url ? ensureValidUrl(content.cta1?.url) : content.cta1?.page;
  const url2 = content.cta2?.url ? ensureValidUrl(content.cta2?.url) : content.cta2?.page;

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
  function exitVideo() {
    setSlideOut(true); // Start the slide-out animation
    // Wait for the animation to complete before hiding the modal
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }
  let bgColorClass, fillColorCode;

  if (content.backgroundColor === 'ORANGE') {
    bgColorClass = 'bg-orange-50';
    fillColorCode = getColorCode('orange-50');
  } else if (content.backgroundColor === 'YELLOW') {
    bgColorClass = 'bg-yellow-50';
    fillColorCode = getColorCode('yellow-50');
  } else {
    bgColorClass = 'bg-purple-50';
    fillColorCode = getColorCode('fill-purple-50');
  }

  return (
    <div className='text-media-section'>
      {(content.border === 'TOP' || content.border === 'TOPBOTTOM') && ( // top wave
        <TopWave fillColorCode={fillColorCode} />
      )}

      <div className={`text-media-background-${bgColorClass} flex flex-justify-center`}>
        <div
          className={`text-and-media-container flex flex-row flex-nowrap flex-justify-center flex-align-center 
                padding-tb--l padding-lr--xl margin-tb--xxxs-negative ${bgColorClass} 
                ${content.imagePosition === 'LEFT' && 'flex-reverse-row'}`}
        >
          {/* check media's position */}
          <div className='text-content flex flex-column flex-nowrap width--s'>
            {/* text content */}
            <h2 className='sub-heading-m margin-t--xxxs margin-b--zero color-orange-600'>
              {content.subHeading}
            </h2>
            <h3 className='heading-2 margin--zero color-orange-800'>{content.title}</h3>
            <DocumentRenderer document={content.preamble} />
            {(content.cta1 || content.cta2) && (
              <>
                <nav className='button-container flex flex-row flex-nowrap flex-justify-start flex-align-center'>
                  {content.cta1 &&
                    url1 &&
                    content.cta1.anchorText &&
                    (url1 === 'share' || url1 === 'slack' ? (
                      <>
                        <PrimaryButton
                          title={content.cta1.anchorText}
                          onClick={clickedBtnCTA1}
                        />
                      </>
                    ) : content.cta1?.url ? (
                      <Link
                        href={url1}
                        className='margin-r--xxxs'
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <PrimaryButton title={content.cta1.anchorText} />
                      </Link>
                    ) : (
                      <Link href={url1} className='margin-r--xxxs'>
                        <PrimaryButton title={content.cta1.anchorText} />
                      </Link>
                    ))}

                  {content.cta2 &&
                    url2 &&
                    content.cta2.anchorText &&
                    (url2 === 'share' || url2 === 'slack' ? (
                      <>
                        <SecondaryButton
                          title={content.cta2.anchorText}
                          onClick={clickedBtnCTA2}
                        />
                      </>
                    ) : content.cta2?.url ? (
                      <Link
                        href={url2}
                        className='margin-r--xxxs'
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <PrimaryButton title={content.cta2.anchorText} />
                      </Link>
                    ) : (
                      <Link className='no-decoration' href={url2}>
                        <SecondaryButton title={content.cta2.anchorText} />
                      </Link>
                    ))}
                </nav>

                <>
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
                      <button onClick={exitVideo} className='btn-exit-video'>
                        X
                      </button>
                      <div className='box'>
                        {shareOrSlack === 'slack' && <SlackForm />}
                        {shareOrSlack === 'share' && <PopupForm />}
                      </div>
                    </div>
                  </div>
                </>
              </>
            )}
          </div>
          <div className='media-content flex flex-justify-center flex-align-center borderradius--xs'>
            {/* media content */}
            {content.image && content.image.url && (
              <Image
                className='center-image'
                src={content.image.url}
                alt={content.image.altText}
                fill={true}
              />
            )}
          </div>
        </div>
      </div>
      {(content.border === 'BOTTOM' || content.border === 'TOPBOTTOM') && ( // bottom wave
        <BottomWave fillColorCode={fillColorCode} />
      )}
    </div>
  );
}
