import React, { useState, useEffect } from 'react';

export default function DropDown(prop) {
  const { showType, groupsBtn, setCurrentPage, setShowType } = prop;

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.matches('.dropClick')) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [showDropdown]);

  return (
    <div className='dropdown margin-t--s'>
      <button onClick={toggleDropdown} className='dropbtn dropClick'>
        {showType}
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
            d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
          />
        </svg>
      </button>

      {showDropdown && (
        <div className='dropdown-content'>
          {showType !== 'All areas' ? (
            <p
              onClick={() => {
                setShowType('All areas');
                setCurrentPage(1);
              }}
            >
              All areas
            </p>
          ) : null}
          {groupsBtn}
        </div>
      )}
    </div>
  );
}
