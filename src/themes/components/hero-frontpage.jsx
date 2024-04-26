import VideoPlayer from "./videoplayer"
import PrimaryButton from "./buttons/primary-button"
import SecondaryButton from "./buttons/secondary-button"
import Link from 'next/link'
import React, { useState } from 'react'
import PopupForm from './popup-form-share.jsx'
import SlackForm from './popup-form-slack.jsx'
import { ensureValidUrl } from '../sources/js/modal-functions.js'
const Hero = ({ prop }) => {

    const url1 = prop.ctaOneUrl && ensureValidUrl(prop.ctaOneUrl)
    const url2 = prop.ctaTwoUrl && ensureValidUrl(prop.ctaTwoUrl)

    const [isClicked, setIsClicked] = useState(false)
    const [slideOut, setSlideOut] = useState(false)
    const [shareOrSlack, setShareOrSlack] = useState('')

    function clickedBtnCTA1() {
        setShareOrSlack(url1)
        setIsClicked(true);
    }
    function clickedBtnCTA2() {
        setShareOrSlack(url2)
        setIsClicked(true);
    }
    function exitModal() {
        setSlideOut(true);
        setTimeout(() => {
            setIsClicked(false);
            setSlideOut(false);
        }, 500);
    }
    return (
        <main>
            <div className="hero-container">
                <div className="text-div">
                    <h1 className="title text-align-start">{prop.heroTitle}</h1>
                    <h4 className="preamble text-align-start">{prop.heroPreamble.document[0].children[0].text}</h4>
                    <div className="buttons-bottom flex flex-row">
                        {(prop.ctaTwoUrl || prop.ctaOneUrl) && (<nav className='button-container flex flex-row flex-nowrap flex-justify-start flex-align-center 
                            margin-tb--xxxs' >

                            {
                                (url1 === 'share' || url1 === 'slack') ? (
                                    <>
                                        <SecondaryButton className='margin-r--xxs' title={prop.ctaOneAnchorText} onClick={clickedBtnCTA1} />
                                    </>
                                ) : (
                                    url1.startsWith("/") ? (
                                        <Link href={url1} className='margin-r--xxs'>
                                            <PrimaryButton title={prop.ctaOneAnchorText} />
                                        </Link>) :
                                        (<Link href={url1} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
                                            <PrimaryButton title={prop.ctaOneAnchorText} />
                                        </Link>)

                                )
                            }

                            {
                                (url2 === 'share' || url2 === 'slack') ? (
                                    <>
                                        <SecondaryButton title={prop.ctaTwoUrlAnchorText} onClick={clickedBtnCTA2} />
                                    </>
                                ) : (
                                    url2.startsWith("/") ? (
                                        <Link className='no-decoration' href={url2}>
                                            <SecondaryButton title={prop.ctaTwoUrlAnchorText} />
                                        </Link>) : 
                                        (<Link href={url2} className='margin-r--xxxs' rel="noopener noreferrer" target="_blank">
                                            <PrimaryButton title={prop.ctaTwoUrlAnchorText} />
                                        </Link>)
                                )
                            }
                        </nav>)}

                        < div className={` ${isClicked ? 'clicked' : 'not-clicked'} ${slideOut ? 'clicked-exit' : ''}`}>
                            <div className={`modal flex flex-column flex-align-center ${slideOut ? 'slide-out' : ''}`}>
                                <button onClick={exitModal} className="btn-exit-video">X</button>
                                <div className="box">
                                    {shareOrSlack === 'slack' && <SlackForm />}
                                    {shareOrSlack === 'share' && <PopupForm />}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="video-div">
                    <div className="ball-1"></div>
                    <div className="ball-3"></div>
                    <div className="ball-2"></div>

                    {prop.heroVideo && <VideoPlayer video={prop.heroVideo} />  /* la till denna funktion så det går att deploya webbsidan */}
                </div>
            </div>
        </main>
    )
}

export default Hero