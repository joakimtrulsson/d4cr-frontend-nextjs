"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '../sources/assets/graphics/icons/d4cr-icon.png';
import SecondaryButton from './buttons/secondary-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons'


export default function NavBar({ data }) {

    const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
    const [hoveredButton, setHoveredButton] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);

    console.log("navbar: ", data); // remove this later

    function toggleDropdown(index) {
        setActiveDropdownIndex(activeDropdownIndex === index ? null : index);
    }

    function handleSecondaryButtonClick() {
        data.ctaUrl && (window.location.href = data.ctaUrl)
    }

    return (
        <div className="navbar flex flex-row flex-justify-between flex-align-center padding-tb--xs padding-lr--xl bg-yellow-50">
            <div className="navbar-icon margin-l--m">
                <Image
                    src={Icon}
                    width={150}
                    height={42}
                    alt="D4CR"
                />
            </div>

            <div className='flex flex-row flex-align-center'>

                <div>
                    <Link href="chapters">
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

                {data.navigation && data.navigation.map((group, index) => (

                    <div key={index}>
                        <button
                            className={`nav-button ${activeDropdownIndex === index ? 'color-orange-500' : 'color-grey-500'}`}
                            onClick={() => toggleDropdown(index)}
                            onMouseEnter={() => setHoveredButton(index)}
                            onMouseLeave={() => setHoveredButton(null)} >
                            {group.groupTitle}
                            {' '}
                            {activeDropdownIndex === index ?
                                <FontAwesomeIcon icon={faChevronUp} />
                                : <FontAwesomeIcon icon={faChevronDown} />
                            }
                        </button>

                        <div className='progressbar-container'>
                            <div className={`progressbar ${activeDropdownIndex === index || hoveredButton === index ? 'progressbar-active' : 'progressbar-deactive'}`}></div>
                        </div>
                        {activeDropdownIndex === index && (
                            <div className={`dropdown-container bg-yellow-300 padding-tb--xxs`}>


                                <ul className='no-bullets flex flex-column'>
                                    {group.links.map((link, key) => (
                                        <Link className='no-decoration' href={link.url}>

                                            <li key={key} className='dropdown-item padding-tb--xxs padding-l--s 
                                            flex flex-row color-yellow-800'
                                                onMouseEnter={() => setHoveredItem(key)}
                                                onMouseLeave={() => setHoveredItem(null)}>

                                                <div className={`icon-wrapper ${hoveredItem === key ? 'margin-r--xxs' : ''}`}>
                                                    <FontAwesomeIcon className={`fa-icon ${hoveredItem === key ? '' : 'opacity-0'}`}
                                                        icon={faChevronRight}
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


                {
                    data.ctaAnchorText &&
                    <div className='margin-lr--xxl'>
                        <SecondaryButton className='scale-up-l' title={data.ctaAnchorText} onClick={handleSecondaryButtonClick} />
                    </div>
                }
            </div>

        </div >
    );
}
