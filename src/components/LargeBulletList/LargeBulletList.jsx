import React from 'react';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { getColorCode } from '../../utils/index.js';

export default function LargeBulletList({ content, className, ref }) {
  const { library, config } = require('@fortawesome/fontawesome-svg-core');
  library.add(fas);

  return (
    <div
      ref={ref}
      className={`${className} large-bullet-list-container flex flex-column`}
    >
      {content.title && <h2>{content.title}</h2>}
      {content.subHeader && (
        <p className='bullet-preamble large-text'>{content.subHeader}</p>
      )}

      {content.bullets.map((bullet, index) => {
        return (
          <div
            className='bullet-content max-width-45 flex flex-row flex-align-center bg-grey-25 borderradius--xxs padding--xs'
            key={index}
          >
            <div className='circle-icon'>
              {content.listType === 'UNORDERED' ? (
                <FontAwesomeIcon
                  icon={['fas', 'arrow-right']}
                  color={getColorCode('orange-500')}
                />
              ) : (
                <FontAwesomeIcon
                  icon={['fas', `${index + 1}`]}
                  color={getColorCode('orange-500')}
                />
              )}
            </div>
            <DocumentRenderer document={bullet.bodyText} />
          </div>
        );
      })}
    </div>
  );
}
