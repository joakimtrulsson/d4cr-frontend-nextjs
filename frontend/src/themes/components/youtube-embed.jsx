import React from "react";

export default function YoutubeEmbed({ className, url }) {

  return (
    <div className={`video-responsive ${className}`}>
      <iframe 
      width="100%" 
      height="480" 
      src={url} 
      title="YouTube video player" 
      allowFullScreen>
      </iframe>
    </div>
  )
}
