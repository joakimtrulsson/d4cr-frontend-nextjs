import React, { useState } from 'react';

import { abbreviateWord } from '../../utils';

const PrinciplesDropDown = ({ principleNumber, resolvedUrl }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const currentPrinciple = principleNumber.find(
    (numbers) => numbers.principles.slug === resolvedUrl
  );

  return (
    <div className='dropdown principles-dropdown'>
      <button onClick={toggleDropdown} className='dropbtn dropClick'>
        {showDropdown
          ? 'Select Principle'
          : `Principle ${currentPrinciple?.number} - ${abbreviateWord(
              currentPrinciple?.principles.title,
              23
            )}`}
        <svg
          className='dropClick'
          width='12'
          height='12'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='#2D2D2D'
        >
          <path
            className='dropClick'
            d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192

c

12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
          />
        </svg>
      </button>

      {showDropdown && (
        <div className='dropdown-content'>
          {principleNumber.map((numbers) => {
            const isActive = resolvedUrl === numbers.principles.slug;
            return (
              <p
                key={numbers.principles.id}
                onClick={() =>
                  !isActive && (window.location.href = `.${numbers.principles.slug}`)
                }
              >
                {`Principle ${numbers.number} - ${abbreviateWord(
                  numbers?.principles.title,
                  23
                )}`}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PrinciplesDropDown;
