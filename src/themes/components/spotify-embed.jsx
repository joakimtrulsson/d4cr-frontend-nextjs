import React from "react";

// delete this file?

export default function SpotifyEmbed({ className, url }) {

  return (
    <div className={`spotify-container ${className}`}>
      <iframe src={url} 
      width="100%" height="152" frameBorder="0" allowFullScreen=""
      loading="lazy"
      scrolling="no">
      </iframe>
    </div>
  )
}

