import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import { SecondaryButton } from '../index.js';

import Icon from '../../styles/assets/graphics/icons/d4cr-icon.png';

export default function HamburgerMenu({ groups, ctaAnchorText, ctaUrl }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(null);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const toggleGroup = (index) => {
    setActiveGroupIndex(activeGroupIndex === index ? null : index);
  };

  return (
    <div className='navbar-container'>
      <div className={`navbar-items ${menuOpen ? 'open' : ''}`}>
        <div className='navbar-header'>
          <div className='navbar-logo'>
            <Link className='pointer' href='/'>
              <Image src={Icon} width={100} height={28} alt='D4CR' />
            </Link>
          </div>
          <button className='close-button' onClick={toggleMenu}>
            <FontAwesomeIcon className='close-icon' icon={faTimes} />
            <p>CLOSE</p>
          </button>
        </div>

        {groups.map((group, index) => (
          <>
            <div className='navbar-item-container'>
              {group.links.length > 1 ? (
                <div onClick={() => toggleGroup(index)} className='navbar-item-title'>
                  <a>{group.groupTitle}</a>
                  <FontAwesomeIcon
                    onClick={() => toggleGroup(index)}
                    className='expand-icon'
                    icon={activeGroupIndex === index ? faChevronUp : faChevronDown}
                  />
                </div>
              ) : (
                <Link
                  className={`navbar-single-link ${
                    router.asPath === group.links[0].url ? 'active' : ''
                  }`}
                  onClick={toggleMenu}
                  href={group.links[0].url}
                >
                  <div>
                    <p className='link'>{group.groupTitle}</p>
                  </div>
                </Link>
              )}
            </div>
            {activeGroupIndex === index && (
              <div className='navbar-multiple-items'>
                {group.links.map((link, linkIndex) => (
                  <Link
                    onClick={toggleMenu}
                    className={`navbar-multiple-item ${
                      router.asPath === link.url ? 'active' : ''
                    }`}
                    key={linkIndex}
                    href={link.url}
                  >
                    <span className='bullet'>•</span>
                    <p className='link'>{link.anchorText}</p>
                  </Link>
                ))}
              </div>
            )}
          </>
        ))}

        {ctaAnchorText && ctaUrl && (
          <Link onClick={toggleMenu} href={ctaUrl} className='no-decoration'>
            <SecondaryButton
              className='flex-justify-center margin-t--l'
              title={ctaAnchorText}
            />
          </Link>
        )}
      </div>

      <nav className='navbar-open-container'>
        <div className='navbar-open-logo'>
          <Link className='pointer' href='/'>
            <Image src={Icon} width={100} height={28} alt='D4CR' />
          </Link>
        </div>
        <button className='navbar-open-button' onClick={toggleMenu}>
          <FontAwesomeIcon className='navbar-open-icon' icon={faBars} />
          <p>MENU</p>
        </button>
      </nav>
    </div>
  );
}
