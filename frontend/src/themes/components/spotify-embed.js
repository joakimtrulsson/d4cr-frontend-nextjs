import React from "react";
import PropTypes from "prop-types";
import Iframe from 'react-iframe'

const SpotifyEmbed = ({ url }) => (

  <div className="spotify-container">
    <Iframe 
      width="853"
      height="152"    
      style="border-radius:12px"
      url={url}
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy" />
  </div>
);

SpotifyEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default SpotifyEmbed;