import React from "react";
import PropTypes from "prop-types";
import Iframe from 'react-iframe'

const SpotifyEmbed = ({ embedId }) => (
  <div className="spotify-container">

      <Iframe style="border-radius:12px" 
      src={`https://open.spotify.com/embed/episode/${embedId}?utm_source=generator&theme=0`}
      width="60%" 
      height="152" 
      frameBorder="0" 
      allowfullscreen="" 
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
      loading="lazy"/>
  </div>

);

SpotifyEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default SpotifyEmbed;