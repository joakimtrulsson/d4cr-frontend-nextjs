import TopWave from '../themes/components/waves/top-wave'
import Icon from '../themes/sources/assets/graphics/icons/d4cr-icon.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Banner from '../components/banner'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer({ data }) {

    const [hoveredItem, setHoveredItem] = React.useState({ index: null, key: null });
    
    console.log(data) // remove this!

    const bannerContent = { // important - add this from backend! 
        "id": "afc1f312-c1c4-4bf3-8103-e15923c58d44",
        "cta": {
            "url": "/chapters/los-angeles",
            "anchorText": "Fill out form"
        },
        "title": "Join D4CR",
        "iconName": "star",
        "preamble": [
            {
                "type": "paragraph",
                "children": [
                    {
                        "text": "There are multiple ways to get involved. A good start is to join our Slack channel and we can talk more about the next step together."
                    }
                ]
            }
        ],
        "sectionType": "BANNER"
    };

    return (
        <div className='footer full-width-height flex flex-column flex-nowrap flex-align-center'>

            {bannerContent &&
                <Banner content={bannerContent} />
            }

            <div className='margin-b--xxxs-negative full-width-height'>
                <TopWave fillColorClass="fill-grey-700" />
            </div>

            <div className="footer-body flex flex-row flex-justify-between flex-align-start 
            bg-grey-700 full-width-height padding-t--xxxl">

                <div className='footer-icon-and-social-platform margin-l--m'>
                    <div className="footer-icon margin-b--m">
                        <Image
                            src={Icon}
                            width={160}
                            height={50}
                            alt="D4CR"
                        />
                    </div>

                    <div className='flex flex-column margin-b--m'>
                        <p className='color-orange-400 semibold'>Join us</p>
                        <div className='flex'>
                            <a href="#" className="no-decoration borderradius--half margin--xxs padding--xs bg-turquoise-50">X</a>
                            <a href="#" className="no-decoration borderradius--half margin--xxs padding--xs bg-turquoise-50">X</a>
                            <a href="#" className="no-decoration borderradius--half margin--xxs padding--xs bg-turquoise-50">X</a>
                            <a href="#" className="no-decoration borderradius--half margin--xxs padding--xs bg-turquoise-50">X</a>
                        </div>
                    </div>

                    <div className=''>
                        <Link href="cookies" className='color-orange-50 margin-r--xs no-decoration'>
                            <span className='margin-r--xxs'>Cookies</span>
                            <FontAwesomeIcon icon={faArrowRight} size="sm" />
                        </Link>
                        <Link href="integrity-policy" className='color-orange-50 margin-r--xs no-decoration'>
                            <span className='margin-r--xxs'>Integrity policy</span>
                            <FontAwesomeIcon icon={faArrowRight} size="sm" />
                        </Link>
                    </div>

                </div>

                <div className='flex flex-row flex-justify-center'>
                    {data && data.navigation && data.navigation.map((group, index) => (
                        <div key={index} className='margin-lr--m'>
                            <p className='color-orange-400 semibold margin--zero margin-b--xxs'>{group.groupTitle}</p>

                            <ul className='no-bullets flex flex-column'>
                                {group.links && group.links.map((link, key) => (
                                    <Link key={key} className='no-decoration' href={link.url}>

                                        <li className='underline-background dropdown-item padding-tb--xxs 
                                            flex flex-row color-orange-50'
                                            onMouseEnter={() => setHoveredItem({ index: index, key: key })}
                                            onMouseLeave={() => setHoveredItem({ index: null, key: null })}>
                                            <span className={`${hoveredItem === key ? 'margin-r--xs' : 'margin-r--xxs'}`}>{link.anchorText}</span>
                                            <div className={`icon-wrapper`}>
                                                <FontAwesomeIcon className={`fa-icon `}
                                                    icon={faArrowRight}
                                                    size="sm"
                                                />
                                            </div>
                                        </li>
                                    </Link>
                                ))}
                            </ul>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
