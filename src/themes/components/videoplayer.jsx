import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PlayBtn from "../sources/assets/graphics/buttons/play.png"
import PlayBg from "../sources/assets/graphics/buttons/play-bg.png"

const VideoPlayer = ({ video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [leaveTimeout, setLeaveTimeout] = useState(null);
    const [isClicked, setIsClicked] = useState(false)
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

        setIsClicked(false)
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
            <div className={`flex flex-column ${isClicked ? 'clicked' : 'not-clicked'}`}>
                <button onClick={exitVideo}>X</button>
                <video className={`video-player-popup`} width="320" height="260" controls>
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
        </main>
    )
}

export default VideoPlayer