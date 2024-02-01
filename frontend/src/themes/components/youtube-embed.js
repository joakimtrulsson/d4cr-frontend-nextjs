import React from "react";
import PropTypes from "prop-types";
import Iframe from 'react-iframe'

const YoutubeEmbed = ({ url }) => (

  <div className="video-responsive">
    <Iframe
      width="853"
      height="480"
      url={url}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;