import PrimaryButton from '../themes/components/buttons/primary-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import getColorCode from '../themes/sources/js/color-code';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { useState } from 'react';
import SlackForm from '../themes/components/popup-form-slack';
import PopupForm from '../themes/components/popup-form-share';
import Link from 'next/link'
import { ensureValidUrl } from '../../src/themes/sources/js/modal-functions.js'

export default function Banner({ content }) {

  const { library } = require('@fortawesome/fontawesome-svg-core');
  library.add(fas);

  const url = content?.cta?.url && ensureValidUrl(content.cta.url);

  const [isClicked, setIsClicked] = useState(false)
  const [slideOut, setSlideOut] = useState(false)
  const [shareOrSlack, setShareOrSlack] = useState('')

  function clickedBtnCTA1(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('clicked')
    setShareOrSlack(url)
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
      <div
        className='banner flex flex-row flex-justify-between flex-align-center bg-orange-50 
        padding--s width--l min-width-35 borderradius--xxs'
      >
        <div
          className='icon-wrapper flex flex-justify-center flex-align-center bg-orange-100 
             borderradius--half padding--s margin-l--xxs'
        >
          <FontAwesomeIcon
            icon={['fas', 'star']}
            color={getColorCode('orange-500')}
            size='lg'
          />
        </div>

        <div className='margin-lr--s'>
          <h4 className='margin--zero color-grey-700'>{content.title}</h4>
          <DocumentRenderer
            document={
              content.preamble.document ? content.preamble.document : content.preamble
            }
          />
        </div>
        {
          url && ((url === 'share' || url === 'slack') ? (

            <PrimaryButton className='margin-r--xxs' title={content.cta?.anchorText} onClick={clickedBtnCTA1} />

          ) : (
            <Link href={url} className='margin-r--xxs'>
              <PrimaryButton title={content.cta?.anchorText} />
            </Link>
          ))
        }
      </div>

      < div className={` ${isClicked ? 'clicked' : 'not-clicked'} ${slideOut ? 'clicked-exit' : ''}`}>
        <div className={`modal flex flex-column flex-align-center ${slideOut ? 'slide-out' : ''}`}>
          <button onClick={exitModal} className="btn-exit-video">X</button>
          <div className="box">
            {shareOrSlack === 'slack' && <SlackForm />}
            {shareOrSlack === 'share' && <PopupForm />}
          </div>
        </div>
      </div>
    </>
  );
}


