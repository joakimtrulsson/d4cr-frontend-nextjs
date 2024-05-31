import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getColorCode } from '../../utils/index.js';

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

export default SocialMediaLink;
