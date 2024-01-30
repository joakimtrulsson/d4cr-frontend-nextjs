import '../themes/sources/scss/components/wysiwig.scss';
import '../themes/sources/scss/base/utils.scss';
import React from 'react';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import YoutubeEmbed from '../themes/components/youtube-embed';
import SpotifyEmbed from '../themes/components/spotify-embed';


const WysiwigPage = () => {

  const json = require('../database/keystone-6/example-data.json')
  const document = json['data']['slides'][0]['content']['document']

  return (
    <div>
      <h1>Document Viewer Example</h1>
      <DocumentRenderer document={document} />

      <SpotifyEmbed embedId='3KnaaLIoWllg3QylQCpijZ' />
      <YoutubeEmbed embedId="rokGy0huYEA" />

    </div>
  );
};

export default WysiwigPage;
