import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlayBtn from "../sources/assets/graphics/buttons/play.png"
import PlayBg from "../sources/assets/graphics/buttons/play-bg.png"
///mobile version
const VideoPlayer = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [leaveTimeout, setLeaveTimeout] = useState(null);
    const [isClicked, setIsClicked] = useState(false)
    const [slideOut, setSlideOut] = useState(false)

    useEffect(() => {
        // Cleanup timeout on component unmount
        return () => {
            if (leaveTimeout) clearTimeout(leaveTimeout);
        };
    }, [leaveTimeout]);

    const handleMouseEnter = () => {
        if (leaveTimeout) {
            clearTimeout(leaveTimeout);
            setLeaveTimeout(null);
        }
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        // Set a timeout that matches the duration of your longest animation
        const timeoutId = setTimeout(() => {
            setIsHovered(false);
        }, 600); // 600ms is the duration of the jelly-hover animation
        setLeaveTimeout(timeoutId);
    };
    function clickedVideo() {

        setIsClicked(true)
    }
    function exitVideo() {
        setSlideOut(true); // Start the slide-out animation
        // Wait for the animation to complete before hiding the modal
        setTimeout(() => {
            setIsClicked(false); // Now properly passed as a callback
            setSlideOut(false); // Reset slideOut state for next open
        }, 500); // Make sure this duration matches your animation duration
    }
    const videoData = video
    console.log(videoData)
    return (
        <main className="main">
            <div onClick={clickedVideo} className={`video-container ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {/* {console.log(videoData)} */}
                <video className={`video-player`} width="320" height="260">
                    <source src={videoData.url} type="video/mp4" />
                    <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                    />
                    Your browser does not support the video tag.
                </video>
                <button className="custom-play-button">
                    <Image className="play-btn" src={PlayBtn} width={80} height={80} />
                    <Image className="play-bg" src={PlayBg} width={80} height={80} />
                </button>
            </div>
            <div className={` ${isClicked ? 'clicked' : 'not-clicked'} ${slideOut ? 'clicked-exit' : ''}`}>
                <div className={`modal flex flex-column flex-align-center ${slideOut ? 'slide-out' : ''}`}>
                    <button onClick={exitVideo} className="btn-exit-video">X</button>
                    <video className={`video-player-popup`} width="640" height="520" controls>
                        <source src={videoData.url} type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </div>
        </main>
    )
}

export default VideoPlayer