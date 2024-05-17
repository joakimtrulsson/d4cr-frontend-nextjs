import React from 'react';
import { DocumentRenderer } from '@keystone-6/document-renderer';

import { YouTubeVideo } from './YouTubeVideo';
import { SpotifyPlayer } from './SpotifyPlayer';

const customComponentRenderers = {
  youtubeVideo: (props) => {
    return (
      <div className='youtube-container'>
        <YouTubeVideo {...props} />
      </div>
    );
  },
  spotifyPlayer: (props) => {
    return (
      <React.Fragment>
        <div className='spotify-container'>
          <SpotifyPlayer {...props} />
        </div>
      </React.Fragment>
    );
  },
};

const defaultElementRenderers = {
  block: {
    paragraph: ({ children, textAlign }) => {
      return <p style={{ textAlign }}>{children}</p>;
    },
    layout: ({ layout, children }) => {
      const gridTemplateColumns = layout.map(() => '1fr').join(' ');
      const className = `layout-container-${layout.length}`;
      return (
        <div className={className} style={{ display: 'grid', gridTemplateColumns }}>
          {children.map((column, index) => (
            <div key={index}>{column}</div>
          ))}
        </div>
      );
    },
  },
};

export function CustomRenderer({ document }) {
  return (
    <DocumentRenderer
      renderers={defaultElementRenderers}
      componentBlocks={customComponentRenderers}
      document={document}
    />
  );
}
