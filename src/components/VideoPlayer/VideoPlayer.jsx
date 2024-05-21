import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { CloseIcon } from '../index.js';

import PlayBtn from '../../styles/assets/graphics/buttons/play.png';
import PlayBg from '../../styles//assets/graphics/buttons/play-bg.png';

const VideoPlayer = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
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
    const timeoutId = setTimeout(() => {
      setIsHovered(false);
    }, 600);
    setLeaveTimeout(timeoutId);
  };
  function clickedVideo() {
    setIsClicked(true);
  }
  function exitVideo() {
    setSlideOut(true);

    setTimeout(() => {
      setIsClicked(false);
      setSlideOut(false);
    }, 500);
  }
  const videoData = video;

  return (
    <main className='main'>
      <div
        onClick={clickedVideo}
        className={`video-container ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video className={`video-player`} width='320' height='260' controls>
          <source src={videoData.url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        <button className='custom-play-button'>
          <Image
            className='play-btn'
            src={PlayBtn}
            width={80}
            height={80}
            alt='the play button icon arrow'
          />
          <Image
            className='play-bg'
            src={PlayBg}
            width={80}
            height={80}
            alt='the play button background'
          />
        </button>
      </div>
      <div
        className={` ${isClicked ? 'clicked' : 'not-clicked'} ${
          slideOut ? 'clicked-exit' : ''
        }`}
      >
        <div
          className={`modal flex flex-column flex-align-center ${
            slideOut ? 'slide-out' : ''
          }`}
        >
          <button onClick={exitVideo} className='btn-exit-video'>
            <CloseIcon />
          </button>
          <video className={`video-player-popup`} width='640' height='520' controls>
            <source src={videoData.url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
};

export default VideoPlayer;
