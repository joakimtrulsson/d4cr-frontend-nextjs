import Image from 'next/image';
import Link from 'next/link';

import { QuoteMarksSvg, ArrowRightSvg } from '../index.js';
import { getColorCode } from '../../utils';

const CaseCard = ({ link, quote, title, img, linkType }) => {
  let linkText = '';

  if (linkType === 'internal') {
    linkText = 'Read our case';
  } else if (linkType === 'external') {
    linkText = 'Go to their website';
  }

  return (
    <div className='case-card-container'>
      <div className='img-div'>
        <Image
          className='case-img'
          src={img}
          layout='responsive'
          width={100}
          height={80}
          objectFit='cover'
          alt='showing the logo for the case'
        />
      </div>
      <div className='case-card-right'>
        <div className='text-div'>
          <h3>{title}</h3>
          <div className='quote-div'>
            <QuoteMarksSvg width='46' height='34' color={getColorCode('grey-200')} />

            <p className='quote'>{quote}</p>
          </div>
        </div>
        <div className='link-container'>
          {link &&
            (linkType === 'external' ? (
              <a
                href={`https://${link}`}
                target='_blank'
                rel='noopener noreferrer'
                className='link-div'
              >
                <p className='text-link small-text'>{linkText}</p>
                <ArrowRightSvg
                  className={'img-link'}
                  width='13'
                  height='13'
                  color={getColorCode('orange-500')}
                />
              </a>
            ) : (
              <Link href={link} className='link-div'>
                <p className='text-link small-text'>{linkText}</p>
                <ArrowRightSvg
                  className={'img-link'}
                  width='13'
                  height='13'
                  color={getColorCode('orange-500')}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CaseCard;
