import React from 'react';

import { ArrowLeftSvg, ArrowRightSvg } from '../index.js';
import { getColorCode } from '../../utils/index.js';

const PrinciplesNavigation = ({
  previousSlug,
  nextSlug,
  principleNumber,
  resolvedUrl,
}) => {
  return (
    <>
      {previousSlug ? (
        <a href={`./${previousSlug}`} className='links image-arrows'>
          <ArrowLeftSvg width='20' height='18' color={getColorCode('grey-900')} />
          <p>Previous</p>
        </a>
      ) : (
        <div className='links image-arrows'>
          <ArrowLeftSvg width='20' height='18' color={getColorCode('grey-200')} />
          <p className='link-no-previous'>Previous</p>
        </div>
      )}

      {principleNumber.map((numbers) => {
        const isActive = resolvedUrl === numbers.principles.slug;
        return (
          <div key={numbers.principles.id}>
            <a
              href={!isActive ? `.${numbers.principles.slug}` : null}
              className={`links`}
            >
              <h2 className={`numbers ${isActive ? 'active-link' : ''}`}>
                {numbers.number}
              </h2>
            </a>
          </div>
        );
      })}

      {nextSlug ? (
        <a href={`./${nextSlug}`} className='links image-arrows'>
          <p>Next</p>

          <ArrowRightSvg width='20' height='18' color={getColorCode('grey-900')} />
        </a>
      ) : (
        <div className='links image-arrows'>
          <p className='link-no-previous'>Next</p>
          <ArrowRightSvg width='20' height='18' color={getColorCode('grey-200')} />
        </div>
      )}
    </>
  );
};

export default PrinciplesNavigation;
