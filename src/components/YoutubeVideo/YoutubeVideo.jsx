import { useState } from 'react';
import { getYouTubeEmbedId } from '../../utils';
import Image from 'next/image';

import PlayBtn from '../../styles/assets/graphics/buttons/play.png';
import PlayBg from '../../styles/assets/graphics/buttons/play-bg.png';

export default function YoutubeVideo({ url, altText = 'Embedded YouTube video' }) {
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [leaveTimeout, setLeaveTimeout] = useState(null);
  const embedId = getYouTubeEmbedId(url);

  const handlePlay = () => {
    setShowVideo(true);
  };

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

  return (
    <div
      onClick={handlePlay}
      className={`youtube-video-container ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showVideo ? (
        <iframe
          className='youtube-video-iframe'
          style={{
            left: 0,
            top: 0,
          }}
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title={altText}
        />
      ) : (
        <div className='youtube-video-preview'>
          <Image
            layout='responsive'
            height={315}
            width={560}
            src={`https://img.youtube.com/vi/${embedId}/maxresdefault.jpg`}
            alt={altText}
          />
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
      )}
    </div>
  );
}
