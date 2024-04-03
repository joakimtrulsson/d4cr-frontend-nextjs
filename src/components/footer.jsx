'use client';
import TopWave from '../themes/components/waves/top-wave'
import Icon from '../themes/sources/assets/graphics/icons/d4cr-icon.png'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Banner from '../components/banner'
import getColorCode from '../themes/sources/js/color-code';
import { TwitterSvg, LinkedinSvg, FacebookSvg, InstagramSvg, ArrowRightSvg } from '../components/svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer({ data }) {

    const [hoveredItem, setHoveredItem] = React.useState({ index: null, key: null });
    const socialplatformIcons = { width: "28", height: "30", color: getColorCode('turquoise-600') }
    const rightArrowIcon = { width: "16", height: "14", color: getColorCode('') }
    const bannerContent = { // important - remove this and add data from keystone! 
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
        <footer className='site-footer full-width-height flex flex-column flex-justify-center flex-align-center'>

            {bannerContent &&
                <Banner content={bannerContent} />
            }

            <div className='margin-b--xxxs-negative full-width-height'>
                <TopWave fillColorCode={getColorCode('grey-700')} />
            </div>

            <div className='bg-grey-700 full-width-height'>
                <div className='site-footer__content'>
                    <div className='flex flex-column full-width-height'>

                        <div className="flex flex-row flex-justify-between flex-align-start 
                                padding-t--xxxl padding-b--xxl margin-lr--xxl">

                            <div className="margin-b--m">

                                <Image src={Icon} width={160} height={50} alt="D4CR" />

                                <div className='flex flex-column margin-t--xl margin-b--m'>
                                    <p className='color-orange-400 semibold margin--zero margin-b--xxs'>Join us</p>
                                    <nav className='footer__social-links flex flex-justify-center flex-align-center'>
                                        <Link href="https://twitter.com/D4C_Guide" passHref
                                            className="flex flex-justify-center flex-align-center no-decoration borderradius--half 
                                            margin--xxs padding--xs bg-turquoise-50">
                                            <TwitterSvg width={socialplatformIcons.width} height={socialplatformIcons.height} color={socialplatformIcons.color} />
                                        </Link>
                                        <Link href="https://www.facebook.com/designingforchildren" passHref
                                            className="flex flex-justify-center flex-align-center no-decoration borderradius--half 
                                            margin--xxs padding--xs bg-turquoise-50">
                                            <FacebookSvg width={socialplatformIcons.width} height={socialplatformIcons.height} color={socialplatformIcons.color} />
                                        </Link>
                                        <Link href="https://www.instagram.com/d4c_guide/" passHref
                                            className="flex flex-justify-center flex-align-center no-decoration borderradius--half 
                                            margin--xxs padding--xs bg-turquoise-50">
                                            <InstagramSvg width={socialplatformIcons.width} height={socialplatformIcons.height} color={socialplatformIcons.color} />
                                        </Link>
                                        <Link href="https://www.linkedin.com/company/designing-for-childrens-rights/" passHref
                                            className="flex flex-justify-center flex-align-center no-decoration borderradius--half 
                                            margin--xxs padding--xs bg-turquoise-50">
                                            <LinkedinSvg width={socialplatformIcons.width} height={socialplatformIcons.height} color={socialplatformIcons.color} />
                                        </Link>
                                    </nav>
                                </div>
                            </div>

                            <div className='flex flex-row flex-justify-end'>
                                {data && data.navigation && data.navigation.map((group, index) => (
                                    <nav key={index} className='margin-l--m'>
                                        <p className='color-orange-400 semibold margin--zero margin-b--xxs'>{group.groupTitle}</p>

                                        <ul className='no-bullets flex flex-column'>
                                            {group.links && group.links.map((link, key) => (
                                                <Link key={key} className='no-decoration' href={link.url}>

                                                    <li className='margin-tb--xxs color-orange-50 width--40'
                                                        onMouseEnter={() => setHoveredItem({ index: index, key: key })}
                                                        onMouseLeave={() => setHoveredItem({ index: null, key: null })}>
                                                        <button className='button color-orange-50 flex flex-row'>

                                                            <span className={`${hoveredItem === key ? 'margin-r--xs' : 'margin-r--xxs'}`}>{link.anchorText}</span>
                                                            <div className='icon-wrapper'>
                                                                <ArrowRightSvg width={rightArrowIcon.width} height={rightArrowIcon.height} color={rightArrowIcon.color} />
                                                            </div>
                                                        </button>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>

                                    </nav>
                                ))}
                            </div>

                        </div>

                        <nav className='margin-b--xxl margin-lr--xxl flex flex-row'>
                            <Link href="cookies" className='color-orange-50 margin-r--xs no-decoration'>
                                <button className='button color-orange-50 flex flex-row'>
                                    <span className='margin-r--xxs'>Cookies</span>
                                    <div className='icon-wrapper'>
                                        <ArrowRightSvg width={rightArrowIcon.width} height={rightArrowIcon.height} color={rightArrowIcon.color} />
                                    </div>
                                </button>
                            </Link>
                            <Link href="integrity-policy" className='color-orange-50 margin-r--xs no-decoration'>
                                <button className='button color-orange-50 flex flex-row'>
                                    <span className='margin-r--xxs'>Integrity policy</span>
                                    <div className='icon-wrapper'>
                                        <ArrowRightSvg width={rightArrowIcon.width} height={rightArrowIcon.height} color={rightArrowIcon.color} />
                                    </div>
                                </button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
