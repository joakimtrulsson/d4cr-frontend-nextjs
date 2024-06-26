import { useState } from 'react';
import Link from 'next/link';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { PrimaryButton, SlackForm, ShareForm, CloseIcon } from '../index.js';
import { getColorCode, ensureValidUrl } from '../../utils/index.js';

export default function Banner({ content }) {
  const { library } = require('@fortawesome/fontawesome-svg-core');
  library.add(fas);

  const url = content?.cta?.url && ensureValidUrl(content.cta.url);

  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [shareOrSlack, setShareOrSlack] = useState('');

  function clickedBtnCTA1(e) {
    e.stopPropagation();
    e.preventDefault();

    if (url === 'share' || url === 'slack') {
      setShareOrSlack(url);
    } else if (url === undefined) {
      setShareOrSlack('slack');
    }
    // setShareOrSlack(url);

    setIsClicked(true);
  }

  function exitModal() {
    setSlideOut(true);
    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }

  let bgColorClass;

  if (content.backgroundColor === 'ORANGE') {
    bgColorClass = 'bg-orange-50';
  } else if (content.backgroundColor === 'YELLOW') {
    bgColorClass = 'bg-yellow-50';
  } else {
    bgColorClass = 'bg-orange-50';
  }

  return (
    <>
      <div
        className={`banner ${bgColorClass} 
        padding--xl borderradius--xxs`}
      >
        <div
          className={`icon-wrapper flex flex-justify-center flex-align-center bg-orange-100
             borderradius--half  margin-l--xxs`}
        >
          <FontAwesomeIcon
            icon={['fas', content.iconName ? content.iconName : 'star']}
            color={getColorCode('orange-500')}
            size='lg'
          />
        </div>

        <div className='banner-text-and-button-container'>
          <div className='banner-text margin-lr--s'>
            <h4 className='banner-title margin--zero color-grey-700'>{content.title}</h4>
            <div className='banner-preamble'>
              <DocumentRenderer
                document={
                  content.preamble.document ? content.preamble.document : content.preamble
                }
              />
            </div>
          </div>
          {url &&
            (url === 'share' || url === 'slack' ? (
              <PrimaryButton
                className='banner-button margin-r--xxs'
                title={content.cta?.anchorText}
                onClick={clickedBtnCTA1}
              />
            ) : (
              <Link href={url} className='banner-button margin-r--xxs'>
                <PrimaryButton title={content.cta?.anchorText} />
              </Link>
            ))}

          {!url && (
            <PrimaryButton
              className='banner-button'
              title='Fill out form'
              onClick={clickedBtnCTA1}
            />
          )}
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
            {/* X */}
            <CloseIcon />
          </button>
          <div className='box'>
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <ShareForm />}
          </div>
        </div>
      </div>
    </>
  );
}
