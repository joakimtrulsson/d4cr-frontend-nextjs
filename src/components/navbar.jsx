"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../themes/sources/assets/graphics/icons/d4cr-icon.png';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import chevronRight from '../themes/sources/assets/graphics/icons/chevron-right-orange-500.svg'
import chevronUp from '../themes/sources/assets/graphics/icons/chevron-up-orange-500.svg'
import chevronDown from '../themes/sources/assets/graphics/icons/chevron-down-grey-500.svg'

export default function NavBar({ data }) {

    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    function toggleDropdown(index) {
        setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
    }

    function handleSecondaryButtonClick() {
        data.ctaUrl && (window.location.href = data.ctaUrl)
    }

    return (
        <header className="navbar flex flex-row flex-justify-between flex-align-center padding-tb--xs padding-lr--xl bg-white">

            <div className="navbar-icon margin-l--m">
                <Image
                    src={Icon}
                    width={150}
                    height={42}
                    alt="D4CR"
                />
            </div>

            <nav className='flex flex-row flex-align-center'> {/* Design guide-button */}
                <div>
                    <Link href="/design-guide">
                        <button
                            className={`nav-button ${activeDropdownIndex === -1 ? 'color-orange-500' : 'color-grey-500'}`}
                            onClick={() => toggleDropdown(-1)}
                            onMouseEnter={() => setHoveredButton(-1)}
                            onMouseLeave={() => setHoveredButton(null)} >
                            Design guide
                        </button>
                        <div className='progressbar-container'>
                            <div className={`progressbar ${activeDropdownIndex === -1 || hoveredButton === -1 ? 'progressbar-active' : 'progressbar-deactive'}`}></div>
                        </div>
                    </Link>
                </div>

                {data && data.navigation && data.navigation.map((group, index) => ( /* Another group-buttons */

                    <div key={index}>
                        <button
                            className={`nav-button ${activeDropdownIndex === index ? 'color-orange-500' : 'color-grey-500'}`}
                            onClick={() => toggleDropdown(index)}
                            onMouseEnter={() => setHoveredButton(index)}
                            onMouseLeave={() => setHoveredButton(null)} >
                            {group.groupTitle}
                            {' '}
                            {activeDropdownIndex === index ?
                                <Image src={chevronUp} alt="arrow up" />
                                :
                                <Image src={chevronDown} alt="arrow down" />
                            }
                        </button>

                        <div className='progressbar-container'>
                            <div className={`progressbar ${activeDropdownIndex === index || hoveredButton === index ? 'progressbar-active' : 'progressbar-deactive'}`}></div>
                        </div>
                        {activeDropdownIndex === index && (
                            <div className={`dropdown-container bg-yellow-300 padding-tb--xxs`}>

                                <ul className='no-bullets flex flex-column'>
                                    {group.links.map((link, key) => (
                                        <Link key={key} className='no-decoration' href={link.url}>

                                            <li className='dropdown-item padding-tb--xxs padding-l--xs 
                                            flex flex-row color-yellow-800'
                                                onMouseEnter={() => setHoveredItem(key)}
                                                onMouseLeave={() => setHoveredItem(null)}>

                                                <div className={`icon-wrapper ${hoveredItem === key ? 'margin-r--xxs' : ''}`}>
                                                    <Image className={`fa-icon ${hoveredItem === key ? '' : 'opacity-0'}`}
                                                        src={chevronRight}
                                                        alt="right arrow"
                                                    />
                                                </div>
                                                {link.anchorText}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>

                            </div>
                        )}
                    </div>
                ))}

                {data && data.ctaAnchorText && /* Call to action-button */
                    <div className='margin-lr--xxl'>
                        <SecondaryButton className='scale-up-l' title={data.ctaAnchorText} onClick={handleSecondaryButtonClick} />
                    </div>
                }

            </nav>
        </header >
    );
}